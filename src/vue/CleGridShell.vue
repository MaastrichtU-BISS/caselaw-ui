<template>
  <div class="cle-grid-shell">
    <CleTopBar :brand="brand" :mark="mark" :href="href" :links="topLinks" />
    <main class="cle-page">
      <slot />
    </main>
    <CleBottomBar :managed-by="footerText" :links="footerLinks" />
  </div>
</template>

<script setup lang="ts">
import type { CleLink } from "../tokens";
import CleBottomBar from "./CleBottomBar.vue";
import CleTopBar from "./CleTopBar.vue";

withDefaults(defineProps<{
  brand?: string;
  mark?: string;
  href?: string;
  topLinks?: CleLink[];
  footerText?: string;
  footerLinks?: CleLink[];
}>(), {
  brand: "Case Law Explorer",
  mark: "CLE",
  href: "/",
  topLinks: () => [],
  footerText: "Managed by BISS Institute.",
  footerLinks: () => [],
});
</script>
