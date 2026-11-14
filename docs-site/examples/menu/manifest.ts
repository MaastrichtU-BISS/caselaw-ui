import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'actions',
    file: 'Actions',
    title: 'Record actions',
    description:
      'A menu of actions for one record. Items can carry an icon, a shortcut hint and a separator; put destructive actions last and mark them danger.',
    height: 360,
  },
  {
    id: 'options',
    file: 'Options',
    title: 'Checkable options and submenus',
    description:
      'Set checked to make an item a checkbox and keep its state in your own data. Items with children open a submenu with a Back button.',
    height: 340,
  },
  {
    id: 'searchable',
    file: 'Searchable',
    title: 'Searchable',
    description:
      'Turn on searchable when the list is long, such as moving a record to one of many projects.',
    height: 380,
  },
];
