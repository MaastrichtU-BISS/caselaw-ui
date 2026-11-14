import type { Fixture } from '../fixtures';

export const fixture: Fixture = {
  props: {
    title: 'Publish peer-reviewed articles from the Open justice project',
    owner: 'Ada Lovelace',
    start: 0,
    current: 5,
    target: 12,
    unit: 'articles',
    locale: 'en-GB',
    expected: 0.55,
    confidence: 'at-risk',
    lastCheckin: { time: '3 days ago', author: 'Ada Lovelace', note: 'Two manuscripts under review.' },
  },
  wide: true,
};
