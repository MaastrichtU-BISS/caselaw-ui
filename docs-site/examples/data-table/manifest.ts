import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'projects',
    file: 'Projects',
    title: 'Project overview',
    description:
      'Columns sort when their header is clicked. Mark amounts as numeric so they right-align, and render rich cells such as a status badge through the cell slot or snippet.',
    layout: 'fill',
    height: 360,
  },
  {
    id: 'pagination',
    file: 'Pagination',
    title: 'Pagination',
    description:
      'Set pageSize for longer lists. The pager appears only when there is more than one page, and sorting returns to the first page.',
    layout: 'fill',
    height: 380,
  },
  {
    id: 'loading-empty',
    file: 'LoadingAndEmpty',
    title: 'Loading and empty',
    description:
      'While rows load, the table draws skeleton rows in the same columns. When a query returns nothing, say why in the empty message.',
    layout: 'fill',
    height: 300,
  },
];
