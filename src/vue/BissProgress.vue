<script setup lang="ts">
import { computed, useId } from 'vue';
import type { BissProgressTone } from '../core/types';
const props = withDefaults(
  defineProps<{
    /** Current value; `null` shows an indeterminate bar while the amount is unknown. */
    value?: number | null;
    max?: number;
    /** Accessible name, shown above the bar when `showLabel` is set. */
    label: string;
    showLabel?: boolean;
    /** Show the formatted value beside the label. */
    showValue?: boolean;
    /** Replaces the formatted percentage, for example "3 of 8 files". */
    valueText?: string;
    tone?: BissProgressTone;
    size?: 'sm' | 'md';
    locale?: string;
  }>(),
  {
    value: null,
    max: 100,
    showLabel: false,
    showValue: false,
    tone: 'primary',
    size: 'md',
  },
);
const id = useId();
const indeterminate = computed(() => props.value === null || !Number.isFinite(props.value));
const ratio = computed(() =>
  indeterminate.value || !(props.max > 0)
    ? 0
    : Math.min(1, Math.max(0, (props.value as number) / props.max)),
);
const text = computed(() =>
  indeterminate.value
    ? props.valueText
    : (props.valueText ??
      new Intl.NumberFormat(props.locale, { style: 'percent' }).format(ratio.value)),
);
</script>
<template>
  <div
    class="biss-progress"
    :data-tone="tone"
    :data-size="size"
    :data-indeterminate="indeterminate || undefined"
  >
    <div v-if="showLabel || (showValue && text)" class="biss-progress-head">
      <span v-if="showLabel" :id="id" class="biss-progress-label">{{ label }}</span><span
        v-if="showValue && text"
        class="biss-progress-value"
        aria-hidden="true"
        >{{ text }}</span
      >
    </div>
    <div
      class="biss-progress-track"
      role="progressbar"
      :aria-labelledby="showLabel ? id : undefined"
      :aria-label="showLabel ? undefined : label"
      aria-valuemin="0"
      :aria-valuemax="max"
      :aria-valuenow="indeterminate ? undefined : (value as number)"
      :aria-valuetext="text"
    >
      <span
        class="biss-progress-bar"
        :style="indeterminate ? undefined : { width: ratio * 100 + '%' }"
      />
    </div>
  </div>
</template>
