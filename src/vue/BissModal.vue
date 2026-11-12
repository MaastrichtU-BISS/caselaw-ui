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
    // An explicit target first. Falling back to "first focusable in DOM
    // order" lands on the close button in any dialog without a form field,
    // which for a destructive confirmation means the dismiss control is
    // highlighted instead of the safe one.
    const target =
      panel.value?.querySelector<HTMLElement>("[data-biss-autofocus]") ||
      panel.value?.querySelector<HTMLElement>(
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
      class="biss-modal-backdrop"
      @keydown="onKeydown"
      @mousedown.self="close"
    >
      <div
        ref="panel"
        class="biss-modal"
        :class="size === 'md' ? '' : `biss-modal-${size}`"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        tabindex="-1"
      >
        <header class="biss-modal-header">
          <div>
            <h2 class="biss-modal-title">{{ title }}</h2>
            <p v-if="subtitle" class="biss-modal-subtitle">{{ subtitle }}</p>
          </div>
          <button type="button" class="biss-modal-close" aria-label="Close dialog" :disabled="busy" @click="close">
            &times;
          </button>
        </header>
        <div class="biss-modal-body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="biss-modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>
