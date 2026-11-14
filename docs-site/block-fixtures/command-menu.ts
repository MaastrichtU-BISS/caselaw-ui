import type { Fixture } from '../fixtures';

export const commands = [
  { key: 'heading', label: 'Heading', description: 'A section title', group: 'Text', icon: 'heading', shortcut: '#' },
  { key: 'list', label: 'Bulleted list', description: 'A simple list', group: 'Text', icon: 'list', shortcut: '-' },
  { key: 'quote', label: 'Quote', description: 'Cite a source or decision', group: 'Text', icon: 'quote' },
  { key: 'tasks', label: 'Task list', description: 'Track actions with owners', group: 'Planning', icon: 'checkbox', keywords: ['todo'] },
  { key: 'deadline', label: 'Deadline', description: 'A dated milestone', group: 'Planning', icon: 'cal' },
  { key: 'budget', label: 'Budget table', description: 'Grant costs by line', group: 'Data', icon: 'sigma', disabled: true },
  { key: 'chart', label: 'Chart', description: 'Publications per year', group: 'Data', icon: 'chart' },
];

export const fixture: Fixture = {
  props: { items: commands, label: 'Insert a block', query: '' },
};
