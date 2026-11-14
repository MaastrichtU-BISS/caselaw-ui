/**
 * Pure command-list logic for BissCommandMenu and BissWorkspaceSwitcher:
 * matching and ranking, grouping and keyboard movement that skips disabled rows.
 * Framework independent and safe during SSR.
 */
import type { BissIconName } from './icon-names';

/** One entry of a command list: a slash command, a mention, a workspace. */
export interface BissCommand {
  key: string;
  label: string;
  description?: string;
  /** Heading the command is listed under while nothing is typed. */
  group?: string;
  icon?: BissIconName;
  /** A keyboard shortcut hint, already formatted (“⌘B”). */
  shortcut?: string;
  /** Extra words that should find this command (aliases, synonyms). */
  keywords?: string[];
  disabled?: boolean;
  /** Marks the current choice, for example the active workspace. */
  checked?: boolean;
}

/** A workspace in BissWorkspaceSwitcher. */
export interface BissWorkspace {
  id: string;
  name: string;
  /** A second line: plan, role or organisation. */
  detail?: string;
  /** Image URL for the workspace mark; initials are used otherwise. */
  logo?: string;
}

export interface BissCommandGroup<T extends BissCommand = BissCommand> {
  /** Empty when the list is flat (while a query is typed, or ungrouped items). */
  name: string;
  items: { item: T; index: number }[];
}

const fold = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLocaleLowerCase()
    .trim();

/**
 * How well a command matches a query: lower is better, `-1` is no match.
 * Label prefix, then a word in the label, then anywhere in the label,
 * then keywords, then the description.
 */
export function commandScore(item: BissCommand, query: string): number {
  const q = fold(query);
  if (!q) return 0;
  const label = fold(item.label);
  if (label.startsWith(q)) return 0;
  if (label.split(/[\s\-_/]+/).some((word) => word.startsWith(q))) return 1;
  if (label.includes(q)) return 2;
  if ((item.keywords ?? []).some((word) => fold(word).includes(q))) return 3;
  if (item.description && fold(item.description).includes(q)) return 4;
  return -1;
}

/** Matching commands, best first; ties keep the host's order. An empty query keeps everything. */
export function filterCommands<T extends BissCommand>(items: readonly T[], query = ''): T[] {
  if (!fold(query)) return [...items];
  return items
    .map((item, order) => ({ item, order, score: commandScore(item, query) }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => a.score - b.score || a.order - b.order)
    .map((entry) => entry.item);
}

/**
 * Group commands under their headings in first-appearance order.
 * With `flat`, one unnamed group keeps the given (ranked) order.
 * `index` is the position in the flattened list, for keyboard movement.
 */
export function groupCommands<T extends BissCommand>(
  items: readonly T[],
  flat = false,
): BissCommandGroup<T>[] {
  if (!items.length) return [];
  if (flat) return [{ name: '', items: items.map((item, index) => ({ item, index })) }];
  const groups: BissCommandGroup<T>[] = [];
  const byName = new Map<string, BissCommandGroup<T>>();
  items.forEach((item) => {
    const name = item.group ?? '';
    let group = byName.get(name);
    if (!group) {
      group = { name, items: [] };
      byName.set(name, group);
      groups.push(group);
    }
    group.items.push({ item, index: 0 });
  });
  let index = 0;
  for (const group of groups) for (const entry of group.items) entry.index = index++;
  return groups;
}

/** The flattened order the groups are rendered in. */
export function flattenGroups<T extends BissCommand>(groups: readonly BissCommandGroup<T>[]): T[] {
  return groups.flatMap((group) => group.items.map((entry) => entry.item));
}

export type BissCommandStep = 1 | -1 | 'first' | 'last';

/**
 * The next active index, skipping disabled commands. Arrow steps wrap around.
 * Returns `-1` when nothing can be chosen.
 */
export function moveActive(
  items: readonly Pick<BissCommand, 'disabled'>[],
  current: number,
  step: BissCommandStep,
): number {
  const n = items.length;
  if (!items.some((item) => !item.disabled)) return -1;
  if (step === 'first') return items.findIndex((item) => !item.disabled);
  if (step === 'last') {
    for (let i = n - 1; i >= 0; i--) if (!items[i]!.disabled) return i;
    return -1;
  }
  let i = current < 0 || current >= n ? (step === 1 ? -1 : n) : current;
  for (let tries = 0; tries < n; tries++) {
    i = (i + step + n) % n;
    if (!items[i]!.disabled) return i;
  }
  return -1;
}

/** Where the keyboard starts: the checked command when there is one, else the first enabled. */
export function initialActive(items: readonly Pick<BissCommand, 'disabled' | 'checked'>[]): number {
  const checked = items.findIndex((item) => item.checked && !item.disabled);
  return checked >= 0 ? checked : moveActive(items, -1, 'first');
}

/** Commands for a list of workspaces; the current one is checked. */
export function workspaceCommands(
  workspaces: readonly BissWorkspace[],
  current?: string,
): BissCommand[] {
  return workspaces.map((w) => ({
    key: w.id,
    label: w.name,
    ...(w.detail ? { description: w.detail } : {}),
    checked: w.id === current,
  }));
}
