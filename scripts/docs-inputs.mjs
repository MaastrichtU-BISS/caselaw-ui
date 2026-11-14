import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
export function docsInputHash() {
  const hash = createHash('sha256');
  const files = [
    'docs-site/fixtures.ts',
    'docs-site/ComponentPreview.vue',
    'docs-site/new-fixtures.ts',
    'docs-site/block-fixtures.ts',
    'docs-site/preview.ts',
    'docs-site/preview.html',
    'examples/catalog-data.ts',
  ];
  for (const dir of [
    'src/vue',
    'src/svelte',
    'src/styles',
    'src/core',
    'src/theme',
    'docs-site/block-fixtures',
  ])
    for (const f of readdirSync(dir))
      if (/\.(vue|svelte|css|ts|json)$/.test(f)) files.push(dir + '/' + f);
  for (const f of files.sort()) hash.update(f + '\0' + readFileSync(f, 'utf8'));
  return hash.digest('hex');
}
