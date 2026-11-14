/** Pure page-range logic shared by the Vue and Svelte pagination controls. */
export type BissPageItem =
  { type: 'page'; page: number } | { type: 'ellipsis'; key: 'start' | 'end' };

/** Number of pages needed for `total` records; never less than one. */
export function pageCount(total: number, pageSize: number): number {
  const size = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 1;
  const records = Number.isFinite(total) && total > 0 ? Math.floor(total) : 0;
  return Math.max(1, Math.ceil(records / Math.max(1, size)));
}

/** Keep a requested page inside 1..count, treating invalid input as the first page. */
export function clampPage(page: number, count: number): number {
  const last = Math.max(1, Math.floor(Number.isFinite(count) ? count : 1));
  if (!Number.isFinite(page)) return 1;
  return Math.min(last, Math.max(1, Math.round(page)));
}

/** The 1-based record range shown on a page, for example 26–50 of 72. */
export function pageRange(page: number, pageSize: number, total: number) {
  const records = Number.isFinite(total) && total > 0 ? Math.floor(total) : 0;
  if (!records) return { start: 0, end: 0, total: 0 };
  const size = Number.isFinite(pageSize) && pageSize >= 1 ? Math.floor(pageSize) : 1;
  const current = clampPage(page, pageCount(records, size));
  return {
    start: (current - 1) * size + 1,
    end: Math.min(records, current * size),
    total: records,
  };
}

const range = (start: number, end: number) =>
  end < start ? [] : Array.from({ length: end - start + 1 }, (_, i) => start + i);

/**
 * Page buttons with ellipses. `boundaries` pages stay visible at each end and
 * `siblings` pages on each side of the current page. Once pages overflow, the
 * number of items stays constant while paging, so controls do not jump under
 * the pointer.
 */
export function paginationRange(
  page: number,
  count: number,
  { siblings = 1, boundaries = 1 }: { siblings?: number; boundaries?: number } = {},
): BissPageItem[] {
  const total = Math.max(1, Math.floor(Number.isFinite(count) ? count : 1));
  const current = clampPage(page, total);
  const s = Math.max(0, Math.floor(siblings));
  const b = Math.max(0, Math.floor(boundaries));
  const asPages = (pages: number[]): BissPageItem[] =>
    pages.map((p) => ({ type: 'page', page: p }));
  // Everything fits: both boundaries, the siblings, the current page and two ellipsis slots.
  if (total <= b * 2 + s * 2 + 3) return asPages(range(1, total));
  const startPages = range(1, Math.min(b, total));
  const endPages = range(Math.max(total - b + 1, b + 1), total);
  const siblingsStart = Math.max(Math.min(current - s, total - b - s * 2 - 1), b + 2);
  const siblingsEnd = Math.min(
    Math.max(current + s, b + s * 2 + 2),
    endPages.length ? endPages[0]! - 2 : total - 1,
  );
  const items: BissPageItem[] = asPages(startPages);
  if (siblingsStart > b + 2) items.push({ type: 'ellipsis', key: 'start' });
  else if (b + 1 < total - b) items.push({ type: 'page', page: b + 1 });
  items.push(...asPages(range(siblingsStart, siblingsEnd)));
  if (siblingsEnd < total - b - 1) items.push({ type: 'ellipsis', key: 'end' });
  else if (total - b > b) items.push({ type: 'page', page: total - b });
  items.push(...asPages(endPages));
  return items;
}
