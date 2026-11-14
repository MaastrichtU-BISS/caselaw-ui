import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'confirm-actions',
    file: 'ConfirmActions',
    title: 'Confirming an action',
    description:
      'Render one stack per app and push messages from anywhere. Toasts confirm work that already happened and dismiss themselves after a few seconds.',
    height: 320,
  },
  {
    id: 'tones',
    file: 'Tones',
    title: 'Tones and persistence',
    description:
      'Match the tone to the outcome. Pass timeout: 0 for a message the reader must see, such as a failure, so it stays until they dismiss it.',
    height: 420,
  },
];
