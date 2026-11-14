import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'trend',
    file: 'Trend',
    title: 'Trend over time',
    description:
      'Pass the values in order and a label that states what they measure and over which period; the label is the chart’s accessible name. Hover a point to see its value.',
    layout: 'fill',
    height: 260,
  },
  {
    id: 'compact',
    file: 'Compact',
    title: 'Compact and coloured',
    description:
      'Lower the height for a trend beside a headline number, and set color to any CSS colour or token.',
    height: 220,
  },
];
