<script setup lang="ts">
import { computed } from "vue";
import type { BissTone } from "../types";

const props = withDefaults(defineProps<{
  tone?: BissTone;
  dot?: boolean;
  mono?: boolean;
}>(), {
  tone: "neutral",
  dot: false,
  mono: false,
});

const classes = computed(() => [
  "biss-badge",
  props.tone === "neutral" ? "" : `biss-badge-${props.tone}`,
  props.mono ? "biss-badge-mono" : "",
].filter(Boolean));
</script>

<template>
  <span :class="classes">
    <span v-if="dot" class="biss-badge-dot" />
    <slot />
  </span>
</template>
