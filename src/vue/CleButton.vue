<template>
  <a v-if="href" :class="classes" :href="href" :aria-disabled="disabled">
    <slot />
  </a>
  <button v-else :class="classes" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "danger-quiet";
  size?: "md" | "sm";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  block?: boolean;
}>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  block: false,
});

const classes = computed(() => [
  "cle-button",
  props.variant === "primary" ? "" : `cle-button-${props.variant}`,
  props.size === "sm" ? "cle-button-sm" : "",
  props.block ? "cle-button-block" : "",
].filter(Boolean));
</script>
