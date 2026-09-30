<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from "vue";
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
  /** Close the console with the shared site footer. */
  footer?: boolean;
  footerText?: string;
  footerLinks?: CleLink[];
  /**
   * Let the content own the whole area: no page padding, no measure.
   *
   * The default is a document surface, where a line of prose past 1440px is
   * unreadable and 32px of breathing room is right. A workspace is the other
   * thing entirely, a graph canvas or a docked panel, and it wants the pixels.
   */
  fluid?: boolean;
}>(), {
  fluid: false,
  brand: "Case Law Explorer",
  mark: "CLE",
  favicon: true,
  href: "/",
  topLinks: () => [],
  footer: false,
  footerText: "Managed by BISS Institute.",
  footerLinks: () => [],
});

/** Sidebar is a drawer below 960px; the toggle only renders there. */
const sidebarOpen = ref(false);

/**
 * Above 960px the rail folds down to a strip instead. A workspace (a graph,
 * a results table) wants the width back, and a sidebar that can only be
 * narrowed to 200px does not give enough of it. Remembered per browser,
 * since whoever folds it away once wants it folded on the next page too.
 */
const COLLAPSED_KEY = "cle-sidebar-collapsed";
const sidebarCollapsed = ref(false);

function setCollapsed(next: boolean) {
  sidebarCollapsed.value = next;
  try {
    localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
  } catch {
    // Storage can be blocked; the rail still folds, it just forgets.
  }
}

onMounted(() => {
  try {
    sidebarCollapsed.value = localStorage.getItem(COLLAPSED_KEY) === "1";
  } catch {
    sidebarCollapsed.value = false;
  }
});
const slots = useSlots();
const showFooter = computed(() => props.footer || Boolean(slots.footer));

/**
 * Widens or narrows the rail.
 *
 * Pointer events rather than mouse events so a trackpad, a touchscreen and a
 * pen all work, and pointer capture keeps the drag alive when the cursor
 * outruns the handle, which at speed it always does. Arrow keys do the same
 * thing, since a drag cannot be tabbed to.
 *
 * Ported from the Svelte mirror, where it had been the whole time.
 */
const SIDEBAR_MIN = 200;
const SIDEBAR_MAX = 460;

const resizer = ref<HTMLElement | null>(null);
let startX = 0;
let startWidth = 0;

function railAndShell() {
  const node = resizer.value;
  return {
    rail: node?.closest<HTMLElement>(".cle-app-sidebar") || null,
    shell: node?.closest<HTMLElement>(".cle-app-shell") || null,
  };
}

function applyWidth(width: number) {
  const { shell } = railAndShell();
  if (!shell) return;
  const next = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, width));
  shell.style.setProperty("--cle-sidebar-width", `${Math.round(next)}px`);
}

function onPointerMove(event: PointerEvent) {
  applyWidth(startWidth + (event.clientX - startX));
}

function onPointerUp(event: PointerEvent) {
  resizer.value?.releasePointerCapture?.(event.pointerId);
  resizer.value?.classList.remove("is-dragging");
  document.body.style.userSelect = "";
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
}

function onResizeStart(event: PointerEvent) {
  if (event.button !== 0) return;
  const { rail } = railAndShell();
  if (!rail) return;
  event.preventDefault();
  startX = event.clientX;
  startWidth = rail.getBoundingClientRect().width;
  resizer.value?.setPointerCapture?.(event.pointerId);
  resizer.value?.classList.add("is-dragging");
  document.body.style.userSelect = "none";
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
}

function onResizeKey(event: KeyboardEvent) {
  const { rail } = railAndShell();
  if (!rail) return;
  const step = event.shiftKey ? 64 : 16;
  if (event.key === "ArrowRight") {
    event.preventDefault();
    applyWidth(rail.getBoundingClientRect().width + step);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    applyWidth(rail.getBoundingClientRect().width - step);
  }
}

onBeforeUnmount(() => {
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  document.body.style.userSelect = "";
});

function syncFavicon() {
  if (props.favicon && props.icon) setCleFavicon(props.icon);
}

onMounted(syncFavicon);
watch(() => [props.favicon, props.icon] as const, syncFavicon);

defineExpose({ closeSidebar: () => (sidebarOpen.value = false) });
</script>

<template>
  <div
    class="cle-app-shell"
    :class="{
      'has-footer': showFooter,
      'is-sidebar-collapsed': Boolean($slots.sidebar) && sidebarCollapsed,
    }"
  >
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
          <!-- Sits on the rail's border so it is still there, and in the same
               place, once the rail has folded down to a strip. -->
          <button
            type="button"
            class="cle-sidebar-collapse"
            :aria-expanded="!sidebarCollapsed"
            :aria-label="sidebarCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'"
            :title="sidebarCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'"
            @click="setCollapsed(!sidebarCollapsed)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <!-- Closing on click is what dismisses the mobile drawer after a nav
               link is followed. Scoped to the scrolling body so the account
               block's own buttons do not inherit it. -->
          <div class="cle-sidebar-body" @click="sidebarOpen = false">
            <slot name="sidebar" />
          </div>
          <div v-if="$slots['sidebar-footer']" class="cle-sidebar-footer">
            <slot name="sidebar-footer" />
          </div>
          <!--
            The rail's width is the user's to set. Product names run as long as
            the product's own vocabulary makes them, and a table name is chosen
            by whoever created the table, so one fixed width truncates somebody.
            Writes the variable the sidebar already sizes from, so nothing
            downstream needs to know a drag happened.

            This existed only in the Svelte mirror. The Vue consoles set
            --cle-sidebar-width and listened for the drag to finish, but there
            was no handle to drag: the workbench looked resizable and was not.
          -->
          <button
            ref="resizer"
            type="button"
            class="cle-sidebar-resizer"
            aria-label="Resize the sidebar"
            title="Drag to resize"
            @pointerdown="onResizeStart"
            @keydown="onResizeKey"
          />
        </aside>
      </template>
      <main class="cle-app-main" :class="{ 'is-fluid': fluid }">
        <div class="cle-app-main-inner">
          <slot />
        </div>
      </main>
    </div>

    <CleBottomBar v-if="showFooter" :managed-by="footerText" :links="footerLinks">
      <slot v-if="$slots.footer" name="footer" />
    </CleBottomBar>
  </div>
</template>
