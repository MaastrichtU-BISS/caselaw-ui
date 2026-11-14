import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'period',
    file: 'Period',
    title: 'Start and end dates',
    description:
      'Two compact date fields that open a calendar. The end field uses the chosen start as its min, so the period cannot run backwards.',
    height: 440,
  },
  {
    id: 'empty',
    file: 'Empty',
    title: 'Optional date',
    description:
      'With no value the trigger shows the placeholder. Clear in the calendar sets the value back to null.',
    height: 440,
  },
  {
    id: 'disabled',
    file: 'Disabled',
    title: 'Disabled',
    description: 'Disable the field when the date is fixed by someone else, such as a funder deadline.',
  },
];
