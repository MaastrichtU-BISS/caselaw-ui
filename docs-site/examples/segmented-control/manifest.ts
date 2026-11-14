import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'time-range',
    file: 'TimeRange',
    title: 'Time range',
    description:
      'Switch between two to five views of the same data. The change applies at once, so there is no submit step.',
  },
  {
    id: 'disabled-option',
    file: 'DisabledOption',
    title: 'Unavailable option',
    description:
      'Disable a segment that has nothing to show yet, so the control keeps its shape as data arrives.',
  },
];
