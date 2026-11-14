import { testDocsDesign } from './test-docs-design.mjs';
import { testDialogExamples } from './test-dialog.mjs';
import { mkdir } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import catalog from '../docs-site/generated/components.json';
const server = spawn(
  process.execPath,
  [
    'node_modules/vite/bin/vite.js',
    'preview',
    '--config',
    'vite.docs.config.ts',
    '--host',
    '127.0.0.1',
    '--port',
    '4189',
    '--strictPort',
  ],
  { stdio: 'pipe' },
);
let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
try {
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Docs startup timeout')), 15000);
    server.stdout.on('data', (d) => {
      if (d.toString().includes('4189')) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.on('exit', (code) => {
      clearTimeout(timer);
      reject(Error('Docs server exited ' + code));
    });
  });
  browser = await chromium.launch({ headless: true });
  await mkdir('artifacts/docs', { recursive: true });
  const errors: string[] = [];
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://127.0.0.1:4189/#/components/date-picker');
    await expect(page.getByRole('heading', { name: 'Date Picker', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Skip to content', exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
    await expect(page).toHaveURL('http://127.0.0.1:4189/#/components/date-picker');
    await expect(page.getByRole('heading', { name: 'Date Picker', exact: true })).toBeVisible();
    await page.goto('http://127.0.0.1:4189/#/components/date-picker?section=props');
    await expect(page.getByRole('heading', { name: 'Props', exact: true })).toBeInViewport();
    await page.goto('http://127.0.0.1:4189/#/components/date-picker');
    // Authored examples: the page runs the example files and shows their exact source.
    const frame = page.frameLocator('.example-card iframe').first();
    await expect(frame.getByRole('grid', { name: 'Submission deadline' })).toBeVisible();
    if (width === 1440) {
      await page.getByRole('button', { name: 'Phone', exact: true }).first().click();
      await expect(frame.getByRole('grid', { name: 'Submission deadline' })).toBeVisible();
    }
    await page.getByRole('button', { name: 'Svelte', exact: true }).click();
    await expect(frame.locator('.authored-example')).toHaveAttribute('data-framework', 'svelte');
    await page.getByRole('button', { name: 'Code', exact: true }).first().click();
    await expect(page.locator('.example-card-code').first()).toContainText("from 'biss-ui/svelte'");
    await expect(page.locator('html')).toHaveJSProperty('scrollWidth', width);
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    await writeAudit(width, axe.violations);
    expect(axe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
      [],
    );
    await page.screenshot({
      path: `artifacts/docs/${width === 390 ? 'phone' : 'desktop'}-date-picker.png`,
      fullPage: true,
    });
    if (width === 390) await page.getByRole('button', { name: 'Browse docs' }).click();
    await page.getByRole('searchbox', { name: 'Find a component' }).fill('kanban');
    await page
      .getByRole('navigation', { name: 'Documentation' })
      .getByRole('link', { name: 'Kanban', exact: true })
      .click();
    await expect(page.getByRole('heading', { name: 'Kanban', exact: true })).toBeVisible();
    await page.screenshot({
      path: `artifacts/docs/${width === 390 ? 'phone' : 'desktop'}-kanban.png`,
      fullPage: true,
    });
    await testDocsDesign(page, 'http://127.0.0.1:4189', width);
    await testDialogExamples(page, 'http://127.0.0.1:4189', width);
    await context.close();
  }
  // Verify each generated route and default image, including framework-only components.
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  for (const c of catalog.components) {
    await page.goto('http://127.0.0.1:4189/#/components/' + c.slug);
    await expect(page.locator('h1')).toHaveText(c.short.replace(/([a-z0-9])([A-Z])/g, '$1 $2'));
    if (c.name === 'BissDialog') continue; // Covered by testDialogExamples.
    if (await page.locator('.example-card').count()) {
      const first = page.frameLocator('.example-card iframe').first();
      await expect(first.locator('.authored-example')).toHaveAttribute('data-framework', 'vue');
      await page.getByRole('button', { name: 'Svelte', exact: true }).click();
      await expect(first.locator('.authored-example')).toHaveAttribute('data-framework', 'svelte');
      continue;
    }
    const preview = page.frameLocator('iframe');
    await expect(preview.locator('.preview-frame')).toHaveAttribute('data-component', c.name);
    await page.getByRole('button', { name: 'Svelte', exact: true }).click();
    await expect(preview.locator('.preview-frame')).toHaveAttribute('data-framework', 'svelte');
    await expect(preview.locator('.preview-frame')).toHaveAttribute('data-component', c.name);
    if (c.name === 'BissPageBar')
      await expect(
        preview.getByRole('heading', { name: 'Research projects', exact: true }),
      ).toBeVisible();
  }
  // Every authored example renders in both frameworks without errors.
  let exampleCount = 0;
  for (const dir of readdirSync('docs-site/examples', { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name === 'dialog') continue;
    const manifest = 'docs-site/examples/' + dir.name + '/manifest.ts';
    if (!existsSync(manifest)) continue;
    const { examples } = (await import(pathToFileURL(resolve(manifest)).href)) as {
      examples: { id: string }[];
    };
    for (const item of examples)
      for (const framework of ['vue', 'svelte']) {
        await page.goto(
          `http://127.0.0.1:4189/preview.html?example=${dir.name}/${item.id}&framework=${framework}`,
        );
        const root = page.locator('.authored-example');
        await expect(root, `${dir.name}/${item.id} (${framework})`).toHaveAttribute(
          'data-framework',
          framework,
        );
        await expect(root).not.toHaveText('Example not found.');
        expect(
          await root.evaluate((node) => node.childElementCount),
          `${dir.name}/${item.id}`,
        ).toBeGreaterThan(0);
        exampleCount++;
      }
  }
  for (const framework of ['vue', 'svelte']) {
    await page.goto(
      'http://127.0.0.1:4189/preview.html?component=BissField&state=error&framework=' + framework,
    );
    const input = page.getByRole('textbox');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    const description = await input.getAttribute('aria-describedby');
    expect(description).toBeTruthy();
    await expect(page.locator('[id="' + description + '"]')).toHaveText('Enter a project name.');
  }
  await page.goto('http://127.0.0.1:4189/#/playground');
  await page.getByRole('button', { name: 'New project', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'New project', exact: true });
  await dialog.getByRole('button', { name: 'Save project', exact: true }).click();
  await expect(dialog.getByRole('textbox', { name: 'Project name', exact: true })).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await dialog
    .getByRole('textbox', { name: 'Project name', exact: true })
    .fill('Library quality review');
  await dialog.getByRole('button', { name: 'Save project', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Library quality review', exact: true }),
  ).toBeVisible();
  await page.screenshot({ path: 'artifacts/docs/playground-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.screenshot({ path: 'artifacts/docs/playground-phone.png', fullPage: true });
  const playgroundAxe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(
    playgroundAxe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  ).toEqual([]);
  for (const slug of ['getting-started', 'theming', 'accessibility', 'migration', 'components']) {
    await page.goto('http://127.0.0.1:4189/#/' + slug);
    await expect(page.locator('h1')).toBeVisible();
  }
  await context.close();
  expect(errors).toEqual([]);
  console.log(
    `Verified ${catalog.components.length} docs pages, ${exampleCount} authored example renders, guides, mobile navigation and accessibility.`,
  );
} finally {
  await browser?.close();
  server.kill('SIGTERM');
  if (server.exitCode === null) await new Promise((resolve) => server.once('exit', resolve));
}
async function writeAudit(width: number, violations: unknown) {
  const { writeFile } = await import('node:fs/promises');
  await writeFile(
    `artifacts/docs/${width}-accessibility.json`,
    JSON.stringify(violations, null, 2),
  );
}
