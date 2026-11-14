import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'project-updates',
    file: 'ProjectUpdates',
    title: 'Project updates',
    description:
      'The host owns the updates. Posting adds one to the top, reactions toggle with the toggleReaction helper, and “Load more” asks the host for older updates.',
    height: 720,
    layout: 'fill',
  },
  {
    id: 'states',
    file: 'States',
    title: 'Loading, empty and failed',
    description: 'Each state explains itself; a failed load offers a retry instead of an empty list.',
    height: 320,
    layout: 'fill',
  },
];
