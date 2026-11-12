<script setup lang="ts">
import { watch } from 'vue';
import * as Dialog from './dialog';
import BissIcon from './BissIcon.vue';
import { bissDialogTheme as theme, type BissDialogUi, type BissDialogSize } from '../theme/dialog';
const props = withDefaults(
  defineProps<{
    open?: boolean;
    title: string;
    description?: string;
    width?: number;
    size?: BissDialogSize;
    closeLabel?: string;
    busy?: boolean;
    portal?: boolean;
    ui?: BissDialogUi;
  }>(),
  { open: false, size: 'md', closeLabel: 'Close', busy: false, portal: false },
);
const emit = defineEmits<{ close: []; 'update:open': [open: boolean] }>();
let previous: HTMLElement | null = null;
watch(
  () => props.open,
  (open) => {
    if (open && typeof document !== 'undefined') previous = document.activeElement as HTMLElement;
  },
  { immediate: true, flush: 'pre' },
);
function update(open: boolean) {
  if (!open && props.busy) return;
  emit('update:open', open);
  if (!open) emit('close');
}
function autofocus(event: Event) {
  const node = (event.target as HTMLElement)?.querySelector<HTMLElement>(
    '[data-biss-autofocus],[autofocus]',
  );
  if (node) {
    event.preventDefault();
    node.focus();
  }
}
function restore(event: Event) {
  if (previous?.isConnected) {
    event.preventDefault();
    previous.focus();
  }
}
</script>
<template>
  <Dialog.Root :open="open" @update:open="update"
    ><Dialog.Portal :disabled="!portal"
      ><Dialog.Overlay :class="ui?.overlay" /><Dialog.Content
        :width="width"
        :size="size"
        :class="ui?.content"
        :aria-busy="busy || undefined"
        @escape-key-down="busy && $event.preventDefault()"
        @interact-outside="busy && $event.preventDefault()"
        @open-auto-focus="autofocus"
        @close-auto-focus="restore"
        ><header :class="[theme.slots.header, ui?.header]">
          <div class="biss-grow">
            <Dialog.Title :class="[theme.slots.title, ui?.title]">{{ title }}</Dialog.Title
            ><Dialog.Description
              v-if="description"
              :class="[theme.slots.description, ui?.description]"
              >{{ description }}</Dialog.Description
            ><Dialog.Description v-else class="biss-visually-hidden">{{
              title
            }}</Dialog.Description>
          </div>
          <Dialog.Close
            :disabled="busy"
            :class="['biss-header-action', theme.slots.close, ui?.close]"
            :aria-label="closeLabel"
            ><BissIcon name="x"
          /></Dialog.Close>
        </header>
        <div :class="[theme.slots.body, ui?.body]"><slot /></div>
        <footer v-if="$slots.actions" :class="[theme.slots.footer, ui?.footer]">
          <slot name="actions" /></footer></Dialog.Content></Dialog.Portal
  ></Dialog.Root>
</template>
