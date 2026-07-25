<script setup lang="ts">
import { computed } from "vue";
import type { CleTone } from "../types";

const props = withDefaults(defineProps<{
  tone?: CleTone;
  dot?: boolean;
  mono?: boolean;
}>(), {
  tone: "neutral",
  dot: false,
  mono: false,
});

const classes = computed(() => [
  "cle-badge",
  props.tone === "neutral" ? "" : `cle-badge-${props.tone}`,
  props.mono ? "cle-badge-mono" : "",
].filter(Boolean));
</script>

<template>
  <span :class="classes">
    <span v-if="dot" class="cle-badge-dot" />
    <slot />
  </span>
</template>
