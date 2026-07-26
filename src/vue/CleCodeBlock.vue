<script setup lang="ts">
/**
 * A code sample with its own chrome: what it is on the left, copy on the
 * right. A bare <pre> leaves the reader working out which language they are
 * looking at and whether it can be copied.
 */
import { ref } from "vue";

const props = withDefaults(defineProps<{
  code: string;
  /** Shown top-left. A language, a filename, or "Terminal". */
  label?: string;
  copyable?: boolean;
}>(), {
  copyable: true,
});

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
  } catch {
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 1800);
}
</script>

<template>
  <div class="cle-code">
    <div v-if="label || copyable" class="cle-code-header">
      <span class="cle-code-label">{{ label }}</span>
      <button v-if="copyable" type="button" class="cle-code-copy" @click="copy">
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
    <pre class="cle-code-body">{{ code }}</pre>
  </div>
</template>
