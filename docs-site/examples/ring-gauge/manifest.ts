import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'rates',
    file: 'Rates',
    title: 'Rates and shares',
    description:
      'Pass a value and its maximum; the ring draws the share and prints it. A target adds a tick. Over the maximum the ring is full and the true figure still shows; without a value it shows a dash.',
    height: 260,
  },
];
