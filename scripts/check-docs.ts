import { mkdir } from 'node:fs/promises';
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
    const frame = page.frameLocator('iframe');
    await expect(frame.getByRole('grid', { name: 'Due date' })).toBeVisible();
    await page.getByRole('button', { name: 'Phone', exact: true }).click();
    await page.getByRole('combobox', { name: 'Component state' }).selectOption('range');
    await expect(frame.getByRole('grid', { name: 'Due date' })).toBeVisible();
    await page.getByRole('button', { name: 'Svelte', exact: true }).click();
    await expect(page.locator('.sample-code')).toContainText("from 'biss-ui/svelte'");
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
    await context.close();
  }
  // Verify each generated route and default image, including framework-only components.
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  for (const c of catalog.components) {
    await page.goto('http://127.0.0.1:4189/#/components/' + c.slug);
    await expect(page.locator('h1')).toHaveText(c.short.replace(/([a-z0-9])([A-Z])/g, '$1 $2'));
    const preview = page.frameLocator('iframe');
    await expect(preview.locator('.preview-frame')).toHaveAttribute('data-component', c.name);
    if (c.name === 'BissPageBar')
      await expect(
        preview.getByRole('heading', { name: 'Research projects', exact: true }),
      ).toBeVisible();
  }
  for (const slug of ['getting-started', 'theming', 'accessibility', 'migration', 'components']) {
    await page.goto('http://127.0.0.1:4189/#/' + slug);
    await expect(page.locator('h1')).toBeVisible();
  }
  await context.close();
  expect(errors).toEqual([]);
  console.log(
    `Verified ${catalog.components.length} docs pages, live component renders, guides, live examples, mobile navigation and accessibility.`,
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
