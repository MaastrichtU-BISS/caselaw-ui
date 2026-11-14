<script lang="ts">
  /**
   * One rate or share as a ring, with the figure in the middle and its meaning
   * beneath. Values over the maximum fill the ring and still print the true
   * figure; a missing value draws an empty track and a dash.
   */
  import type { Snippet } from 'svelte';
  import { ringLayout } from '../core/charts';
  import { fillLabel } from '../core/blocks';

  interface Props {
    value: number | null;
    /** The value that fills the ring; `value / max` is the share. */
    max?: number;
    /** What the figure is, for example “Grant success rate”. Also the accessible name. */
    label: string;
    /** Replaces the computed percentage in the middle, for example “14 of 23”. */
    display?: string;
    /** A line of context under the label, for example “Decided since 2022”. */
    caption?: string;
    /** A goal on the same scale as `value`, drawn as a tick on the ring. */
    target?: number | null;
    /** Text for the target. `{percent}` is replaced. */
    targetLabel?: string;
    tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
    /** Any CSS color; overrides `tone`. */
    color?: string;
    size?: number;
    thickness?: number;
    locale?: string;
    /** Shown in the middle when there is no value. */
    missingLabel?: string;
    children?: Snippet;
  }

  let {
    value,
    max = 1,
    label,
    display,
    caption,
    target = null,
    targetLabel = 'Target {percent}',
    tone = 'primary',
    color,
    size = 120,
    thickness = 10,
    locale = 'en-GB',
    missingLabel = '–',
    children,
  }: Props = $props();

  const ring = $derived(ringLayout(value, max, { size, thickness, target }));
  const percent = (n: number) =>
    new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(n);
  const figure = $derived(display ?? (ring.ratio === null ? missingLabel : percent(ring.ratio)));
  const targetText = $derived(
    ring.target ? fillLabel(targetLabel, { percent: percent(ring.target.fraction) }) : '',
  );
  const valueText = $derived(
    [figure === missingLabel ? '' : figure, targetText, caption].filter(Boolean).join(', '),
  );
</script>

<figure
  class="biss-ring"
  data-tone={tone}
  data-over={ring.over || undefined}
  style:--ring-size="{ring.size}px"
  style:--ring-color={color}
>
  <div
    class="biss-ring-visual"
    role="meter"
    aria-label={label}
    aria-valuemin={0}
    aria-valuemax={max}
    aria-valuenow={ring.ratio === null ? undefined : Math.min(max, Math.max(0, value ?? 0))}
    aria-valuetext={valueText || undefined}
  >
    <svg viewBox="0 0 {ring.size} {ring.size}" width={ring.size} height={ring.size} aria-hidden="true">
      <circle
        class="biss-ring-track"
        cx={ring.center}
        cy={ring.center}
        r={ring.radius}
        stroke-width={ring.thickness}
      />
      {#if ring.fraction > 0}<circle
          class="biss-ring-value"
          cx={ring.center}
          cy={ring.center}
          r={ring.radius}
          stroke-width={ring.thickness}
          stroke-dasharray={ring.dash}
          transform="rotate(-90 {ring.center} {ring.center})"
        />{/if}
      {#if ring.target}<line
          class="biss-ring-target"
          x1={ring.target.x1}
          y1={ring.target.y1}
          x2={ring.target.x2}
          y2={ring.target.y2}
        />{/if}
    </svg>
    <span class="biss-ring-figure" aria-hidden="true">{figure}</span>
  </div>
  <figcaption class="biss-ring-caption">
    <strong>{label}</strong>
    {#if caption}<span>{caption}</span>{/if}
    {#if targetText}<span class="biss-ring-target-text">{targetText}</span>{/if}
    {@render children?.()}
  </figcaption>
</figure>
