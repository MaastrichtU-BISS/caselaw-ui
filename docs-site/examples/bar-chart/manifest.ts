import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'with-comparison',
    file: 'WithComparison',
    title: 'Total with a highlighted share',
    description:
      'Each point can carry a compare value, drawn at the base of its bar. Use it for a subset of the total, such as submissions returned for changes.',
    layout: 'fill',
    height: 300,
  },
  {
    id: 'single-series',
    file: 'SingleSeries',
    title: 'Single series',
    description:
      'Leave out compare and compareLabel for a plain count over time. Name the series so the legend and the chart’s accessible label read correctly.',
    layout: 'fill',
    height: 300,
  },
];
