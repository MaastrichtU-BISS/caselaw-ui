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
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
    rows?: number;
    mono?: boolean;
  }>(),
  {
    disabled: false,
    required: false,
    invalid: false,
    rows: 3,
    mono: false,
  },
);

const model = defineModel<string>();

const classes = computed(() =>
  [
    'biss-textarea',
    props.invalid ? 'biss-input-invalid' : '',
    props.mono ? 'biss-input-mono' : '',
  ].filter(Boolean),
);
</script>

<template>
  <textarea
    v-bind="{ ...attrs, ...control() }"
    v-model="model"
    :class="classes"
    :placeholder="placeholder"
    :disabled="control().disabled"
    :required="control().required"
    :rows="rows"
    :aria-invalid="invalid || control()['aria-invalid'] || undefined"
  />
</template>
