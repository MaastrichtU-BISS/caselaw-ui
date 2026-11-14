import type { Fixture } from '../fixtures';

export const fixture: Fixture = {
  props: {
    value: 14,
    max: 23,
    label: 'Grant success rate',
    caption: '14 of 23 decided since 2022',
    target: 0.5 * 23,
    tone: 'success',
  },
};
