import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'loading-summary',
    file: 'LoadingSummary',
    title: 'Loading a summary',
    description:
      'Draw the shape of the content that is on its way, then swap in the real text. The skeleton is hidden from assistive technology, so announce the loading state yourself.',
    height: 260,
  },
  {
    id: 'shapes',
    file: 'Shapes',
    title: 'Matching the layout',
    description:
      'Set height, width and gap to mirror the heading, paragraph and rows you are waiting for. With several lines, the last one is shortened like the end of a paragraph.',
    height: 300,
  },
];
