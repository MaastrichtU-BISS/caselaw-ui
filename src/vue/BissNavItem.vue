<script setup lang="ts">
/**
 * Renders as an <a> by default. Pass `as` to use a router link component
 * (for example Nuxt's NuxtLink) — remaining attributes are forwarded to it.
 */
import type { Component } from 'vue';

withDefaults(
  defineProps<{
    as?: string | Component;
    label: string;
    meta?: string | number;
    active?: boolean;
  }>(),
  {
    as: 'a',
    active: false,
  },
);

defineOptions({ inheritAttrs: false });
</script>

<template>
  <component :is="as" class="biss-nav-item" :class="{ 'is-active': active }" v-bind="$attrs">
    <span v-if="$slots.icon" class="biss-nav-item-icon"><slot name="icon" /></span>
    <span class="biss-nav-item-label">{{ label }}</span>
    <span v-if="meta !== undefined && meta !== ''" class="biss-nav-item-meta">{{ meta }}</span>
  </component>
</template>
