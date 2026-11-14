/** Locale-aware number parsing, formatting and stepping for numeric controls. */
export interface BissNumberFormat {
  locale?: string;
  options?: Intl.NumberFormatOptions;
}

/** Group and decimal separators for a locale, e.g. `{ group: '.', decimal: ',' }` for nl-NL. */
export function numberSeparators(locale?: string) {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  return {
    group: parts.find((p) => p.type === 'group')?.value ?? ',',
    decimal: parts.find((p) => p.type === 'decimal')?.value ?? '.',
  };
}

/** Format a value for display; empty and non-finite values render as an empty string. */
export function formatNumber(
  value: number | null | undefined,
  { locale, options }: BissNumberFormat = {},
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return '';
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Parse typed text using the locale's separators. Currency symbols, units and
 * spaces are ignored; percent style divides by 100. Returns `null` for empty
 * or unreadable input.
 */
export function parseNumber(
  text: string,
  { locale, options }: BissNumberFormat = {},
): number | null {
  const { group, decimal } = numberSeparators(locale);
  let source = String(text ?? '')
    .trim()
    .replace(/[−‒–]/g, '-');
  if (!source) return null;
  const negative = /^\(.*\)$/.test(source) || source.includes('-');
  if (/\s/.test(group)) source = source.replace(/[\s  ]/g, '');
  else source = source.split(group).join('');
  source = source.split(decimal).join('.');
  source = source.replace(/[^0-9.]/g, '');
  if (!source || source === '.' || (source.match(/\./g)?.length ?? 0) > 1) return null;
  let value = Number(source);
  if (!Number.isFinite(value)) return null;
  if (negative) value = -value;
  if (options?.style === 'percent') value = Number((value / 100).toPrecision(15));
  return value;
}

/** Decimal places of a number, so stepping does not drift (0.1 + 0.2). */
function decimals(value: number) {
  const text = String(value);
  if (text.includes('e-')) return Number(text.split('e-')[1]);
  return text.split('.')[1]?.length ?? 0;
}

export function clampNumber(value: number, min?: number, max?: number): number {
  let next = value;
  if (min !== undefined && Number.isFinite(min)) next = Math.max(min, next);
  if (max !== undefined && Number.isFinite(max)) next = Math.min(max, next);
  return next;
}

/** Snap to the nearest step counted from `min` (or zero), then clamp. */
export function snapNumber(value: number, step = 1, min?: number, max?: number): number {
  if (!(step > 0)) return clampNumber(value, min, max);
  const base = min !== undefined && Number.isFinite(min) ? min : 0;
  const precision = Math.min(20, Math.max(decimals(step), decimals(base)));
  const snapped = Number((base + Math.round((value - base) / step) * step).toFixed(precision));
  return clampNumber(snapped, min, max);
}

/**
 * Move a value by `direction` steps (negative decreases). An empty value starts at `min` or zero.
 * `grid` is the step the result snaps to; it defaults to `step`, and a large step (Page Up)
 * passes the field's ordinary step so it moves by ten steps without skipping grid values.
 */
export function stepNumber(
  value: number | null | undefined,
  direction: number,
  {
    step = 1,
    min,
    max,
    grid = step,
  }: { step?: number; min?: number; max?: number; grid?: number } = {},
): number {
  if (value === null || value === undefined || !Number.isFinite(value))
    return snapNumber(min ?? 0, grid, min, max);
  return snapNumber(value + direction * step, grid, min, max);
}
