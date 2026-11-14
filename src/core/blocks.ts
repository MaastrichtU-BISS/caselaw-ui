/** Small pure helpers shared by the application blocks. Safe to import during SSR. */

/** A compact badge count: `0` is empty, large counts collapse to `99+`. */
export function countLabel(count: number, max = 99): string {
  if (!Number.isFinite(count) || count <= 0) return '';
  const whole = Math.floor(count);
  return whole > max ? `${max}+` : String(whole);
}

/** Replace `{name}` placeholders in a host-supplied label. Unknown names stay visible. */
export function fillLabel(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
