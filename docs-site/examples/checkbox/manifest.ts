import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'notifications',
    file: 'Notifications',
    title: 'Notification settings',
    description:
      'A group of independent on/off choices. Add a description when the label alone does not say what changes.',
  },
  {
    id: 'confirmation',
    file: 'Confirmation',
    title: 'Confirmation',
    description:
      'Ask for an explicit confirmation before an action with consequences, and keep the action disabled until it is given.',
  },
  {
    id: 'disabled',
    file: 'Disabled',
    title: 'Disabled',
    description:
      'Disable a checkbox that the current user cannot change, and say who can in the description.',
  },
];
