<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import { safeLink } from '../core/collections';
const { items, label = 'Quick links' } = defineProps<{
  items: { id: string; label: string; href: string; description?: string; external?: boolean }[];
  label?: string;
}>();
</script>
<template>
  <nav class="biss-quick-links" :aria-label="label">
    <a
      v-for="item in items"
      :key="item.id"
      :href="safeLink(item.href)"
      :target="item.external ? '_blank' : undefined"
      :rel="item.external ? 'noopener noreferrer' : undefined"
      ><BissIcon :name="item.external ? 'globe' : 'link'" /><span
        ><b>{{ item.label }}</b
        ><small v-if="item.description">{{ item.description }}</small></span
      ><BissIcon name="chev"
    /></a>
  </nav>
</template>
