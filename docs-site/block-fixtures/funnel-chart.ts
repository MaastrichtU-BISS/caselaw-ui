import type { Fixture } from '../fixtures';

/** A synthetic grant pipeline for the research office. */
export const fixture: Fixture = {
  props: {
    label: 'Grant pipeline 2026',
    stages: [
      { key: 'ideas', label: 'Ideas', value: 48, note: 'Logged by researchers' },
      { key: 'drafts', label: 'In preparation', value: 31 },
      { key: 'submitted', label: 'Submitted', value: 22 },
      { key: 'shortlisted', label: 'Shortlisted', value: 9 },
      { key: 'awarded', label: 'Awarded', value: 5, display: '5 · €3.1M' },
    ],
  },
  wide: true,
};
