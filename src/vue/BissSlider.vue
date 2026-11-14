<script setup lang="ts">
import { computed, inject, useId } from 'vue';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui';
import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
import { formatNumber } from '../core/number';
const props = withDefaults(
  defineProps<{
    /** Visible name above the track; inside a BissField the field label names the slider. */
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    /** Show the formatted value at the end of the label row. */
    showValue?: boolean;
    /** Names of the two thumbs of a range. */
    thumbLabels?: [string, string];
    /** Smallest gap between range thumbs, in steps. */
    minStepsBetweenThumbs?: number;
    locale?: string;
    format?: Intl.NumberFormatOptions;
    /** Submits the value with a surrounding form. */
    name?: string;
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    showValue: false,
    thumbLabels: () => ['Minimum', 'Maximum'],
    minStepsBetweenThumbs: 0,
  },
);
/** A number for one thumb, or a `[start, end]` pair for a range. */
const model = defineModel<number | number[]>();
const field = inject<BissFieldContext | undefined>(BISS_FIELD, undefined);
const uid = useId();
const control = computed(() => fieldControl(field, { disabled: props.disabled }));
const values = computed(() =>
  Array.isArray(model.value) ? model.value : [model.value ?? props.min],
);
const range = computed(() => Array.isArray(model.value));
const labelId = computed(() => (field ? field.id + '-label' : uid + '-label'));
const show = (value: number) =>
  formatNumber(value, { locale: props.locale, options: props.format });
const output = computed(() => values.value.map(show).join(' – '));
function update(next: number[] | undefined) {
  if (!next) return;
  model.value = range.value ? [...next] : next[0];
}
</script>
<template>
  <div class="biss-slider" :data-disabled="control.disabled || undefined">
    <div v-if="(label && !field) || showValue" class="biss-slider-head">
      <span v-if="label && !field" :id="labelId" class="biss-slider-label">{{ label }}</span><output
        class="biss-slider-value"
        v-if="showValue"
        aria-hidden="true"
        >{{ output }}</output
      >
    </div>
    <SliderRoot
      class="biss-slider-root"
      :model-value="values"
      :min="min"
      :max="max"
      :step="step"
      :disabled="control.disabled"
      :min-steps-between-thumbs="minStepsBetweenThumbs"
      @update:model-value="update"
    >
      <SliderTrack class="biss-slider-track"><SliderRange class="biss-slider-range" /></SliderTrack>
      <SliderThumb
        v-for="(value, index) in values"
        :key="index"
        class="biss-slider-thumb"
        :id="index === 0 ? control.id : undefined"
        :aria-label="label"
        :aria-labelledby="range ? `${labelId} ${uid}-thumb-${index}` : labelId"
        :aria-describedby="control['aria-describedby']"
        :aria-invalid="control['aria-invalid']"
        :aria-valuetext="show(value)"
      />
    </SliderRoot>
    <template v-if="range"
      ><span
        v-for="(thumb, index) in thumbLabels"
        :id="`${uid}-thumb-${index}`"
        :key="thumb"
        class="biss-visually-hidden"
        >{{ thumb }}</span
      ></template
    >
    <template v-if="name"
      ><input
        v-for="(value, index) in values"
        :key="index"
        type="hidden"
        :name="name"
        :value="value"
    /></template>
  </div>
</template>
