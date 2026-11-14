/** Template gallery data contract and pure filtering/navigation. Safe to import during SSR. */
import type { BissIconName } from './icon-names';

/** A starting point someone can choose: a project, grant, meeting or board template. */
export interface BissTemplate {
  id: string;
  name: string;
  description?: string;
  /** Category value; matches a `BissTemplateCategory.value`, or is shown as written. */
  category?: string;
  icon?: BissIconName;
  /** What the template sets up, shown in the preview: sections, columns, views. */
  includes?: string[];
  /** A preview image URL. The `includes` list is shown when there is none. */
  image?: string;
  /** Extra search words that are not shown. */
  tags?: string[];
  /** A short marker such as “Recommended” or “New”. */
  badge?: string;
}

export interface BissTemplateCategory {
  value: string;
  label: string;
}

/** The category value meaning “every template”. */
export const BISS_ALL_TEMPLATES = 'all';

const normalize = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

/**
 * Templates in the chosen category whose name, description, category or tags
 * contain every word of the query (accents and case ignored). Order is kept.
 */
export function filterTemplates(
  templates: readonly BissTemplate[],
  options: { category?: string; query?: string } = {},
): BissTemplate[] {
  const category = options.category ?? BISS_ALL_TEMPLATES;
  const words = normalize(options.query ?? '')
    .split(/\s+/)
    .filter(Boolean);
  return templates.filter((t) => {
    if (category !== BISS_ALL_TEMPLATES && t.category !== category) return false;
    if (!words.length) return true;
    const haystack = normalize(
      [t.name, t.description ?? '', t.category ?? '', ...(t.tags ?? [])].join(' '),
    );
    return words.every((w) => haystack.includes(w));
  });
}

/**
 * The category chips to show: “All” first, then the given categories (or the
 * categories the templates use, in first-seen order), each with its count.
 * Categories without templates are left out.
 */
export function templateCategories(
  templates: readonly BissTemplate[],
  categories: readonly BissTemplateCategory[] | undefined,
  allLabel = 'All',
): (BissTemplateCategory & { count: number })[] {
  const counts = new Map<string, number>();
  for (const t of templates) if (t.category) counts.set(t.category, (counts.get(t.category) ?? 0) + 1);
  const list = categories?.length
    ? categories.filter((c) => counts.has(c.value))
    : [...counts.keys()].map((value) => ({ value, label: value }));
  return [
    { value: BISS_ALL_TEMPLATES, label: allLabel, count: templates.length },
    ...list.map((c) => ({ ...c, count: counts.get(c.value) ?? 0 })),
  ];
}

/**
 * Keyboard movement in a grid of `count` cards laid out in `columns` columns.
 * Arrows move by one card or one row, Home/End go to the first/last card.
 * Returns the current index for other keys or an empty grid.
 */
export function gridStep(index: number, count: number, key: string, columns = 1): number {
  if (count <= 0) return -1;
  const cols = Math.max(1, Math.floor(columns) || 1);
  const at = Math.min(Math.max(0, index), count - 1);
  switch (key) {
    case 'ArrowRight':
      return Math.min(count - 1, at + 1);
    case 'ArrowLeft':
      return Math.max(0, at - 1);
    case 'ArrowDown':
      return at + cols < count ? at + cols : at;
    case 'ArrowUp':
      return at - cols >= 0 ? at - cols : at;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return at;
  }
}

/** What BissFeedbackDialog submits. The host sends it and reports `sending`/`sent`/`error`. */
export interface BissFeedbackPayload {
  /** The chosen rating value, or `null` when none was chosen. */
  rating: string | null;
  category: string | null;
  message: string;
  /** Whether the person agreed to include the context the host described. */
  includeContext: boolean;
  email: string;
}

/** One image in BissLightbox. */
export interface BissLightboxImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  /** A smaller image for the thumbnail strip. Defaults to `src`. */
  thumbnail?: string;
}

/** Wrap an index into `[0, count)`, for carousels and image viewers. */
export function wrapIndex(index: number, count: number): number {
  if (count <= 0 || !Number.isFinite(index)) return 0;
  return ((Math.trunc(index) % count) + count) % count;
}
