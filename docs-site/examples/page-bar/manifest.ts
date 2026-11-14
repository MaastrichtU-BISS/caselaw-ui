import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'list-page',
    file: 'ListPage',
    title: 'List page with views',
    description:
      'The title, a short count in meta, and the page’s main actions on one row. Put view tabs in the tabs slot or snippet so they switch what the page below shows.',
    layout: 'fill',
    height: 200,
  },
  {
    id: 'detail-page',
    file: 'DetailPage',
    title: 'Detail page with a way back',
    description:
      'Use the lead slot or snippet for a back button on a record’s page. Pick the heading level that fits the document outline, for example h2 inside a panel.',
    layout: 'fill',
    height: 180,
  },
];
