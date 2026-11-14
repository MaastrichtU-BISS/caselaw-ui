import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'single',
    file: 'Single',
    title: 'One choice',
    description: 'Single mode behaves like a compact radio group. Every option stays visible.',
  },
  {
    id: 'multiple',
    file: 'Multiple',
    title: 'Independent toggles, icons only',
    description:
      'Multiple mode toggles each option on its own, like formatting buttons. Icon-only items use their label as the accessible name.',
  },
];
