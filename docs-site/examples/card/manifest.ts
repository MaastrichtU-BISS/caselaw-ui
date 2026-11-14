import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'project-summary',
    file: 'ProjectSummary',
    title: 'Project summary',
    description:
      'Group one record’s summary and its actions on a single surface. A section header gives the card its title and actions.',
  },
  {
    id: 'grid',
    file: 'CardGrid',
    title: 'Cards in a grid',
    description:
      'Lay comparable records side by side with the split layout. It drops to one column on narrow screens.',
    layout: 'fill',
  },
];
