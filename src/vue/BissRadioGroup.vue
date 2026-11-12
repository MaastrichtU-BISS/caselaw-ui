<script setup lang="ts">
import { useId } from 'vue';
import type { BissPickOption } from '../core/types';
const {
  options,
  value = '',
  label,
  disabled = false,
} = defineProps<{ options: BissPickOption[]; value?: string; label: string; disabled?: boolean }>();
const emit = defineEmits<{ change: [value: string] }>();
const uid = useId();
</script>
<template>
  <fieldset class="biss-radio-group">
    <legend>{{ label }}</legend>
    <label v-for="option in options" :key="option.value" class="biss-checkbox"
      ><input
        type="radio"
        :name="uid"
        :value="option.value"
        :checked="value === option.value"
        :disabled="disabled || option.disabled"
        @change="emit('change', option.value)"
      /><span
        >{{ option.label }}<small v-if="option.description">{{ option.description }}</small></span
      ></label
    >
  </fieldset>
</template>
