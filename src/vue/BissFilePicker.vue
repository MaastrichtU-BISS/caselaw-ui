<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  label = 'Add files',
  hint = 'Choose files or drop them here.',
  accept = '',
  multiple = true,
  disabled = false,
} = defineProps<{
  label?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}>();
const emit = defineEmits<{ pick: [files: File[]] }>();
</script>
<template>
  <label
    class="biss-file-picker"
    :data-disabled="disabled"
    @dragover.prevent
    @drop.prevent="!disabled && emit('pick', Array.from($event.dataTransfer?.files ?? []))"
    ><BissIcon name="up" /><b>{{ label }}</b
    ><span>{{ hint }}</span
    ><input
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :aria-label="label"
      @change="emit('pick', Array.from(($event.target as HTMLInputElement).files ?? []))"
  /></label>
</template>
