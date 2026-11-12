<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  label,
  icon = undefined,
  active = false,
  count = undefined,
  clearable = false,
  clearLabel = 'Clear',
  disabled = false,
} = defineProps<{
  label: string;
  icon?: BissIconName | undefined;
  active?: boolean;
  count?: number | undefined;
  clearable?: boolean;
  clearLabel?: string;
  disabled?: boolean;
}>();
const emit = defineEmits<{ click: [event: MouseEvent]; clear: [] }>();
</script>
<template>
  <span class="biss-tool-button" :data-active="active || !!count"
    ><button
      type="button"
      :disabled="disabled"
      :aria-pressed="active || !!count"
      @click="emit('click', $event)"
    >
      <BissIcon v-if="icon" :name="icon" /><span>{{ label }}</span
      ><small v-if="count !== undefined">{{ count }}</small></button
    ><button
      v-if="clearable && (active || count)"
      type="button"
      :aria-label="clearLabel"
      :disabled="disabled"
      @click="emit('clear')"
    >
      <BissIcon name="x" /></button
  ></span>
</template>
