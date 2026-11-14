import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'record-trail',
    file: 'RecordTrail',
    title: 'Record trail',
    description:
      'Show where a record sits so people can step back up. The last item is the current page and is never a link.',
  },
  {
    id: 'page-heading',
    file: 'PageHeading',
    title: 'Above a page heading',
    description:
      'Place the trail directly above the title it leads to. Give each trail a distinct label when a page has more than one.',
    layout: 'fill',
  },
];
