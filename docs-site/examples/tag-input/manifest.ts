import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'keywords',
    file: 'Keywords',
    title: 'Keywords with suggestions',
    description:
      'Type a keyword and press Enter, comma or space to add it. Suggestions offer the terms your team already uses.',
  },
  {
    id: 'multi-word',
    file: 'MultiWord',
    title: 'Multi-word tags',
    description:
      'Set allowSpaces when tags are names or phrases. Only Enter and comma then commit the draft.',
  },
  {
    id: 'disabled',
    file: 'Disabled',
    title: 'Disabled',
    description:
      'A disabled tag input shows the current tags without remove buttons or suggestions, for example once a dataset is published.',
  },
];
