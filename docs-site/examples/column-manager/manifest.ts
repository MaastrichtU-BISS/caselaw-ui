import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'table-columns',
    file: 'TableColumns',
    title: 'Table columns',
    description:
      'Every change emits the whole updated column list, so keep it in state and save it with the view. Locked columns cannot be hidden.',
    height: 340,
  },
  {
    id: 'in-popover',
    file: 'InPopover',
    title: 'In a popover',
    description:
      'Put the manager behind a toolbar button when the table needs the space. The data grid does this for you.',
    height: 120,
  },
];
