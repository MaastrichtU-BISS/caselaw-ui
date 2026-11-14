import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'tones',
    file: 'Tones',
    title: 'Known amounts',
    description:
      'Show the label and value when the number matters. Tones reinforce the state; the text still says it.',
    layout: 'fill',
  },
  {
    id: 'indeterminate',
    file: 'Indeterminate',
    title: 'Unknown duration',
    description:
      'Pass null while the amount is unknown, then switch to a number once the server reports progress.',
    layout: 'fill',
  },
];
