import type { BissBarSeries } from './types';
export function groupedLayout(
  categories: readonly string[],
  series: readonly BissBarSeries[],
  height = 240,
) {
  const width = Math.max(480, categories.length * 90),
    left = 48,
    top = 16,
    bottom = height - 30;
  const values = series.flatMap((s) => s.values).filter(Number.isFinite),
    lo = Math.min(0, ...values),
    hi = Math.max(1, ...values),
    span = hi - lo;
  const y = (n: number) => bottom - ((n - lo) / span) * (bottom - top),
    step = (width - left) / Math.max(1, categories.length),
    bw = Math.min(22, (step * 0.7) / Math.max(1, series.length));
  return {
    width,
    height,
    zero: y(0),
    ticks: Array.from({ length: 5 }, (_, i) => {
      const value = lo + (span * i) / 4;
      return { value, y: y(value) };
    }),
    groups: categories.map((label, index) => ({
      label,
      index,
      x: left + (index + 0.5) * step,
      bars: series.map((s, j) => {
        const value = Number.isFinite(s.values[index]) ? s.values[index]! : 0;
        return {
          key: s.key,
          label: s.label,
          color: s.color,
          ghost: s.ghost,
          value,
          x: left + (index + 0.5) * step + (j - series.length / 2) * bw,
          y: Math.min(y(value), y(0)),
          width: Math.max(1, bw - 2),
          height: Math.abs(y(value) - y(0)),
        };
      }),
    })),
  };
}
export function lineLayout(values: readonly number[], height = 160) {
  const finite = values.filter(Number.isFinite);
  const min = Math.min(0, ...finite),
    max = Math.max(1, ...finite),
    width = 480;
  return values.map((v, i) => ({
    x: 12 + (i * (width - 24)) / Math.max(1, values.length - 1),
    y:
      height -
      18 -
      ((Math.max(min, Math.min(max, Number.isFinite(v) ? v : 0)) - min) / (max - min)) *
        (height - 36),
    value: v,
    index: i,
  }));
}
