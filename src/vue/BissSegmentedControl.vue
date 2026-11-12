<script setup lang="ts">
import type { BissPickOption } from '../core/types';
const {
  options,
  value = '',
  label,
} = defineProps<{ options: BissPickOption[]; value?: string; label: string }>();
const emit = defineEmits<{ change: [value: string] }>();
</script>
<template>
  <div class="biss-segmented" role="group" :aria-label="label">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="biss-segment"
      :aria-pressed="value === option.value"
      :disabled="option.disabled"
      @click="emit('change', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
