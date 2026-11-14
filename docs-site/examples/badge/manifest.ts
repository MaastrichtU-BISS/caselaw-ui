import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'tones',
    file: 'Tones',
    title: 'Tones',
    description:
      'Match the tone to what the status means, not to decoration. Neutral suits most labels; keep danger for things that need attention.',
  },
  {
    id: 'dot',
    file: 'Dot',
    title: 'With a status dot',
    description:
      'Add a dot when the badge reports a live state, such as whether a service or review round is running.',
  },
  {
    id: 'mono',
    file: 'Mono',
    title: 'Identifiers',
    description:
      'Use the mono style for codes people compare character by character: grant numbers, versions and record IDs.',
  },
];
