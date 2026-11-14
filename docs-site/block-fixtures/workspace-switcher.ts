import type { Fixture } from '../fixtures';

export const workspaces = [
  { id: 'law', name: 'Faculty of Law', detail: 'Research office · Admin' },
  { id: 'biss', name: 'BISS Institute', detail: 'Data science · Editor' },
  { id: 'grants', name: 'Grants support', detail: 'Funding office · Viewer' },
];

export const fixture: Fixture = {
  props: { workspaces, current: 'law' },
};
