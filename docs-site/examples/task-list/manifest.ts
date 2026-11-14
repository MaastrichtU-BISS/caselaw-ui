import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'grant-tasks',
    file: 'GrantTasks',
    title: 'Grant submission tasks',
    description:
      'Ticking a task emits complete with the new state; update the item and the row strikes through. Titles are buttons that emit open.',
    layout: 'fill',
    height: 300,
  },
  {
    id: 'read-only-items',
    file: 'ReadOnlyItems',
    title: 'Tasks owned by others',
    description:
      'Mark items readonly when the signed-in person may see a task but not complete it, such as an approval that belongs to the grants office.',
    layout: 'fill',
    height: 220,
  },
];
