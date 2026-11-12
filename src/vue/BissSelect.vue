<script setup lang="ts">
import type { BissOption } from "../types";

withDefaults(defineProps<{
  options?: BissOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
}>(), {
  disabled: false,
  required: false,
  invalid: false,
});

const model = defineModel<string | number | null>();
</script>

<template>
  <select
    v-model="model"
    class="biss-select"
    :class="{ 'biss-input-invalid': invalid }"
    :disabled="disabled"
    :required="required"
    :aria-invalid="invalid || undefined"
  >
    <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
    <slot>
      <option v-for="option in options || []" :key="String(option.value)" :value="option.value">
        {{ option.label }}
      </option>
    </slot>
  </select>
</template>
