import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'editors',
    file: 'Editors',
    title: 'People on this record',
    description:
      'Show who else has the record open. Past the limit, the rest collapse into a count whose tooltip lists their names.',
  },
  {
    id: 'self',
    file: 'HideSelf',
    title: 'Leave yourself out',
    description:
      'Pass the signed-in person’s id as selfId so the stack only shows other people. Add a short caption in the default slot.',
  },
  {
    id: 'size-limit',
    file: 'SizeAndLimit',
    title: 'Size and limit',
    description:
      'Lower the limit in tight toolbars and raise the size where the stack is the main content, such as a team card.',
  },
];
