import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'access-level',
    file: 'AccessLevel',
    title: 'Access level',
    description:
      'One choice from a few options that all need explaining. Show every option at once so people can compare them.',
  },
  {
    id: 'disabled-option',
    file: 'DisabledOption',
    title: 'Unavailable option',
    description:
      'Disable an option the user cannot pick right now and use its description to say why, rather than hiding it.',
  },
];
