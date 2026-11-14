import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'info',
    file: 'Info',
    title: 'Information',
    description:
      'Explain something people should know before they continue. Keep the title to a few words and the body to a sentence or two.',
  },
  {
    id: 'tones',
    file: 'Tones',
    title: 'Tones',
    description:
      'Success confirms a finished step, warning flags a risk the person can still fix, and danger reports something that blocks them.',
  },
  {
    id: 'actions',
    file: 'WithActions',
    title: 'With an action',
    description:
      'Offer the one action that resolves the message. The callout stays until the underlying problem is fixed.',
  },
];
