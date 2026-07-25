<script setup lang="ts">
import type { CleOption } from "../types";

withDefaults(defineProps<{
  options?: CleOption[];
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
    class="cle-select"
    :class="{ 'cle-input-invalid': invalid }"
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
