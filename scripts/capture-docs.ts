/** Capture shipped components in isolation, with reproducible synthetic fixtures. */
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import catalog from '../docs-site/generated/components.json';
import { docsInputHash } from './docs-inputs.mjs';
import { fixtures } from '../docs-site/fixtures';
const port = 4187;
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
    String(port),
    '--strictPort',
  ],
  { stdio: 'pipe' },
);
let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
const manifest: {
  name: string;
  state: string;
  viewport: string;
  file: string;
  width: number;
  height: number;
  sha256: string;
}[] = [];
const errors: string[] = [];
try {
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Docs preview startup timeout')), 15000);
    server.stdout.on('data', (d) => {
      if (d.toString().includes(String(port))) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.on('exit', (code) => {
      clearTimeout(timer);
      reject(Error('Docs preview exited ' + code));
    });
  });
  browser = await chromium.launch({ headless: true });
  await mkdir('docs/screenshots', { recursive: true });
  // Four isolated pages keep the capture bounded while each fixture owns its state.
  const queue = catalog.components.flatMap((c) => {
    const f = fixtures[c.short];
    if (!f) throw Error('Missing fixture for ' + c.name);
    return (f.states ?? [f.state ?? 'default']).flatMap((state) =>
      ['desktop', 'phone'].map((viewport) => ({ component: c, state, viewport })),
    );
  });
  let completed = 0;
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      const context = await browser!.newContext({
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
        locale: 'en-GB',
        timezoneId: 'Europe/Amsterdam',
      });
      const page = await context.newPage();
      page.setDefaultTimeout(12000);
      page.on('pageerror', (e) => errors.push(e.message));
      for (let task; (task = queue.shift());) {
        const { component: c, state, viewport } = task,
          width = viewport === 'phone' ? 390 : 960;
        await page.setViewportSize({ width, height: 640 });
        await page.goto(
          `http://127.0.0.1:${port}/preview.html?component=${c.name}&state=${state}`,
          { waitUntil: 'networkidle' },
        );
        await page.locator('html[data-ready=true]').waitFor();
        await page.evaluate(() => document.fonts.ready);
        const fixed =
          [
            'BissDialog',
            'BissModal',
            'BissConfirmDialog',
            'BissSidePanel',
            'BissSearchPalette',
            'BissMenu',
            'BissPopover',
            'BissSelectPicker',
            'BissSwatchPicker',
            'BissDateField',
            'BissToastStack',
            'BissTopBar',
            'BissBottomBar',
            'BissAppShell',
            'BissConsoleLayout',
            'BissGridShell',
          ].includes(c.name) &&
          (['open', 'filtered', 'visible', 'busy'].includes(state) ||
            [
              'BissTopBar',
              'BissBottomBar',
              'BissAppShell',
              'BissConsoleLayout',
              'BissGridShell',
            ].includes(c.name));
        const file = `${c.slug}-${state}-${viewport}.png`,
          path = `docs/screenshots/${file}`;
        if (fixed) await page.screenshot({ path, animations: 'disabled' });
        else await page.locator('.preview-frame').screenshot({ path, animations: 'disabled' });
        const png = await readFile(path);
        const shotWidth = png.readUInt32BE(16),
          height = png.readUInt32BE(20);
        if (shotWidth < 10 || height < 10 || (await stat(path)).size < 200)
          throw Error('Invalid image ' + file);
        manifest.push({
          name: c.name,
          state,
          viewport,
          file,
          width: shotWidth,
          height,
          sha256: createHash('sha256').update(png).digest('hex'),
        });
        if (++completed % 40 === 0) console.log(`Captured ${completed} screenshots`);
      }
      await context.close();
    }),
  );
  if (errors.length) throw Error([...new Set(errors)].join('\n'));
  manifest.sort((a, b) => a.file.localeCompare(b.file));
  await writeFile('docs-site/generated/screenshots.json', JSON.stringify(manifest, null, 2) + '\n');
  await writeFile(
    'docs/screenshots/manifest.json',
    JSON.stringify(
      {
        description:
          'Headless screenshots of the actual shipped components, using docs-site/fixtures.ts. All names and records are synthetic.',
        capture: 'scripts/capture-docs.ts',
        inputsSha256: docsInputHash(),
        referenceFramework: 'Vue where available; Svelte for ActionCard',
        screenshots: manifest,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(
    `Captured ${manifest.length} screenshots for ${catalog.components.length} components.`,
  );
} finally {
  await browser?.close();
  server.kill('SIGTERM');
  if (server.exitCode === null) await new Promise((resolve) => server.once('exit', resolve));
}
