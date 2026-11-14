import type { Fixture } from '../fixtures';

/** Synthetic project updates, shared by the Feed and FeedItem fixtures. */
export const updates = [
  {
    id: 'u1',
    author: 'Ada Lovelace',
    time: '2 h ago',
    datetime: '2026-11-14T09:12:00Z',
    title: 'Ethics approval received',
    body: 'The committee approved the interview protocol without changes. Fieldwork can start on 1 December.',
    pinned: true,
    attachments: [{ id: 'f1', name: 'Approval letter.pdf', size: '182 KB', type: 'PDF', href: '#' }],
    reactions: [
      { emoji: '🎉', count: 4, reacted: true, people: 'You, Grace Hopper, Alan Turing and Katherine Johnson' },
      { emoji: '👍', count: 2, people: 'Grace Hopper and Alan Turing' },
    ],
    comments: 3,
  },
  {
    id: 'u2',
    author: 'Grace Hopper',
    time: 'Yesterday',
    datetime: '2026-11-13T15:40:00Z',
    body: 'The NWO Open Science call closes in six weeks. I drafted the data management section; comments welcome.',
    links: [
      {
        url: 'https://www.nwo.nl/en/calls/open-science-fund',
        title: 'Open Science Fund 2026',
        description: 'Funding for projects that make research more open, transparent and reproducible.',
        site: 'NWO',
      },
    ],
    reactions: [{ emoji: '👀', count: 1, people: 'Alan Turing' }],
  },
];

export const fixture: Fixture = {
  props: { item: updates[0] },
};
