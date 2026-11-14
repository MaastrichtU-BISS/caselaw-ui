import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'grants',
    file: 'Grants',
    title: 'Import a grants spreadsheet',
    description:
      'Columns are matched by name and alias on first render and marked as suggested. Choosing a field that another column has moves it; required fields without a column are listed before the import continues.',
    height: 560,
    layout: 'fill',
  },
];
