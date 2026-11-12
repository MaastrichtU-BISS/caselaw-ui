/** Pure helpers shared by Vue and Svelte Bizzy ports. */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => Array.from(n)[0])
    .join('')
    .toLocaleUpperCase();
}
export function avatarHue(name: string): number {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return [212, 168, 28, 266, 340, 190, 48, 128][h % 8]!;
}
/** Values and expected markers are fractions, clamped to the available track. */
export function progressPercent(value: number | null): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value!)) * 100 : 0;
}
export function toggleValue(values: readonly string[], value: string): string[] {
  return values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
}
/** Position an inclusive date span within a visible timeline, clamped to its window. */
export function timelineSpan(
  from: string,
  to: string,
  start: string,
  end: string,
): { left: number; width: number } {
  const times = [from, to, start, end].map((d) => Date.parse(d + 'T00:00:00Z'));
  if (times.some((t) => !Number.isFinite(t))) return { left: 0, width: 0 };
  const [a, b, s, e] = times as [number, number, number, number];
  if (b < a || e < s || e < a || s > b) return { left: 0, width: 0 };
  const length = b - a + 86400000,
    left = Math.max(0, ((s - a) / length) * 100),
    right = Math.min(100, ((e - a + 86400000) / length) * 100);
  return { left, width: Math.max(0, right - left) };
}
