<script setup lang="ts">
import { computed, inject, ref, useAttrs, watch } from 'vue';
import BissIcon from './BissIcon.vue';
import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
import { clampNumber, formatNumber, parseNumber, snapNumber, stepNumber } from '../core/number';
defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    min?: number;
    max?: number;
    step?: number;
    /** Step for Page Up and Page Down; ten steps by default. */
    largeStep?: number;
    /** Accessible name when the field is not inside a labelled BissField. */
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
    locale?: string;
    /** Intl.NumberFormat options, for example `{ style: 'currency', currency: 'EUR' }`. */
    format?: Intl.NumberFormatOptions;
    incrementLabel?: string;
    decrementLabel?: string;
    size?: 'sm' | 'md';
    name?: string;
  }>(),
  {
    step: 1,
    disabled: false,
    required: false,
    invalid: false,
    incrementLabel: 'Increase',
    decrementLabel: 'Decrease',
    size: 'md',
  },
);
const model = defineModel<number | null>({ default: null });
const attrs = useAttrs();
const field = inject<BissFieldContext | undefined>(BISS_FIELD, undefined);
const control = computed(() =>
  fieldControl(field, {
    ...attrs,
    'aria-invalid': props.invalid || undefined,
    required: props.required,
    disabled: props.disabled,
  }),
);
const options = computed(() => ({ locale: props.locale, options: props.format }));
const text = ref(formatNumber(model.value, options.value));
const focused = ref(false);
watch([model, options], () => {
  if (!focused.value) text.value = formatNumber(model.value, options.value);
});
const atMin = computed(
  () => props.min !== undefined && model.value !== null && model.value <= props.min,
);
const atMax = computed(
  () => props.max !== undefined && model.value !== null && model.value >= props.max,
);
function set(value: number | null) {
  model.value = value;
  text.value = formatNumber(value, options.value);
}
function commit() {
  if (!text.value.trim()) return set(null);
  const parsed = parseNumber(text.value, options.value);
  if (parsed === null) return set(model.value);
  set(snapNumber(parsed, props.step, props.min, props.max));
}
function step(direction: number, size = props.step) {
  if (control.value.disabled) return;
  const parsed = parseNumber(text.value, options.value) ?? model.value;
  set(
    stepNumber(parsed, direction, { step: size, grid: props.step, min: props.min, max: props.max }),
  );
}
function keydown(event: KeyboardEvent) {
  const large = props.largeStep ?? props.step * 10;
  const actions: Record<string, () => void> = {
    ArrowUp: () => step(1),
    ArrowDown: () => step(-1),
    PageUp: () => step(1, large),
    PageDown: () => step(-1, large),
    Home: () => props.min !== undefined && set(props.min),
    End: () => props.max !== undefined && set(props.max),
    Enter: commit,
  };
  const action = actions[event.key];
  if (!action) return;
  if (event.key !== 'Enter') event.preventDefault();
  action();
}
const inputMode = computed(() =>
  Number.isInteger(props.step) && (props.min ?? -1) >= 0 && props.format?.style !== 'percent'
    ? 'numeric'
    : 'decimal',
);
const valueNow = computed(() =>
  model.value === null ? undefined : clampNumber(model.value, props.min, props.max),
);
</script>
<template>
  <div
    class="biss-number-field"
    :class="attrs.class"
    :data-size="size"
    :data-disabled="control.disabled || undefined"
    :data-invalid="control['aria-invalid'] ? true : undefined"
  >
    <input
      v-bind="{ ...attrs, class: undefined }"
      :id="control.id"
      v-model="text"
      class="biss-number-input"
      type="text"
      role="spinbutton"
      autocomplete="off"
      :inputmode="inputMode"
      :name="name"
      :placeholder="placeholder"
      :disabled="control.disabled"
      :required="control.required"
      :aria-label="label"
      :aria-describedby="control['aria-describedby']"
      :aria-invalid="control['aria-invalid']"
      :aria-valuenow="valueNow"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuetext="formatNumber(model, options) || undefined"
      @focus="focused = true"
      @blur="
        focused = false;
        commit();
      "
      @keydown="keydown"
    />
    <span class="biss-number-steppers">
      <button
        type="button"
        class="biss-number-step"
        tabindex="-1"
        :aria-label="decrementLabel"
        :aria-controls="control.id"
        :disabled="control.disabled || atMin"
        @click="step(-1)"
      >
        <BissIcon name="minus" /></button
      ><button
        type="button"
        class="biss-number-step"
        tabindex="-1"
        :aria-label="incrementLabel"
        :aria-controls="control.id"
        :disabled="control.disabled || atMax"
        @click="step(1)"
      >
        <BissIcon name="plus" />
      </button>
    </span>
  </div>
</template>
