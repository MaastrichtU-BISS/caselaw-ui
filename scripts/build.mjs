/** Build the published artifact, rather than making consumers compile library TypeScript. */
import { execFileSync } from 'node:child_process';
import { rm, mkdir, cp, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const run = (file, args) => execFileSync(process.execPath, [file, ...args], { stdio: 'inherit' });
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
run('scripts/generate-tokens.mjs', []);
run('scripts/generate-props.mjs', []);
run('node_modules/typescript/bin/tsc', ['-p', 'tsconfig.core-build.json']);
run('node_modules/vite/bin/vite.js', ['build', '--config', 'vite.library.config.ts']);
run('node_modules/vue-tsc/bin/vue-tsc.js', ['-p', 'tsconfig.vue-build.json']);
run('node_modules/@sveltejs/package/src/cli.js', [
  '--input',
  'src/svelte',
  '--output',
  'dist/svelte',
  '--tsconfig',
  'tsconfig.svelte.json',
]);
await cp('src/styles', 'dist/styles', { recursive: true });
// Native ESM and declaration imports need explicit JS extensions. Svelte SFC imports stay intact.
async function normalize(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await normalize(file);
    else if (/\.(js|ts|svelte)$/.test(file)) {
      let s = await readFile(file, 'utf8');
      s = s.replace(
        /(from\s*['"]|import\(['"]|import\s*['"])(\.[^'"]+)(['"])/g,
        (_, prefix, spec, quote) => prefix + (path.extname(spec) ? spec : spec + '.js') + quote,
      );
      await writeFile(file, s);
    }
  }
}
await normalize('dist');
console.log('Built typed core, compiled Vue ESM, Svelte package and modular styles.');
