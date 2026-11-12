<script setup lang="ts">
import { inject, useAttrs } from 'vue';
import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const field = inject<BissFieldContext | undefined>(BISS_FIELD, undefined);
const control = () =>
  fieldControl(field, { ...attrs, required: props.required, disabled: props.disabled });
import type { BissOption } from '../core/types';

const props = withDefaults(
  defineProps<{
    options?: BissOption[];
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
  }>(),
  {
    disabled: false,
    required: false,
    invalid: false,
  },
);

const model = defineModel<string | number | null>();
</script>

<template>
  <select
    v-bind="{ ...attrs, ...control() }"
    v-model="model"
    class="biss-select"
    :class="{ 'biss-input-invalid': invalid }"
    :disabled="control().disabled"
    :required="control().required"
    :aria-invalid="invalid || control()['aria-invalid'] || undefined"
  >
    <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
    <slot>
      <option v-for="option in options || []" :key="String(option.value)" :value="option.value">
        {{ option.label }}
      </option>
    </slot>
  </select>
</template>
