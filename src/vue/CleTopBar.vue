<template>
  <header class="cle-fixed-topbar">
    <div class="cle-bar-inner">
      <a class="cle-brand" :href="href">
        <span class="cle-brand-mark">{{ mark }}</span>
        <span>{{ brand }}</span>
      </a>
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
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
import type { CleLink } from "../tokens";

withDefaults(defineProps<{
  brand?: string;
  mark?: string;
  href?: string;
  links?: CleLink[];
}>(), {
  brand: "Case Law Explorer",
  mark: "CLE",
  href: "/",
  links: () => [],
});
</script>
