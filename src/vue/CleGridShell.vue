<template>
  <div class="cle-grid-shell">
    <CleTopBar :brand="brand" :mark="mark" :icon="icon" :icon-label="iconLabel" :href="href" :links="topLinks">
      <template #icon v-if="$slots.icon">
        <slot name="icon" />
      </template>
      <template #actions>
        <slot name="topbar-actions" />
      </template>
      <slot name="topbar" />
    </CleTopBar>
    <main class="cle-page">
      <slot />
    </main>
    <CleBottomBar :managed-by="footerText" :links="footerLinks" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { setCleFavicon, type CleServiceIconName } from "../icons";
import type { CleLink } from "../tokens";
import CleBottomBar from "./CleBottomBar.vue";
import CleTopBar from "./CleTopBar.vue";

const props = withDefaults(defineProps<{
  brand?: string;
  mark?: string;
  icon?: CleServiceIconName;
  iconLabel?: string;
  favicon?: boolean;
  href?: string;
  topLinks?: CleLink[];
  footerText?: string;
  footerLinks?: CleLink[];
}>(), {
  brand: "Case Law Explorer",
  mark: "CLE",
  favicon: true,
  href: "/",
  topLinks: () => [],
  footerText: "Managed by BISS Institute.",
  footerLinks: () => [],
});

function syncFavicon() {
  if (props.favicon && props.icon) setCleFavicon(props.icon);
}

onMounted(syncFavicon);
watch(() => [props.favicon, props.icon] as const, syncFavicon);
</script>
