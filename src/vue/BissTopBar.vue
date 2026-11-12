<template>
  <header class="biss-fixed-topbar">
    <div class="biss-bar-inner">
      <a class="biss-brand" :href="href" :aria-label="brand">
        <slot name="icon">
          <BissServiceIcon :icon="icon" :mark="mark" :label="iconLabel" />
        </slot>
        <span class="biss-brand-text">{{ brand }}</span>
      </a>
      <div class="biss-topbar-right">
        <nav v-if="links.length" class="biss-link-row" aria-label="Primary">
          <a
            v-for="link in links"
            :key="`${link.label}-${link.href}`"
            :href="link.href"
            :target="link.newTab ? '_blank' : undefined"
            :rel="link.external ? 'noreferrer' : undefined"
          >
            {{ link.label }}
          </a>
        </nav>
        <div class="biss-topbar-actions">
          <slot name="actions" />
          <slot />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { BissServiceIconName } from '../core/service-icons';
import type { BissLink } from '../tokens';
import BissServiceIcon from './BissServiceIcon.vue';

withDefaults(
  defineProps<{
    brand?: string;
    mark?: string;
    icon?: BissServiceIconName;
    iconLabel?: string;
    href?: string;
    links?: BissLink[];
  }>(),
  {
    brand: 'Workspace',
    mark: 'B',
    href: '/',
    links: () => [],
  },
);
</script>
