import type { Fixture } from '../fixtures';

/** Closed by default: the tour renders nothing until the host opens it (and nothing on the server). */
export const fixture: Fixture = {
  props: {
    open: false,
    label: 'Project page tour',
    steps: [
      {
        id: 'new',
        target: '[data-tour="new-project"]',
        title: 'Start a project',
        body: 'Create a project for each grant, study or collaboration.',
      },
      {
        id: 'filters',
        target: '[data-tour="filters"]',
        title: 'Find your work',
        body: 'Filter by team, funder or status.',
      },
      {
        id: 'done',
        title: 'You are ready',
        body: 'Restart this tour from the help menu at any time.',
      },
    ],
  },
};
