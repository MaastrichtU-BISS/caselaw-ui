import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'inbox',
    file: 'Inbox',
    title: 'Latest notifications',
    description:
      'The host owns the notices and their read state. Picking one marks it read and opens it; “Mark all as read” clears the count on the bell.',
    height: 560,
    layout: 'fill',
  },
  {
    id: 'states',
    file: 'States',
    title: 'Empty, loading and failed',
    description:
      'Each state says what is happening. A failed load offers a retry instead of an empty panel.',
    height: 420,
  },
];
