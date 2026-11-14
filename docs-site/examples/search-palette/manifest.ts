import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'grouped',
    file: 'Grouped',
    title: 'Jump to anything',
    description:
      'A search dialog over projects, people and actions. Items with the same group are listed under one heading; arrow keys move through the results.',
    height: 460,
  },
  {
    id: 'remote',
    file: 'Remote',
    title: 'Results from the server',
    description:
      'Handle the query event to fetch results, and set loading while the request runs. The palette still filters what you pass in.',
    height: 460,
  },
];
