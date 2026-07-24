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
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}>(), {
  variant: "primary",
  type: "button",
  disabled: false,
});

const classes = computed(() => props.variant === "secondary" ? "cle-button cle-button-secondary" : "cle-button");
</script>
