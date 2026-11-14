import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'attachments',
    file: 'Attachments',
    title: 'With an attachment list',
    description:
      'The picker only reports the files a reader chose or dropped. Keep them in your own state and list them with BissAttachmentList.',
    height: 320,
  },
  {
    id: 'single-pdf',
    file: 'SinglePdf',
    title: 'One file of one type',
    description:
      'Set accept and multiple to narrow the file dialog. Dropped files skip accept, so check the type yourself before uploading.',
  },
  {
    id: 'disabled',
    file: 'Disabled',
    title: 'Disabled',
    description: 'Disable the drop zone when uploads are closed and say why in the hint.',
  },
];
