import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'single',
    file: 'Single',
    title: 'Single date',
    description:
      'An inline calendar for choosing one day. Readers can also type a date such as "15 jan" or "tomorrow" and press Enter.',
    height: 420,
  },
  {
    id: 'range',
    file: 'Range',
    title: 'Date range',
    description:
      'Set range and handle the range event. The first click sets the start, the second the end, in either order.',
    height: 420,
  },
  {
    id: 'bounds',
    file: 'Bounds',
    title: 'Minimum and maximum',
    description:
      'Use min and max to keep the choice inside a grant period. Days outside it are disabled and skipped by the keyboard.',
    height: 420,
  },
];
