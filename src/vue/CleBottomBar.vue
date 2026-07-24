<template>
  <footer class="cle-fixed-bottombar">
    <div class="cle-footer-inner">
      <span>{{ managedBy }}</span>
      <a
        v-for="link in links"
        :key="`${link.label}-${link.href}`"
        :href="link.href"
        :target="link.external ? '_blank' : undefined"
        :rel="link.external ? 'noreferrer' : undefined"
      >
        {{ link.label }}
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { CleLink } from "../tokens";

withDefaults(defineProps<{
  managedBy?: string;
  links?: CleLink[];
}>(), {
  managedBy: "Managed by BISS Institute.",
  links: () => [],
});
</script>
