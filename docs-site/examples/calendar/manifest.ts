import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'deadlines',
    file: 'Deadlines',
    title: 'Faculty deadlines',
    description:
      'The calendar shows one month; keep the month in state and add your own previous and next controls. The plus on each day emits add with that date.',
    layout: 'fill',
    height: 640,
  },
  {
    id: 'read-only',
    file: 'ReadOnly',
    title: 'Read-only schedule',
    description:
      'Set readonly for a published schedule. Items stay clickable so people can open the details.',
    layout: 'fill',
    height: 600,
  },
];
