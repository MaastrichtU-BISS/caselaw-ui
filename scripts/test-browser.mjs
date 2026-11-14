import { testLibrary } from './test-library.mjs';
import { testExpanded } from './test-expanded.mjs';
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const server = spawn(
  process.execPath,
  [
    'node_modules/vite/bin/vite.js',
    'preview',
    ...(process.env.SVELTE ? ['--config', 'vite.svelte.config.ts'] : []),
    '--host',
    '127.0.0.1',
    '--port',
    '4179',
    '--strictPort',
  ],
  { stdio: 'pipe' },
);
let browser;
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Preview startup timeout')), 15000);
    server.stdout.on('data', (d) => {
      if (d.toString().includes('4179')) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.on('exit', (code) => {
      clearTimeout(timer);
      reject(Error(`Preview exited ${code}`));
    });
  });
  browser = await chromium.launch({ headless: true });
  await mkdir('artifacts', { recursive: true });
  const errors = [];
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.setDefaultTimeout(8000);
    page.on('pageerror', (e) => {
      errors.push(e.message);
      console.error('Browser error:', e.message);
    });
    await page.goto('http://127.0.0.1:4179');
    await page.getByRole('button', { name: 'My projects' }).click();
    assert.equal(
      await page.getByRole('button', { name: 'My projects' }).getAttribute('aria-pressed'),
      'true',
    );
    assert.equal(
      await page
        .getByRole('navigation', { name: 'Project views' })
        .getByRole('button', { name: 'Archived' })
        .isDisabled(),
      true,
    );
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    assert.match(await page.locator('nav.biss-pager').innerText(), /2 \/ 3/);
    await page.getByRole('button', { name: 'Ada mentioned you', exact: false }).click();
    assert.equal(await page.getByRole('img', { name: 'Unread', exact: true }).count(), 0);
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await page.getByText('Changes saved', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'New project', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Save', exact: true }).count(), 1);
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `Overflow at ${width}`,
    );
    assert.equal(
      await page
        .getByRole('progressbar', { name: 'Ada capacity: 62 percent' })
        .getAttribute('aria-valuenow'),
      '62',
    );
    try {
      await testExpanded(page, width);
      await testLibrary(page, width);
    } catch (error) {
      await page.screenshot({
        path: `artifacts/failure-${process.env.SVELTE ? 'svelte' : 'vue'}-${width}.png`,
      });
      throw error;
    }
    await page.screenshot({
      path: `artifacts/${process.env.SVELTE ? 'svelte-' : ''}${width === 390 ? 'phone' : 'desktop'}-component-states.png`,
      fullPage: true,
    });
    await context.close();
  }
  assert.deepEqual(errors, []);
  console.log('Passed browser interactions and responsive checks at 1440 and 390px.');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
  await new Promise((resolve) => {
    if (server.exitCode !== null) resolve();
    else server.once('exit', resolve);
  });
}
