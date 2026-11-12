import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';
export default defineConfig({plugins:[svelte()],root:'examples/svelte',build:{outDir:'../../dist-demo-svelte',emptyOutDir:true}});
