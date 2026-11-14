import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'details',
    file: 'Details',
    title: 'Details on demand',
    description:
      'A popover shows extra context next to its trigger without leaving the page. It closes on Escape or a click outside.',
    height: 320,
  },
  {
    id: 'form',
    file: 'Form',
    title: 'Small form',
    description:
      'Popovers can hold a short form, such as adding a reviewer. Keep it to one or two fields; use a dialog or side panel for more.',
    height: 320,
  },
];
