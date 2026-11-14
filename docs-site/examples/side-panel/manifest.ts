import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'record',
    file: 'Record',
    title: 'Record details',
    description:
      'Open a side panel to show one record while the list stays in place. You own the open state; the panel asks to close through its close event.',
    height: 460,
  },
  {
    id: 'edit',
    file: 'Edit',
    title: 'Editing with a busy state',
    description:
      'Put a form in the panel and its buttons in the actions slot. While busy, the panel cannot be closed and its close button is disabled.',
    height: 460,
  },
];
