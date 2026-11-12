import { readFile, stat, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import catalog from '../docs-site/generated/components.json';
import screenshots from '../docs-site/generated/screenshots.json';
import { fixtures } from '../docs-site/fixtures';
import { docsInputHash } from './docs-inputs.mjs';
const manifest = JSON.parse(await readFile('docs/screenshots/manifest.json', 'utf8'));
if (manifest.inputsSha256 !== docsInputHash())
  throw Error(
    'Component screenshot inputs changed. Run npm run docs:build, npm run docs:screenshots, then rebuild the docs.',
  );
for (const c of catalog.components) {
  const f = fixtures[c.short];
  if (!f) throw Error('Missing fixture ' + c.name);
  for (const state of f.states ?? [f.state ?? 'default'])
    for (const viewport of ['desktop', 'phone']) {
      const shot = screenshots.find(
        (s) => s.name === c.name && s.state === state && s.viewport === viewport,
      );
      if (!shot) throw Error('Missing screenshot ' + c.name + ' ' + state + ' ' + viewport);
      const png = await readFile('docs/screenshots/' + shot.file);
      if (createHash('sha256').update(png).digest('hex') !== shot.sha256)
        throw Error('Screenshot hash mismatch ' + shot.file);
      if ((await stat('docs/screenshots/' + shot.file)).size < 200)
        throw Error('Empty screenshot ' + shot.file);
    }
}
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
    const image = page.getByRole('img', { name: 'BissDatePicker, default state, desktop layout' });
    await expect(image).toBeVisible();
    await expect(image).toHaveJSProperty('complete', true);
    await page.getByRole('button', { name: 'Phone', exact: true }).click();
    await expect(
      page.getByRole('img', { name: 'BissDatePicker, default state, phone layout' }),
    ).toBeVisible();
    await page.getByRole('combobox', { name: 'Component state' }).selectOption('range');
    await expect(
      page.getByRole('img', { name: 'BissDatePicker, range state, phone layout' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Svelte', exact: true }).click();
    await expect(page.locator('.sample-code')).toContainText("from 'biss-ui/svelte'");
    await expect(page.locator('.sample-code')).toContainText('onchange');
    await page.getByRole('button', { name: 'Try it', exact: true }).click();
    const frame = page.frameLocator('iframe');
    await expect(frame.getByRole('grid', { name: 'Due date' })).toBeVisible();
    await page.getByRole('button', { name: 'Screenshot', exact: true }).click();
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
    const image = page.locator('.component-shot img');
    await expect(image).toBeVisible();
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate((i: HTMLImageElement) => i.naturalWidth)).toBeGreaterThan(0);
  }
  for (const slug of ['getting-started', 'theming', 'accessibility', 'migration', 'components']) {
    await page.goto('http://127.0.0.1:4189/#/' + slug);
    await expect(page.locator('h1')).toBeVisible();
  }
  await context.close();
  expect(errors).toEqual([]);
  console.log(
    `Verified ${catalog.components.length} docs pages, ${screenshots.length} screenshots, guides, live examples, mobile navigation and accessibility.`,
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
