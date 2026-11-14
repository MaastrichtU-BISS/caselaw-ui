import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'single',
    file: 'Single',
    title: 'One section at a time',
    description:
      'Use single mode for FAQs and settings where one open section keeps the page short.',
    layout: 'fill',
  },
  {
    id: 'multiple',
    file: 'Multiple',
    title: 'Several open, rich content',
    description:
      'Multiple mode lets people compare sections. Pass a slot or snippet when a section needs more than text.',
    layout: 'fill',
  },
];
