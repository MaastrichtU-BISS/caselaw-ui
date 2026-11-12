<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';

const {
  value = '',
  label = 'Search',
  placeholder = 'Search…',
  clearLabel = 'Clear search',
  shortcut = false,
} = defineProps<{
  value?: string;
  label?: string;
  placeholder?: string;
  clearLabel?: string;
  shortcut?: boolean;
}>();
const emit = defineEmits<{ change: [value: string] }>();
const expanded = ref(false);
const input = ref<HTMLInputElement | null>(null);
function key(e: KeyboardEvent) {
  if (
    shortcut &&
    e.key === '/' &&
    !e.metaKey &&
    !e.ctrlKey &&
    !(e.target as HTMLElement).closest('input,textarea,[contenteditable]')
  ) {
    e.preventDefault();
    expanded.value = true;
    nextTick(() => input.value?.focus());
  }
}
onMounted(() => window.addEventListener('keydown', key));
onBeforeUnmount(() => window.removeEventListener('keydown', key));
</script>
<template>
  <span class="biss-tool-search"
    ><button
      v-if="!expanded && !value"
      type="button"
      class="biss-text-button"
      @click="
        expanded = true;
        nextTick(() => input?.focus());
      "
    >
      <BissIcon name="search" />{{ label }}</button
    ><template v-else
      ><BissIcon name="search" /><input
        ref="input"
        :value="value"
        :aria-label="label"
        :placeholder="placeholder"
        @input="emit('change', ($event.target as HTMLInputElement).value)"
        @keydown.esc="
          emit('change', '');
          expanded = false;
        " /><button
        type="button"
        class="biss-header-action"
        :aria-label="clearLabel"
        @click="
          emit('change', '');
          expanded = false;
        "
      >
        <BissIcon name="x" /></button></template
  ></span>
</template>
