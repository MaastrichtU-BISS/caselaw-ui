<template>
  <footer class="biss-fixed-bottombar">
    <div class="biss-footer-inner">
      <slot>
        <span>{{ managedBy }}</span>
        <a
          v-for="link in links"
          :key="`${link.label}-${link.href}`"
          :href="link.href"
          :target="link.newTab ? '_blank' : undefined"
          :rel="link.external ? 'noreferrer' : undefined"
        >
          {{ link.label }}
        </a>
      </slot>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { BissLink } from '../tokens';

withDefaults(
  defineProps<{
    managedBy?: string;
    links?: BissLink[];
  }>(),
  {
    managedBy: 'Managed by BISS Institute.',
    links: () => [],
  },
);
</script>
