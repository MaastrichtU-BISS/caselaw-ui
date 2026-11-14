import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'status-filter',
    file: 'StatusFilter',
    title: 'Status filter',
    description:
      'Pick several values for one filter. Counts show how many records each value matches, and colors match the status badges in the table.',
    height: 360,
  },
  {
    id: 'exclude',
    file: 'Exclude',
    title: 'Include or exclude',
    description:
      'Turn on canNegate when a filter should also work the other way round, such as hiding every project from certain funders.',
    height: 380,
  },
];
