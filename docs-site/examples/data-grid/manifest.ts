import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'applications',
    file: 'Applications',
    title: 'Grant applications',
    description:
      'The grid renders; your code owns the rows, columns, selection and sort. Pin the identifying column and use the cell slot for badges and formatted values.',
    layout: 'fill',
    height: 380,
  },
  {
    id: 'empty',
    file: 'Empty',
    title: 'No records',
    description:
      'When a filter leaves nothing to show, the grid keeps its header and column controls and prints the empty label in place of rows.',
    layout: 'fill',
    height: 220,
  },
];
