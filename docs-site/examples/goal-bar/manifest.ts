import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'budget-pace',
    file: 'BudgetPace',
    title: 'Spending against pace',
    description:
      'Values run from 0 to 1. Set expected to mark where the bar should be by now, so the reader sees at a glance which work package is ahead or behind.',
    height: 280,
  },
  {
    id: 'tones',
    file: 'Tones',
    title: 'Tones',
    description:
      'Switch the tone when the number needs attention. Keep the label specific, since it is the bar’s accessible name.',
    height: 260,
  },
  {
    id: 'not-reported',
    file: 'NotReported',
    title: 'No value yet',
    description:
      'Pass null when there is nothing to measure yet. The bar stays empty and does not announce a percentage.',
    height: 200,
  },
];
