/** Progress, pace and formatting for BissKeyResult. Pure and framework independent. */

export type BissConfidence = 'on-track' | 'at-risk' | 'off-track';

/** What a check-in submits; the host stores it and recalculates. */
export interface BissKeyResultCheckin {
  value: number;
  confidence: BissConfidence;
  note: string;
}

/** The latest check-in, formatted by the host. */
export interface BissKeyResultLastCheckin {
  time: string;
  note?: string;
  author?: string;
}

export type BissKeyResultFormat = 'number' | 'percent' | 'currency';

/**
 * Share of the way from `start` to `target`, clamped to 0–1. Works for
 * decreasing targets (start 40, target 10). Returns `null` for missing or
 * non-finite values; when start equals target, the target is either met or not.
 */
export function keyResultProgress(start: number, current: number, target: number): number | null {
  if (![start, current, target].every(Number.isFinite)) return null;
  if (target === start) return current === target ? 1 : 0;
  return Math.min(1, Math.max(0, (current - start) / (target - start)));
}

/** Expected progress by `today` in a period of ISO days, clamped to 0–1, or `undefined`. */
export function expectedProgress(from: string, to: string, today: string): number | undefined {
  const [a, b, t] = [from, to, today].map((d) => Date.parse(d + 'T00:00:00Z'));
  if (![a, b, t].every(Number.isFinite) || b! <= a!) return undefined;
  return Math.min(1, Math.max(0, (t! - a!) / (b! - a!)));
}

/**
 * Suggest a confidence from progress against the expected pace: within ten
 * points is on track, within twenty-five at risk, further behind off track.
 */
export function suggestConfidence(
  progress: number | null,
  expected: number | undefined,
): BissConfidence | undefined {
  if (progress === null || expected === undefined) return undefined;
  const gap = expected - progress;
  return gap <= 0.1 ? 'on-track' : gap <= 0.25 ? 'at-risk' : 'off-track';
}

/** Format a value as a number, a percentage of 100 or an amount of money. */
export function formatKeyResultValue(
  value: number,
  options: { format?: BissKeyResultFormat; unit?: string; currency?: string; locale?: string } = {},
): string {
  if (!Number.isFinite(value)) return '–';
  const { format = 'number', unit, currency = 'EUR', locale } = options;
  if (format === 'percent')
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value) + '%';
  if (format === 'currency')
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  const text = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
  return unit ? `${text} ${unit}` : text;
}

/** Parse a typed value: accepts `1,5`, `1 200`, `€ 40.000` and `12%`; `null` when not a number. */
export function parseKeyResultValue(text: string): number | null {
  let s = text.replace(/[\s€$£%]/g, '');
  if (!s) return null;
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, '');
  else s = s.replace(',', '.');
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
