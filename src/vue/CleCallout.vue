<script setup lang="ts">
import { computed } from "vue";
import type { CleTone } from "../types";

const props = withDefaults(defineProps<{
  tone?: CleTone;
  title?: string;
}>(), {
  tone: "info",
});

const classes = computed(() => [
  "cle-callout",
  props.tone === "neutral" || props.tone === "info" ? "" : `cle-callout-${props.tone}`,
].filter(Boolean));
</script>

<template>
  <div :class="classes" role="status">
    <div>
      <p v-if="title" class="cle-callout-title">{{ title }}</p>
      <p class="cle-callout-body"><slot /></p>
    </div>
    <slot name="actions" />
  </div>
</template>
