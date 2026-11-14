import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'share-project',
    file: 'ShareProject',
    title: 'Share a project',
    description:
      'The panel collects an email and a role and emits invite; your code checks it, saves it and passes busy and error back. Role changes and removals come back as events too.',
    height: 460,
  },
  {
    id: 'restricted',
    file: 'Restricted',
    title: 'Rejecting an invitation',
    description:
      'Validate on invite and pass a message to error; it shows under the form until the next attempt. Entries that are not editable show their role as text.',
    height: 320,
  },
];
