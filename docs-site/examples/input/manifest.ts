import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'basic',
    file: 'Basic',
    title: 'Basic',
    description:
      'Bind the value with v-model in Vue or bind:value in Svelte, and put the input in a field so it has a label.',
  },
  {
    id: 'types',
    file: 'Types',
    title: 'Input types',
    description:
      'Use the native type that matches the data so browsers offer the right keyboard and validation. Monospace suits codes and identifiers.',
  },
  {
    id: 'states',
    file: 'States',
    title: 'Invalid and disabled',
    description:
      'Set invalid when a value fails a check you run yourself; inside a field with an error this happens automatically.',
  },
];
