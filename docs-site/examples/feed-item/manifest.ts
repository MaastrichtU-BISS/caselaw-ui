import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'rich-body',
    file: 'RichBody',
    title: 'Update with a rich body',
    description:
      'Pass sanitized rich content through the default slot (Vue) or children snippet (Svelte). Files, link previews, reactions and replies render from the update.',
    height: 380,
    layout: 'fill',
  },
];
