<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  value: string;
  label?: string;
}>();

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
  <div class="cle-copy-field">
    <code class="cle-copy-value">{{ value }}</code>
    <button type="button" class="cle-copy-button" :aria-label="label || 'Copy value'" @click="copy">
      {{ copied ? "Copied" : "Copy" }}
    </button>
  </div>
</template>
