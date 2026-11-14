import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'team-members',
    file: 'TeamMembers',
    title: 'Team members',
    description:
      'Pair an avatar with the name it stands for. Initials and colour come from the name, so the same person always looks the same.',
  },
  {
    id: 'sizes',
    file: 'Sizes',
    title: 'Sizes',
    description:
      'Use 20 to 24 pixels in table rows and comment threads, 32 by default, and larger sizes only on profile pages.',
  },
  {
    id: 'label',
    file: 'AccessibleLabel',
    title: 'Accessible label',
    description:
      'An avatar announces the person’s name. Pass a label when its role matters more than the name, such as an assignee.',
  },
];
