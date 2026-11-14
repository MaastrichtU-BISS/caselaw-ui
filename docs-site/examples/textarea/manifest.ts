import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'character-limit',
    file: 'CharacterLimit',
    title: 'Character limit',
    description:
      'Show the remaining space in the hint while the user types, and turn it into an error once the text runs over.',
  },
  {
    id: 'required',
    file: 'Required',
    title: 'Required on submit',
    description:
      'Check a required text only when the form is submitted, then clear the error as soon as the user starts typing.',
  },
  {
    id: 'monospace',
    file: 'Monospace',
    title: 'Monospace',
    description:
      'Use mono for structured text such as citations, queries or configuration, where alignment and exact characters matter.',
  },
];
