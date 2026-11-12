<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../icon-names';
import { modal } from '../interactions';
import { actionDirective } from './actions';
const {
  open = false,
  title,
  description = undefined,
  width = 520,
  closeLabel = 'Close',
  busy = false,
} = defineProps<{
  open?: boolean;
  title: string;
  description?: string | undefined;
  width?: number;
  closeLabel?: string;
  busy?: boolean;
}>();
const emit = defineEmits<{ close: [] }>();
const vModal = actionDirective(modal);
</script>
<template>
  <dialog
    class="biss-native-dialog"
    v-modal="{ open, busy, onclose: () => emit('close') }"
    :aria-label="title"
    :aria-busy="busy"
    :style="{ '--dialog-width': width + 'px' }"
  >
    <header>
      <div class="biss-grow">
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </div>
      <button
        type="button"
        class="biss-header-action"
        :disabled="busy"
        :aria-label="closeLabel"
        @click="emit('close')"
      >
        <BissIcon name="x" />
      </button>
    </header>
    <div class="biss-dialog-body"><slot /></div>
    <footer v-if="$slots.actions"><slot name="actions" /></footer>
  </dialog>
</template>
