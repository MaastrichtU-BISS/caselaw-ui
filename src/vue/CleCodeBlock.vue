<script setup lang="ts">
/**
 * A code sample with its own chrome: what it is on the left, copy on the
 * right. A bare <pre> leaves the reader working out which language they are
 * looking at and whether it can be copied.
 */
import { computed, ref } from "vue";
import { highlight, inferLanguage, type CleCodeLanguage } from "../highlight";

const props = withDefaults(defineProps<{
  code: string;
  /** Shown top-left. A language, a filename, or "Terminal". */
  label?: string;
  copyable?: boolean;
  /** Overrides detection. `plain` turns highlighting off. */
  language?: CleCodeLanguage | string;
}>(), {
  copyable: true,
});

// Detected from the code's own shape first, then the label — an install
// sample is labelled with its framework but is a shell command.
const tokens = computed(() =>
  highlight(props.code, inferLanguage(props.code, props.language ?? props.label)),
);

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
    <pre class="cle-code-body"><span
      v-for="(token, index) in tokens"
      :key="index"
      :class="`cle-tok-${token.kind}`"
    >{{ token.text }}</span></pre>
  </div>
</template>
