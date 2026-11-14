import type { Fixture } from '../fixtures';

/** Synthetic research-office templates, shared by the fixture and SSR checks. */
export const templates = [
  {
    id: 'grant',
    name: 'Grant application',
    description: 'Track a funding call from intent to submission, with budget and partner tasks.',
    category: 'funding',
    icon: 'target',
    badge: 'Recommended',
    includes: ['Call details and deadlines', 'Budget table by work package', 'Partner letters checklist'],
    tags: ['horizon', 'erc', 'proposal'],
  },
  {
    id: 'study',
    name: 'Research study',
    description: 'Plan methods, ethics approval and data management for one study.',
    category: 'research',
    icon: 'file',
    includes: ['Methods and protocol sections', 'Ethics approval steps', 'Data management plan'],
  },
  {
    id: 'meeting',
    name: 'Team meeting',
    description: 'A recurring agenda with decisions and follow-up actions.',
    category: 'meetings',
    icon: 'cal',
    includes: ['Timed agenda', 'Decisions log', 'Action items with owners'],
  },
];

export const fixture: Fixture = {
  props: {
    templates,
    categories: [
      { value: 'funding', label: 'Funding' },
      { value: 'research', label: 'Research' },
      { value: 'meetings', label: 'Meetings' },
    ],
    selected: 'grant',
    blank: true,
  },
  wide: true,
};
