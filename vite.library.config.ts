import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    outDir: 'dist/vue',
    sourcemap: true,
    lib: {
      entry: {
        index: 'src/vue/index.ts',
        'dialog/index': 'src/vue/dialog/index.ts',
        'tabs/index': 'src/vue/tabs/index.ts',
      },
      formats: ['es'],
      fileName: (_format, name) => name + '.js',
    },
    rollupOptions: { external: ['vue', 'reka-ui'] },
  },
});
