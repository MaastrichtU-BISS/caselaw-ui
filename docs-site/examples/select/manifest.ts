import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'basic',
    file: 'Basic',
    title: 'Basic',
    description:
      'A native select for short, fixed lists. Start empty with a placeholder when there is no sensible default.',
  },
  {
    id: 'validation',
    file: 'Validation',
    title: 'Validation',
    description:
      'Report a missing choice through the surrounding field, which marks the select invalid and announces the message.',
  },
  {
    id: 'disabled',
    file: 'Disabled',
    title: 'Disabled',
    description:
      'Disable a select whose value is fixed by an earlier choice, and use the hint to say why.',
  },
];
