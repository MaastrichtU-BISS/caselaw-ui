import type { Fixture } from '../fixtures';

/** Synthetic research-office notifications, shared by the fixture and authored examples. */
export const notices = [
  {
    id: 'n1',
    title: 'Ada Lovelace mentioned you',
    detail: 'Methods review for Open justice',
    meta: 'Open justice · 5 min ago',
    unread: true,
    icon: 'at',
    tone: 'info',
  },
  {
    id: 'n2',
    title: 'You were assigned',
    detail: 'Draft the data management plan',
    meta: 'Horizon grant · 1 h ago',
    unread: true,
    icon: 'user',
    tone: 'success',
  },
  {
    id: 'n3',
    title: 'Deadline tomorrow',
    detail: 'Ethics committee submission',
    meta: 'Public access study · 3 h ago',
    unread: true,
    icon: 'clock',
    tone: 'warning',
  },
  {
    id: 'n4',
    title: 'Grace Hopper shared a document',
    detail: 'Interview protocol v3',
    meta: 'Courts and citizens · Yesterday',
    icon: 'file',
    tone: 'neutral',
  },
  {
    id: 'n5',
    title: 'Budget line is over plan',
    detail: 'Travel, 112% of allocation',
    meta: 'Horizon grant · 2 days ago',
    icon: 'alert',
    tone: 'danger',
  },
];

export const fixture: Fixture = {
  props: { items: notices },
};
