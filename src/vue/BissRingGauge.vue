<script setup lang="ts">
/**
 * One rate or share as a ring, with the figure in the middle and its meaning
 * beneath. Values over the maximum fill the ring and still print the true
 * figure; a missing value draws an empty track and a dash.
 */
import { computed } from 'vue';
import { ringLayout } from '../core/charts';
import { fillLabel } from '../core/blocks';

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    max: 1,
    target: null,
    targetLabel: 'Target {percent}',
    tone: 'primary',
    size: 120,
    thickness: 10,
    locale: 'en-GB',
    missingLabel: '–',
  },
);
const ring = computed(() =>
  ringLayout(props.value, props.max, {
    size: props.size,
    thickness: props.thickness,
    target: props.target,
  }),
);
const percent = (n: number) =>
  new Intl.NumberFormat(props.locale, { style: 'percent', maximumFractionDigits: 0 }).format(n);
const figure = computed(
  () => props.display ?? (ring.value.ratio === null ? props.missingLabel : percent(ring.value.ratio)),
);
const targetText = computed(() =>
  ring.value.target ? fillLabel(props.targetLabel, { percent: percent(ring.value.target.fraction) }) : '',
);
const valueText = computed(() =>
  [figure.value === props.missingLabel ? '' : figure.value, targetText.value, props.caption]
    .filter(Boolean)
    .join(', '),
);
</script>

<template>
  <figure
    class="biss-ring"
    :data-tone="tone"
    :data-over="ring.over || undefined"
    :style="{ '--ring-size': ring.size + 'px', ...(color ? { '--ring-color': color } : {}) }"
  >
    <div
      class="biss-ring-visual"
      role="meter"
      :aria-label="label"
      aria-valuemin="0"
      :aria-valuemax="max"
      :aria-valuenow="ring.ratio === null ? undefined : Math.min(max, Math.max(0, value ?? 0))"
      :aria-valuetext="valueText || undefined"
    >
      <svg :viewBox="`0 0 ${ring.size} ${ring.size}`" :width="ring.size" :height="ring.size" aria-hidden="true">
        <circle
          class="biss-ring-track"
          :cx="ring.center"
          :cy="ring.center"
          :r="ring.radius"
          :stroke-width="ring.thickness"
        />
        <circle
          v-if="ring.fraction > 0"
          class="biss-ring-value"
          :cx="ring.center"
          :cy="ring.center"
          :r="ring.radius"
          :stroke-width="ring.thickness"
          :stroke-dasharray="ring.dash"
          :transform="`rotate(-90 ${ring.center} ${ring.center})`"
        />
        <line
          v-if="ring.target"
          class="biss-ring-target"
          :x1="ring.target.x1"
          :y1="ring.target.y1"
          :x2="ring.target.x2"
          :y2="ring.target.y2"
        />
      </svg>
      <span class="biss-ring-figure" aria-hidden="true">{{ figure }}</span>
    </div>
    <figcaption class="biss-ring-caption">
      <strong>{{ label }}</strong>
      <span v-if="caption">{{ caption }}</span>
      <span v-if="targetText" class="biss-ring-target-text">{{ targetText }}</span>
      <slot />
    </figcaption>
  </figure>
</template>
