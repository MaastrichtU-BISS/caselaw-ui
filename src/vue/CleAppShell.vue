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
          v-if="$slots.sidebar"
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
      <!-- Consoles without a record switcher (a self-service account page,
           say) omit the slot and get the full width. -->
      <template v-if="$slots.sidebar">
        <button
          v-if="sidebarOpen"
          type="button"
          class="cle-sidebar-scrim"
          aria-label="Close navigation"
          @click="sidebarOpen = false"
        />
        <aside class="cle-app-sidebar" :class="{ 'is-open': sidebarOpen }">
          <!-- Closing on click is what dismisses the mobile drawer after a nav
               link is followed. Scoped to the scrolling body so the account
               block's own buttons do not inherit it. -->
          <div class="cle-sidebar-body" @click="sidebarOpen = false">
            <slot name="sidebar" />
          </div>
          <div v-if="$slots['sidebar-footer']" class="cle-sidebar-footer">
            <slot name="sidebar-footer" />
          </div>
        </aside>
      </template>
      <main class="cle-app-main">
        <div class="cle-app-main-inner">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
