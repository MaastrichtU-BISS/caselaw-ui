import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'project-page',
    file: 'ProjectPage',
    title: 'A tour of the projects page',
    description:
      'Steps point at elements by selector. The card follows its target, ←/→ move between steps and Escape skips. A step without a target is centered; the host stores whether the tour was finished.',
    layout: 'fill',
    height: 520,
  },
];
