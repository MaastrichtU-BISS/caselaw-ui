import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  base: './',
  publicDir: '../public',
  plugins: [vue(), svelte()],
  root: 'docs-site',
  build: {
    outDir: '../dist-docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        docs: fileURLToPath(new URL('./docs-site/index.html', import.meta.url)),
        preview: fileURLToPath(new URL('./docs-site/preview.html', import.meta.url)),
      },
    },
  },
});
