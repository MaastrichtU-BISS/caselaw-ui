import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'basic',
    file: 'Basic',
    title: 'Steppers and limits',
    description:
      'Arrow keys and the buttons step by one; Page Up and Page Down take larger steps. Values are clamped to the limits.',
  },
  {
    id: 'currency',
    file: 'Currency',
    title: 'Formatted for the locale',
    description:
      'Pass Intl.NumberFormat options. People can type 1.250,50 or 1250.5; the field parses both and formats on blur.',
  },
];
