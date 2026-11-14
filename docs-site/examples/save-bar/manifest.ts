import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'unsaved-changes',
    file: 'UnsavedChanges',
    title: 'Unsaved changes',
    description:
      'Show the bar as soon as a form differs from what was saved, and hide it again after saving or discarding. Edit the title to bring it up.',
    height: 320,
  },
  {
    id: 'save-error',
    file: 'SaveError',
    title: 'When saving fails',
    description:
      'Pass the server’s message as error and keep the changes, so the reader can fix them and try again. Here a budget above the grant ceiling is rejected.',
    height: 320,
  },
];
