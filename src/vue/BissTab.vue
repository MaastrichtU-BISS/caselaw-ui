<script setup lang="ts">
/** Same `as` escape hatch as BissNavItem so tabs can be real router links. */
import type { Component } from "vue";

withDefaults(defineProps<{
  as?: string | Component;
  label: string;
  active?: boolean;
}>(), {
  as: "button",
  active: false,
});

defineOptions({ inheritAttrs: false });
</script>

<template>
  <component
    :is="as"
    class="biss-tab"
    :class="{ 'is-active': active }"
    :type="as === 'button' ? 'button' : undefined"
    :aria-current="active ? 'page' : undefined"
    v-bind="$attrs"
  >
    {{ label }}
  </component>
</template>
