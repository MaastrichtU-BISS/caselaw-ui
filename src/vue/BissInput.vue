<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';
import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const field = inject<BissFieldContext | undefined>(BISS_FIELD, undefined);
const control = () =>
  fieldControl(field, {
    ...attrs,
    invalid: props.invalid,
    required: props.required,
    disabled: props.disabled,
  });

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
    mono?: boolean;
    min?: number | string;
    max?: number | string;
    autocomplete?: string;
  }>(),
  {
    type: 'text',
    disabled: false,
    required: false,
    invalid: false,
    mono: false,
  },
);

const model = defineModel<string | number | null>();

const classes = computed(() =>
  [
    'biss-input',
    props.invalid ? 'biss-input-invalid' : '',
    props.mono ? 'biss-input-mono' : '',
  ].filter(Boolean),
);
</script>

<template>
  <input
    v-bind="{ ...attrs, ...control() }"
    v-model="model"
    :class="classes"
    :type="type"
    :placeholder="placeholder"
    :disabled="control().disabled"
    :required="control().required"
    :min="min"
    :max="max"
    :autocomplete="autocomplete"
    :aria-invalid="invalid || control()['aria-invalid'] || undefined"
  />
</template>
