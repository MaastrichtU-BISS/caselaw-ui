import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'assign-lead',
    file: 'AssignLead',
    title: 'Assign a lead',
    description:
      'A searchable picker for longer lists. Descriptions help people tell similar options apart; the picker emits the chosen value and you store it.',
    height: 380,
  },
  {
    id: 'grouped',
    file: 'Grouped',
    title: 'Grouped options',
    description:
      'Give options a group to add headings. Keep options in group order; a heading appears whenever the group changes.',
    height: 380,
  },
  {
    id: 'short-list',
    file: 'ShortList',
    title: 'Short list',
    description:
      'Turn off search for a handful of options, and disable the ones the current user cannot choose.',
    height: 300,
  },
];
