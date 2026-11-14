import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'project-views',
    file: 'ProjectViews',
    title: 'Project views',
    description:
      'Switch between saved views of the same list. Counts tell people how much each view holds before they open it.',
    layout: 'fill',
  },
  {
    id: 'end-actions',
    file: 'EndActions',
    title: 'Actions and disabled views',
    description:
      'Put view-level actions in the end slot. Disable a view that has nothing to show yet instead of hiding it.',
    layout: 'fill',
  },
];
