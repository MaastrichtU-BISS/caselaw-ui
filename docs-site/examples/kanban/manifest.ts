import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'manuscripts',
    file: 'Manuscripts',
    title: 'Manuscript pipeline',
    description:
      'Cards move by drag and drop or with the lane picker on each card; both emit move, and your code updates the card. Add emits the lane so you can create the record there.',
    layout: 'fill',
    height: 300,
  },
  {
    id: 'read-only',
    file: 'ReadOnly',
    title: 'Read-only board',
    description:
      'For people who can view but not edit, readonly removes dragging, the lane pickers and the add buttons. Cards can still be opened.',
    layout: 'fill',
    height: 240,
  },
];
