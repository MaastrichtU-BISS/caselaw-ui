import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'app',
    file: 'App',
    title: 'Application sidebar',
    description:
      'The workspace switcher, navigation sections, pinned records and the signed-in person. Collapse it to an icon rail; on phones the menu button opens it as a drawer.',
    height: 600,
    layout: 'fill',
  },
  {
    id: 'rail',
    file: 'Rail',
    title: 'Icon rail',
    description:
      'Collapsed, only icons show. Labels stay available to assistive technology, and slots receive collapsed so content can switch to a compact form.',
    height: 520,
    layout: 'fill',
  },
];
