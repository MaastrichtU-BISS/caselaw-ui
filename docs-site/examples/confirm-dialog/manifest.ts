import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'delete',
    file: 'Delete',
    title: 'Confirm a deletion',
    description:
      'Ask before an action that cannot be undone. Name the record in the title and say what will be lost; focus starts on Cancel.',
    height: 320,
  },
  {
    id: 'async',
    file: 'Async',
    title: 'Waiting for the server',
    description:
      'Set busy while the request runs. Both buttons are disabled and the dialog stays open until you close it.',
    height: 320,
  },
  {
    id: 'primary',
    file: 'Primary',
    title: 'Non-destructive confirmation',
    description:
      'Use tone="primary" when the action is significant but safe, such as submitting a report to the funder.',
    height: 320,
  },
];
