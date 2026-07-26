<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{
  value: string;
  label?: string;
  /**
   * Keep line breaks instead of collapsing to one scrolling line. Every
   * consumer with a multi-line value had reached for the same :deep() override
   * against a class it does not own, which is a prop wearing a disguise.
   */
  multiline?: boolean;
}>(), {
  multiline: false,
});

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value);
  } catch {
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => {
    copied.value = false;
  }, 1800);
}
</script>

<template>
  <div class="cle-copy-field" :class="{ 'cle-copy-field-multiline': multiline }">
    <code class="cle-copy-value">{{ value }}</code>
    <button type="button" class="cle-copy-button" :aria-label="label || 'Copy value'" @click="copy">
      {{ copied ? "Copied" : "Copy" }}
    </button>
  </div>
</template>
