import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'explain',
    file: 'Explain',
    title: 'Explain a term',
    description:
      'Put a tooltip next to a figure or label that needs a short explanation. It opens on hover and keyboard focus; label names the button.',
  },
  {
    id: 'custom-trigger',
    file: 'CustomTrigger',
    title: 'Custom icon',
    description:
      'Pass your own icon as the default content when the info icon does not fit, for example to explain why a record is locked.',
  },
];
