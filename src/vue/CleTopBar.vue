<template>
  <header class="cle-fixed-topbar">
    <div class="cle-bar-inner">
      <a class="cle-brand" :href="href" :aria-label="brand">
        <slot name="icon">
          <CleServiceIcon :icon="icon" :mark="mark" :label="iconLabel" />
        </slot>
        <span class="cle-brand-text">{{ brand }}</span>
      </a>
      <div class="cle-topbar-right">
        <nav v-if="links.length" class="cle-link-row" aria-label="Primary">
          <a
            v-for="link in links"
            :key="`${link.label}-${link.href}`"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noreferrer' : undefined"
          >
            {{ link.label }}
          </a>
        </nav>
        <div class="cle-topbar-actions">
          <slot name="actions" />
          <slot />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { CleServiceIconName } from "../icons";
import type { CleLink } from "../tokens";
import CleServiceIcon from "./CleServiceIcon.vue";

withDefaults(defineProps<{
  brand?: string;
  mark?: string;
  icon?: CleServiceIconName;
  iconLabel?: string;
  href?: string;
  links?: CleLink[];
}>(), {
  brand: "Case Law Explorer",
  mark: "CLE",
  href: "/",
  links: () => [],
});
</script>
