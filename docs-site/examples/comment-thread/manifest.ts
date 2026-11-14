import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'review',
    file: 'Review',
    title: 'Review discussion',
    description:
      'Posting emits comment with the text; append it to your list once it is saved. Resolve emits the new state, and a resolved thread hides its composer.',
    height: 460,
  },
  {
    id: 'read-only',
    file: 'ReadOnly',
    title: 'Archived thread',
    description:
      'Set readonly for history people can read but not add to, such as the discussion on a submitted report.',
    height: 260,
  },
];
