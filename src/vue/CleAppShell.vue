<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { setCleFavicon, type CleServiceIconName } from "../icons";
import type { CleLink } from "../tokens";
import CleTopBar from "./CleTopBar.vue";

const props = withDefaults(defineProps<{
  brand?: string;
  mark?: string;
  icon?: CleServiceIconName;
  iconLabel?: string;
  favicon?: boolean;
  href?: string;
  topLinks?: CleLink[];
}>(), {
  brand: "Case Law Explorer",
  mark: "CLE",
  favicon: true,
  href: "/",
  topLinks: () => [],
});

/** Sidebar is a drawer below 960px; the toggle only renders there. */
const sidebarOpen = ref(false);

function syncFavicon() {
  if (props.favicon && props.icon) setCleFavicon(props.icon);
}

onMounted(syncFavicon);
watch(() => [props.favicon, props.icon] as const, syncFavicon);

defineExpose({ closeSidebar: () => (sidebarOpen.value = false) });
</script>

<template>
  <div class="cle-app-shell">
    <CleTopBar
      :brand="brand"
      :mark="mark"
      :icon="icon"
      :icon-label="iconLabel"
      :href="href"
      :links="topLinks"
    >
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <template #actions>
        <button
          type="button"
          class="cle-button cle-button-secondary cle-button-sm cle-sidebar-toggle"
          :aria-expanded="sidebarOpen"
          @click="sidebarOpen = !sidebarOpen"
        >
          Menu
        </button>
        <slot name="topbar-actions" />
      </template>
    </CleTopBar>

    <div class="cle-app-body">
      <button
        v-if="sidebarOpen"
        type="button"
        class="cle-sidebar-scrim"
        aria-label="Close navigation"
        @click="sidebarOpen = false"
      />
      <aside class="cle-app-sidebar" :class="{ 'is-open': sidebarOpen }" @click="sidebarOpen = false">
        <slot name="sidebar" />
      </aside>
      <main class="cle-app-main">
        <div class="cle-app-main-inner">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
