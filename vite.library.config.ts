import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({plugins:[vue()],build:{emptyOutDir:false,outDir:'dist/vue',sourcemap:true,lib:{entry:'src/vue/index.ts',formats:['es'],fileName:()=> 'index.js'},rollupOptions:{external:['vue']}}});
