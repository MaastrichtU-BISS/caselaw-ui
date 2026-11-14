import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'project-filters',
    file: 'ProjectFilters',
    title: 'Filter projects',
    description:
      'The builder edits rules; your code decides what each operator means and applies them. Here the rules filter a project list as you type.',
    layout: 'fill',
    height: 380,
  },
  {
    id: 'start-empty',
    file: 'StartEmpty',
    title: 'Start empty',
    description:
      'With no rules the builder shows only its match control and the add button. New rules take the first field and its first operator.',
    layout: 'fill',
    height: 200,
  },
];
