/// <reference types="vite/client" />
/**
 * Authored examples: every example is a real `.vue` and `.svelte` file pair under
 * `examples/<component-slug>/`, described by that folder's `manifest.ts`.
 * The docs render the compiled file and show its exact raw source, so the code a
 * reader copies is the code that ran.
 */
export interface ExampleMeta {
  /** Stable id, unique within the component. */
  id: string;
  /** File name without extension: `<file>.vue` and `<file>.svelte` must both exist. */
  file: string;
  title: string;
  description: string;
  /** Minimum preview height in pixels; the frame grows with its content. */
  height?: number;
  /** Center small examples; let wide blocks fill the frame; give full-page shells the whole frame. */
  layout?: 'center' | 'fill' | 'page';
}

const manifests = import.meta.glob<{ examples: readonly ExampleMeta[] }>('./*/manifest.ts', {
  eager: true,
});

/** Component slug (for example `button`) to its authored examples, in manifest order. */
export const examplesBySlug: Record<string, readonly ExampleMeta[]> = Object.fromEntries(
  Object.entries(manifests)
    .map(([path, mod]) => [path.split('/')[1], mod.examples] as const)
    .filter(([slug, list]) => slug !== 'dialog' && Array.isArray(list) && list.length),
);

export const exampleSources = import.meta.glob<string>(
  ['./*/*.vue', './*/*.svelte', '!./dialog/*'],
  { eager: true, query: '?raw', import: 'default' },
);

export function exampleSource(slug: string, file: string, framework: 'vue' | 'svelte') {
  return exampleSources[`./${slug}/${file}.${framework}`] ?? '';
}
