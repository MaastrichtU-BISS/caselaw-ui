import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'first-use',
    file: 'FirstUse',
    title: 'Nothing created yet',
    description:
      'Say what will appear here and offer the action that creates the first item.',
  },
  {
    id: 'no-results',
    file: 'NoResults',
    title: 'No matching results',
    description:
      'When a search or filter hides everything, say so and offer a way back to the full list.',
    layout: 'fill',
  },
  {
    id: 'in-card',
    file: 'InCard',
    title: 'Inside a card',
    description:
      'Keep the section’s card and heading in place so the page layout does not jump when data arrives.',
    layout: 'fill',
  },
];
