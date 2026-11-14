import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'records',
    file: 'Records',
    title: 'Records with page size',
    description:
      'Give the total and the component derives the page count and the visible range. Reset to the first page when the page size changes.',
    layout: 'fill',
  },
  {
    id: 'pages',
    file: 'Pages',
    title: 'Pages only',
    description:
      'When only the page count is known, pass pages. Siblings and boundaries control how many numbers stay visible.',
  },
];
