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

/** One stage of a funnel, in order from the widest (first) to the narrowest. */
export interface BissFunnelStage {
  key: string;
  label: string;
  value: number;
  /** Any CSS color; defaults to the primary blue, lightening per stage. */
  color?: string;
  /** Overrides the printed value, for example a formatted amount. */
  display?: string;
  /** A short secondary line under the label. */
  note?: string;
}

/** A finite, positive number; anything else counts as zero. */
const safeCount = (n: unknown) => (typeof n === 'number' && Number.isFinite(n) && n > 0 ? n : 0);

/**
 * Funnel geometry on a 0–100 horizontal scale. Each stage is a centered trapezoid
 * whose top is its own share of the widest stage and whose bottom meets the next
 * stage, so the segments join into one narrowing shape. Conversion is against the
 * previous stage; `overall` is against the first. Zero, negative and non-finite
 * values count as zero, and divisions by zero yield `null` rather than NaN.
 */
export function funnelLayout(stages: readonly BissFunnelStage[], minWidth = 2) {
  const values = stages.map((s) => safeCount(s.value));
  const max = Math.max(0, ...values);
  const first = values[0] ?? 0;
  const share = (v: number) => (max > 0 && v > 0 ? Math.max(minWidth, (v / max) * 100) : 0);
  const shares = values.map(share);
  return {
    max,
    first,
    /** Share of the first stage that reaches the last, or null without two stages. */
    overall: first > 0 && values.length > 1 ? (values.at(-1) ?? 0) / first : null,
    empty: max === 0,
    stages: stages.map((stage, index) => {
      const top = shares[index] ?? 0;
      const bottom = index < shares.length - 1 ? (shares[index + 1] ?? 0) : top;
      const previous = index > 0 ? (values[index - 1] ?? 0) : null;
      const value = values[index] ?? 0;
      return {
        ...stage,
        value,
        index,
        width: top,
        /** SVG polygon points in a 100×1 box. */
        points: `${(100 - top) / 2},0 ${(100 + top) / 2},0 ${(100 + bottom) / 2},1 ${(100 - bottom) / 2},1`,
        conversion: previous === null ? null : previous > 0 ? value / previous : null,
        overall: first > 0 ? value / first : null,
      };
    }),
  };
}

/**
 * Ring gauge geometry for an SVG of `size` pixels. The arc starts at the top and
 * runs clockwise. `fraction` is clamped to 0–1 for drawing; `ratio` keeps the
 * true (possibly over 100%) value for the label, and is null when the value or
 * maximum is missing or invalid. The target marker is a radial tick.
 */
export function ringLayout(
  value: number | null | undefined,
  max = 1,
  options: { size?: number; thickness?: number; target?: number | null } = {},
) {
  const size = Math.max(16, safeCount(options.size) || 120);
  const thickness = Math.min(size / 2 - 1, Math.max(1, safeCount(options.thickness) || 10));
  const radius = (size - thickness) / 2 - 3;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const validMax = typeof max === 'number' && Number.isFinite(max) && max > 0;
  const ratio =
    validMax && typeof value === 'number' && Number.isFinite(value)
      ? Math.max(0, value) / max
      : null;
  const fraction = ratio === null ? 0 : Math.min(1, ratio);
  const target =
    validMax && typeof options.target === 'number' && Number.isFinite(options.target)
      ? Math.min(1, Math.max(0, options.target / max))
      : null;
  const tick = (t: number) => {
    const angle = t * 2 * Math.PI - Math.PI / 2;
    const inner = radius - thickness / 2 - 2,
      outer = radius + thickness / 2 + 2;
    return {
      fraction: t,
      x1: center + inner * Math.cos(angle),
      y1: center + inner * Math.sin(angle),
      x2: center + outer * Math.cos(angle),
      y2: center + outer * Math.sin(angle),
    };
  };
  return {
    size,
    thickness,
    radius,
    center,
    circumference,
    ratio,
    fraction,
    over: ratio !== null && ratio > 1,
    /** stroke-dasharray for the value arc. */
    dash: `${fraction * circumference} ${circumference}`,
    target: target === null ? null : tick(target),
  };
}
