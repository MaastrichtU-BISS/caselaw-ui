import type { Fixture } from '../fixtures';
import { updates } from './feed-item';

export const fixture: Fixture = {
  props: { items: updates, hasMore: true },
  wide: true,
};
