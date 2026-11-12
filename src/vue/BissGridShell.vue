<template>
  <div class="biss-grid-shell">
    <BissTopBar :brand="brand" :mark="mark" :icon="icon" :icon-label="iconLabel" :href="href" :links="topLinks">
      <template #icon v-if="$slots.icon">
        <slot name="icon" />
      </template>
      <template #actions>
        <slot name="topbar-actions" />
      </template>
      <slot name="topbar" />
    </BissTopBar>
    <main class="biss-page">
      <slot />
    </main>
    <BissBottomBar :managed-by="footerText" :links="footerLinks" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { setBissFavicon, type BissServiceIconName } from "../icons";
import type { BissLink } from "../tokens";
import BissBottomBar from "./BissBottomBar.vue";
import BissTopBar from "./BissTopBar.vue";

const props = withDefaults(defineProps<{
  brand?: string;
  mark?: string;
  icon?: BissServiceIconName;
  iconLabel?: string;
  favicon?: boolean;
  href?: string;
  topLinks?: BissLink[];
  footerText?: string;
  footerLinks?: BissLink[];
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
  if (props.favicon && props.icon) setBissFavicon(props.icon);
}

onMounted(syncFavicon);
watch(() => [props.favicon, props.icon] as const, syncFavicon);
</script>
