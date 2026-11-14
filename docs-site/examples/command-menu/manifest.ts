import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'slash',
    file: 'Slash',
    title: 'Slash commands',
    description:
      'Type “/” in the field. The field keeps focus and forwards arrow keys, Enter and Escape to the list; what follows the slash narrows it, best match first.',
    height: 520,
  },
  {
    id: 'mentions',
    file: 'Mentions',
    title: 'Mention picker with search',
    description:
      'With searchable, the list brings its own search field. Disabled rows are skipped by the keyboard, and the empty state names what was typed.',
    height: 480,
  },
];
