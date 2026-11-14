import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'objective',
    file: 'Objective',
    title: 'Key results of an objective',
    description:
      'Progress runs from start to target, including targets that go down. The marker shows where the team should be by today. Check in to record a new value, confidence and note; Escape cancels.',
    height: 420,
    layout: 'fill',
  },
];
