<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    value: string;
    copyLabel?: string;
    copiedLabel?: string;
    label?: string;
    /**
     * Keep line breaks instead of collapsing to one scrolling line. Every
     * consumer with a multi-line value had reached for the same :deep() override
     * against a class it does not own, which is a prop wearing a disguise.
     */
    multiline?: boolean;
  }>(),
  {
    multiline: false,
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
  },
);

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

onBeforeUnmount(() => clearTimeout(timer));

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
  <div class="biss-copy-field" :class="{ 'biss-copy-field-multiline': multiline }">
    <code class="biss-copy-value" tabindex="0" role="region" :aria-label="label || 'Copy value'">{{
      value
    }}</code>
    <button
      type="button"
      class="biss-copy-button"
      :aria-label="label || 'Copy value'"
      @click="copy"
    >
      {{ copied ? props.copiedLabel : props.copyLabel }}
    </button>
  </div>
</template>
