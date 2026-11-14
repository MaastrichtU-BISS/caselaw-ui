import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'pipeline',
    file: 'Pipeline',
    title: 'Pipeline stages',
    description:
      'Show a record’s stage in a table cell or card. Use the theme’s status tokens so colours follow light and dark mode.',
  },
  {
    id: 'plain',
    file: 'Plain',
    title: 'Without the tint',
    description:
      'Set soft to false for a dot and label only, which reads better in dense tables where every row has a status.',
  },
  {
    id: 'custom',
    file: 'CustomColors',
    title: 'Custom colours',
    description:
      'Pass any CSS colour when statuses are user-defined, for example the columns of a team’s own board.',
  },
];
