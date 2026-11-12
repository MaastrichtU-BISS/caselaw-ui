<script setup lang="ts">
import { resizeHandle } from '../core/dom';
import { actionDirective } from './actions';
const {
  size = 40,
  min = 20,
  max = 80,
  label = 'Resize panels',
} = defineProps<{ size?: number; min?: number; max?: number; label?: string }>();
const emit = defineEmits<{ resize: [value: number] }>();
const vResize = actionDirective(resizeHandle);
</script>
<template>
  <div
    class="biss-split-pane"
    :style="{ '--split-size': Math.max(min, Math.min(max, size)) + '%' }"
  >
    <div><slot name="start" /></div>
    <div
      tabindex="0"
      role="separator"
      aria-orientation="vertical"
      :aria-label="label"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="size"
      class="biss-split-handle"
      v-resize="{
        value: size,
        min,
        max,
        percent: true,
        onchange: (value: number) => emit('resize', value),
      }"
    />
    <div><slot name="end" /></div>
  </div>
</template>
