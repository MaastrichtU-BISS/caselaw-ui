import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'settings',
    file: 'Settings',
    title: 'Settings',
    description:
      'Use a switch for a setting that takes effect immediately, without a save button. Use a checkbox when the choice is submitted with a form.',
  },
  {
    id: 'disabled',
    file: 'Disabled',
    title: 'Disabled',
    description:
      'Disable a switch that depends on another setting, and use the hint to say what turns it on.',
  },
];
