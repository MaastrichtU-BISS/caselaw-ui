import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'console',
    file: 'Console',
    title: 'Research console',
    description:
      'The shell supplies the top bar, a resizable sidebar that folds away and becomes a drawer on small screens, and the working surface. Navigation and the signed-in user go in the sidebar slots.',
    layout: 'page',
    height: 520,
  },
  {
    id: 'account-page',
    file: 'AccountPage',
    title: 'Without a sidebar',
    description:
      'Leave out the sidebar for single pages such as account settings; the content takes the full width and topLinks fill the top bar.',
    layout: 'page',
    height: 360,
  },
];
