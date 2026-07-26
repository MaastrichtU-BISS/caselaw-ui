<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";

const props = withDefaults(defineProps<{
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  /** Blocks backdrop and escape dismissal while a request is in flight. */
  busy?: boolean;
}>(), {
  size: "md",
  busy: false,
});

const open = defineModel<boolean>({ default: false });

const panel = ref<HTMLElement | null>(null);
let lastFocused: HTMLElement | null = null;

function close() {
  if (props.busy) return;
  open.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.stopPropagation();
    close();
    return;
  }
  if (event.key !== "Tab" || !panel.value) return;
  const focusable = panel.value.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

watch(open, async (isOpen) => {
  if (typeof document === "undefined") return;
  if (isOpen) {
    lastFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    await nextTick();
    const target = panel.value?.querySelector<HTMLElement>(
      'input:not([type="checkbox"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled])',
    );
    (target || panel.value)?.focus();
  } else {
    document.body.style.overflow = "";
    lastFocused?.focus();
    lastFocused = null;
  }
}, { immediate: true });

onBeforeUnmount(() => {
  if (typeof document !== "undefined") document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="cle-modal-backdrop"
      @keydown="onKeydown"
      @mousedown.self="close"
    >
      <div
        ref="panel"
        class="cle-modal"
        :class="size === 'md' ? '' : `cle-modal-${size}`"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        tabindex="-1"
      >
        <header class="cle-modal-header">
          <div>
            <h2 class="cle-modal-title">{{ title }}</h2>
            <p v-if="subtitle" class="cle-modal-subtitle">{{ subtitle }}</p>
          </div>
          <button type="button" class="cle-modal-close" aria-label="Close dialog" :disabled="busy" @click="close">
            &times;
          </button>
        </header>
        <div class="cle-modal-body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="cle-modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>
