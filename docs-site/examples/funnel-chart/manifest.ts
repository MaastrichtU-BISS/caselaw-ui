import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'pipeline',
    file: 'Pipeline',
    title: 'Grant pipeline',
    description:
      'Each stage prints its count and the share that continues from the stage before, so the shape is never the only signal. Interactive stages open the records behind them.',
    layout: 'fill',
    height: 360,
  },
  {
    id: 'empty',
    file: 'Empty',
    title: 'No data yet',
    description: 'Without stages, or when every stage is zero, the chart says so instead of drawing nothing.',
    height: 160,
  },
];
