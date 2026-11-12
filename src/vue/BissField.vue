<script setup lang="ts">
import { provide, useId } from 'vue';
import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
const props = withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    hint?: string;
    error?: string;
    optional?: boolean;
    optionalLabel?: string;
    required?: boolean;
    disabled?: boolean;
  }>(),
  { optional: false, optionalLabel: 'optional', required: false, disabled: false },
);
const generated = useId();
const field: BissFieldContext = {
  get id() {
    return props.id ?? generated;
  },
  get describedBy() {
    return props.error ? field.id + '-error' : props.hint ? field.id + '-hint' : undefined;
  },
  get invalid() {
    return !!props.error;
  },
  get required() {
    return props.required;
  },
  get disabled() {
    return props.disabled;
  },
};
provide(BISS_FIELD, field);
</script>
<template>
  <div
    class="biss-field"
    :data-disabled="disabled || undefined"
    :data-invalid="field.invalid || undefined"
  >
    <label v-if="label" class="biss-field-label" :for="field.id"
      >{{ label }}<span v-if="optional" class="biss-field-optional">{{ optionalLabel }}</span
      ><span v-if="required" aria-hidden="true" class="biss-field-required">*</span></label
    ><slot :id="field.id" :invalid="field.invalid" :control="fieldControl(field)" />
    <p v-if="error" :id="field.id + '-error'" class="biss-field-error" role="alert">{{ error }}</p>
    <p v-else-if="hint" :id="field.id + '-hint'" class="biss-field-hint">{{ hint }}</p>
  </div>
</template>
