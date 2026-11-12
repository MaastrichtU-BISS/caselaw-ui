import type { BissLabel, BissFilterRule } from './types';
export function moveItem<T>(items: readonly T[], index: number, delta: number): T[] {
  const target = index + delta;
  if (index < 0 || index >= items.length || target < 0 || target >= items.length) return [...items];
  const result = [...items];
  const [item] = result.splice(index, 1);
  result.splice(target, 0, item!);
  return result;
}
export function uniqueLabel(items: readonly BissLabel[], base: string): string {
  let result = base;
  let n = 1;
  while (items.some((i) => i.label.toLocaleLowerCase() === result.toLocaleLowerCase()))
    result = base + ' ' + ++n;
  return result;
}
export function validateLabel(
  items: readonly BissLabel[],
  id: string,
  value: string,
): { error: 'required' | 'duplicate' | ''; items?: BissLabel[] } {
  const label = value.trim();
  if (!label) return { error: 'required' };
  if (items.some((i) => i.id !== id && i.label.toLocaleLowerCase() === label.toLocaleLowerCase()))
    return { error: 'duplicate' };
  return { error: '', items: items.map((i) => (i.id === id ? { ...i, label } : i)) };
}
/** Optional host-side filter evaluation; unsupported operators fail closed. */
export function matchesFilters(
  row: Record<string, unknown>,
  rules: readonly BissFilterRule[],
  match: 'all' | 'any',
): boolean {
  if (!rules.length) return true;
  const check = (rule: BissFilterRule) => {
    const value = String(row[rule.field] ?? '').toLocaleLowerCase(),
      expected = rule.value.toLocaleLowerCase();
    switch (rule.operator) {
      case 'contains':
        return value.includes(expected);
      case 'eq':
        return value === expected;
      case 'neq':
        return value !== expected;
      case 'empty':
        return value === '';
      case 'gt':
        return (
          value !== '' &&
          expected !== '' &&
          Number.isFinite(Number(value)) &&
          Number.isFinite(Number(expected)) &&
          Number(value) > Number(expected)
        );
      default:
        return false;
    }
  };
  return match === 'all' ? rules.every(check) : rules.some(check);
}
export function sortRows<T extends Record<string, unknown>>(
  rows: readonly T[],
  key: string,
  direction: 'asc' | 'desc',
): T[] {
  if (!key) return [...rows];
  return [...rows].sort((a, b) => {
    const x = a[key],
      y = b[key];
    if (x == null) return y == null ? 0 : 1;
    if (y == null) return -1;
    const value =
      typeof x === 'number' && typeof y === 'number'
        ? x - y
        : String(x).localeCompare(String(y), undefined, { numeric: true });
    return direction === 'asc' ? value : -value;
  });
}
export function safeLink(value: string): string | undefined {
  const v = value.trim();
  return /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(v) ? v : undefined;
}
export function formatDay(value: string, locale: string): string {
  const date = new Date(value + 'T12:00:00Z');
  return Number.isFinite(date.getTime())
    ? new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(
        date,
      )
    : value;
}
