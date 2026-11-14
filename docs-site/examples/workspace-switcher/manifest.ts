import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'switch',
    file: 'Switch',
    title: 'Switch workspace',
    description:
      'The trigger names the current workspace and your role in it. Arrow keys move through the list, Enter switches, and the host decides what switching does.',
    height: 380,
  },
  {
    id: 'search',
    file: 'Search',
    title: 'Many workspaces and the rail',
    description:
      'Past six workspaces a search field appears. In a collapsed sidebar the trigger shrinks to the workspace mark and keeps its accessible name.',
    height: 520,
  },
];
