/** Data contracts and pure helpers for BissFeed and BissFeedItem. */
import type { BissAttachment } from './types';

export interface BissFeedReaction {
  emoji: string;
  count: number;
  /** The signed-in person reacted with this emoji. */
  reacted?: boolean;
  /** Who reacted, already formatted, for the accessible name and tooltip. */
  people?: string;
}

/** A link preview the host resolved. Rendered as a card; nothing is fetched. */
export interface BissFeedLink {
  url: string;
  title?: string;
  description?: string;
  /** Site name; defaults to the URL's host. */
  site?: string;
  /** Preview image URL. Decorative. */
  image?: string;
}

/** One update in a feed. Times arrive formatted; `datetime` feeds the `<time>` element. */
export interface BissFeedUpdate {
  id: string;
  author: string;
  time: string;
  datetime?: string;
  title?: string;
  /** Plain text body. Use the body slot or snippet for rich, sanitized content. */
  body?: string;
  edited?: boolean;
  pinned?: boolean;
  attachments?: BissAttachment[];
  links?: BissFeedLink[];
  reactions?: BissFeedReaction[];
  /** Number of replies. */
  comments?: number;
}

/** The host part of a URL without `www.`, or the input when it is not a URL. */
export function linkHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Toggle the signed-in person's reaction. Returns a new list: adds the emoji,
 * removes the person's reaction, and drops reactions that reach zero.
 */
export function toggleReaction(
  reactions: readonly BissFeedReaction[],
  emoji: string,
): BissFeedReaction[] {
  const found = reactions.find((r) => r.emoji === emoji);
  if (!found) return [...reactions, { emoji, count: 1, reacted: true }];
  return reactions
    .map((r) =>
      r.emoji !== emoji
        ? r
        : { ...r, reacted: !r.reacted, count: Math.max(0, r.count + (r.reacted ? -1 : 1)) },
    )
    .filter((r) => r.count > 0);
}
