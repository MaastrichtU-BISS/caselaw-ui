import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'deadline',
    file: 'Deadline',
    title: 'Page-level notice',
    description:
      'A one-line notice above a list or form. Use it for timely facts about the whole page, with at most one action.',
    layout: 'fill',
  },
  {
    id: 'tones',
    file: 'Tones',
    title: 'Tones',
    description:
      'Info is the default. Warning flags something that needs attention soon; danger reports something already wrong.',
    layout: 'fill',
  },
  {
    id: 'dismiss',
    file: 'Dismissible',
    title: 'Dismissible',
    description:
      'Let people dismiss notices that are only informational. Keep the state in your app so the notice stays closed.',
    layout: 'fill',
  },
];
