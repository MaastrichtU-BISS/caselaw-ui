import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'single',
    file: 'Single',
    title: 'A single value',
    description:
      'Show the value beside the label so people do not have to guess where the thumb sits.',
    layout: 'fill',
  },
  {
    id: 'range',
    file: 'Range',
    title: 'A range in a field',
    description:
      'Pass a pair to get two thumbs. Inside a Field, the field label names the slider and the hint explains it.',
    layout: 'fill',
  },
];
