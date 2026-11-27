<script setup lang="ts">
/**
 * A code sample with its own chrome: what it is on the left, copy on the
 * right. A bare <pre> leaves the reader working out which language they are
 * looking at and whether it can be copied.
 */
import { computed, ref } from 'vue';
import { highlight, inferLanguage, type BissCodeLanguage } from '../core/highlight';

const props = withDefaults(
  defineProps<{
    code: string;
    /** Shown top-left. A language, a filename, or "Terminal". */
    label?: string;
    copyable?: boolean;
    /** Overrides detection. `plain` turns highlighting off. */
    language?: BissCodeLanguage | string;
  }>(),
  {
    copyable: true,
  },
);

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
  <div class="biss-code" :class="{ 'biss-code-bare': !label }">
    <div v-if="label" class="biss-code-header">
      <span class="biss-code-label">{{ label }}</span>
      <button v-if="copyable" type="button" class="biss-code-copy" @click="copy">
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <button v-else-if="copyable" type="button" class="biss-code-copy-float" @click="copy">
      {{ copied ? 'Copied' : 'Copy' }}
    </button>
    <pre class="biss-code-body"><span
      v-for="(token, index) in tokens"
      :key="index"
      :class="`biss-tok-${token.kind}`"
    >{{ token.text }}</span></pre>
  </div>
</template>
