import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'send',
    file: 'Send',
    title: 'Send feedback',
    description:
      'The host sends the payload. While `sending` is set the dialog stays open and cannot be dismissed; `sent` switches to the thank-you state.',
    height: 700,
  },
  {
    id: 'failure',
    file: 'Failure',
    title: 'When sending fails',
    description:
      'Pass `error` to explain the failure inline. The message stays in place so nothing typed is lost.',
    height: 700,
  },
];
