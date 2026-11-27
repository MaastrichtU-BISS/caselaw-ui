<script setup lang="ts">
/**
 * Renders as an <a> by default. Pass `as` to use a router link component
 * (for example Nuxt's NuxtLink) — remaining attributes are forwarded to it.
 */
import type { Component } from 'vue';
import type { BissIconName } from '../core/icon-names';
import BissIcon from './BissIcon.vue';

withDefaults(
  defineProps<{
    as?: string | Component;
    label: string;
    meta?: string | number;
    active?: boolean;
    iconName?: BissIconName;
  }>(),
  {
    as: 'a',
    active: false,
    iconName: undefined,
  },
);

defineOptions({ inheritAttrs: false });
</script>

<template>
  <component :is="as" class="biss-nav-item" :class="{ 'is-active': active }" v-bind="$attrs">
    <span v-if="$slots.icon || iconName" class="biss-nav-item-icon">
      <slot name="icon">
        <BissIcon v-if="iconName" :name="iconName" />
      </slot>
    </span>
    <span class="biss-nav-item-label">{{ label }}</span>
    <span v-if="meta !== undefined && meta !== ''" class="biss-nav-item-meta">{{ meta }}</span>
  </component>
</template>
