import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'wrapper',
    file: 'Views',
    title: 'Views with counts',
    description:
      'The wrapper takes items and renders one panel per item. Bind the selected value to keep it in the URL or in your store.',
    layout: 'fill',
  },
  {
    id: 'segmented',
    file: 'Segmented',
    title: 'Segmented and small',
    description:
      'The segmented variant suits switching between modes of the same content, such as chart and table.',
  },
];
