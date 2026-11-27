<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';
import { setBissFavicon, type BissServiceIconName } from '../core/service-icons';
import type { BissLink } from '../tokens';
import BissBottomBar from './BissBottomBar.vue';
import BissIcon from './BissIcon.vue';
import BissServiceIcon from './BissServiceIcon.vue';
import BissTopBar from './BissTopBar.vue';

const props = withDefaults(
  defineProps<{
    brand?: string;
    mark?: string;
    icon?: BissServiceIconName;
    iconLabel?: string;
    favicon?: boolean;
    href?: string;
    topLinks?: BissLink[];
    /** Shell chrome: `topbar` (classic fixed top bar) or `rail` (Bizzy full-height sidebar). */
    chrome?: 'topbar' | 'rail';
    /** Close the console with the shared site footer. */
    footer?: boolean;
    footerText?: string;
    footerLinks?: BissLink[];
    /**
     * Let the content own the whole area: no page padding, no measure.
     *
     * The default is a document surface, where a line of prose past 1440px is
     * unreadable and 32px of breathing room is right. A workspace is the other
     * thing entirely, a graph canvas or a docked panel, and it wants the pixels.
     */
    fluid?: boolean;
  }>(),
  {
    chrome: 'topbar',
    fluid: false,
    brand: 'Workspace',
    mark: 'B',
    favicon: true,
    href: '/',
    topLinks: () => [],
    footer: false,
    footerText: 'Managed by BISS Institute.',
    footerLinks: () => [],
  },
);

/** Sidebar is a drawer below 960px; the toggle only renders there. */
const sidebarOpen = ref(false);

/**
 * Above 960px the rail folds down to a strip instead. A workspace (a graph,
 * a results table) wants the width back, and a sidebar that can only be
 * narrowed to 200px does not give enough of it. Remembered per browser,
 * since whoever folds it away once wants it folded on the next page too.
 */
const COLLAPSED_KEY = 'biss-sidebar-collapsed';
const sidebarCollapsed = ref(false);

function setCollapsed(next: boolean) {
  sidebarCollapsed.value = next;
  try {
    localStorage.setItem(COLLAPSED_KEY, next ? '1' : '0');
  } catch {
    // Storage can be blocked; the rail still folds, it just forgets.
  }
}

function onShellKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key === '\\' && Boolean(slots.sidebar)) {
    event.preventDefault();
    setCollapsed(!sidebarCollapsed.value);
  }
}

onMounted(() => {
  try {
    sidebarCollapsed.value = localStorage.getItem(COLLAPSED_KEY) === '1';
  } catch {
    sidebarCollapsed.value = false;
  }
  window.addEventListener('keydown', onShellKeydown);
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
    rail: node?.closest<HTMLElement>('.biss-app-sidebar') || null,
    shell: node?.closest<HTMLElement>('.biss-app-shell') || null,
  };
}

function applyWidth(width: number) {
  const { shell } = railAndShell();
  if (!shell) return;
  const next = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, width));
  shell.style.setProperty('--biss-sidebar-width', `${Math.round(next)}px`);
}

function onPointerMove(event: PointerEvent) {
  applyWidth(startWidth + (event.clientX - startX));
}

function onPointerUp(event: PointerEvent) {
  resizer.value?.releasePointerCapture?.(event.pointerId);
  resizer.value?.classList.remove('is-dragging');
  document.body.style.userSelect = '';
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
}

function onResizeStart(event: PointerEvent) {
  if (event.button !== 0) return;
  const { rail } = railAndShell();
  if (!rail) return;
  event.preventDefault();
  startX = event.clientX;
  startWidth = rail.getBoundingClientRect().width;
  resizer.value?.setPointerCapture?.(event.pointerId);
  resizer.value?.classList.add('is-dragging');
  document.body.style.userSelect = 'none';
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
}

function onResizeKey(event: KeyboardEvent) {
  const { rail } = railAndShell();
  if (!rail) return;
  const step = event.shiftKey ? 64 : 16;
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    applyWidth(rail.getBoundingClientRect().width + step);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    applyWidth(rail.getBoundingClientRect().width - step);
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onShellKeydown);
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
  document.body.style.userSelect = '';
});

function syncFavicon() {
  if (props.favicon && props.icon) setBissFavicon(props.icon);
}

onMounted(syncFavicon);
watch(() => [props.favicon, props.icon] as const, syncFavicon);

defineExpose({ closeSidebar: () => (sidebarOpen.value = false) });
</script>

<template>
  <div
    class="biss-app-shell"
    :class="{
      'is-rail': chrome === 'rail' && Boolean($slots.sidebar),
      'has-footer': showFooter,
      'is-sidebar-collapsed': Boolean($slots.sidebar) && sidebarCollapsed,
    }"
  >
    <BissTopBar
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
          class="biss-button biss-button-secondary biss-button-sm biss-sidebar-toggle"
          :aria-expanded="sidebarOpen"
          @click="sidebarOpen = !sidebarOpen"
        >
          Menu
        </button>
        <slot name="topbar-actions" />
      </template>
    </BissTopBar>

    <div class="biss-app-body">
      <!-- Consoles without a record switcher (a self-service account page,
           say) omit the slot and get the full width. -->
      <template v-if="$slots.sidebar">
        <button
          v-if="sidebarOpen"
          type="button"
          class="biss-sidebar-scrim"
          aria-label="Close navigation"
          @click="sidebarOpen = false"
        />
        <aside class="biss-app-sidebar" :class="{ 'is-open': sidebarOpen }">
          <!-- Bizzy rail chrome keeps the collapse control inline beside the brand;
               classic topbar shells keep the border toggle for compatibility. -->
          <div v-if="chrome === 'rail'" class="biss-sidebar-brand-row">
            <a class="biss-brand" :href="href" :aria-label="brand" :title="sidebarCollapsed ? brand : undefined">
              <slot name="icon">
                <BissServiceIcon :icon="icon" :mark="mark" :label="iconLabel" />
              </slot>
              <span class="biss-brand-text">{{ brand }}</span>
            </a>
            <button
              type="button"
              class="biss-sidebar-rail-toggle"
              :aria-expanded="!sidebarCollapsed"
              :aria-label="sidebarCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'"
              :title="sidebarCollapsed ? 'Expand the sidebar (⌘\\)' : 'Collapse the sidebar (⌘\\)'"
              @click="setCollapsed(!sidebarCollapsed)"
            >
              <BissIcon name="panel" />
            </button>
          </div>
          <button
            v-else
            type="button"
            class="biss-sidebar-collapse"
            :aria-expanded="!sidebarCollapsed"
            :aria-label="sidebarCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'"
            :title="sidebarCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'"
            @click="setCollapsed(!sidebarCollapsed)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <!-- Closing on click is what dismisses the mobile drawer after a nav
               link is followed. Scoped to the scrolling body so the account
               block's own buttons do not inherit it. -->
          <div class="biss-sidebar-body" @click="sidebarOpen = false">
            <slot name="sidebar" />
          </div>
          <div v-if="$slots['sidebar-footer']" class="biss-sidebar-footer">
            <slot name="sidebar-footer" />
          </div>
          <!--
            The rail's width is the user's to set. Product names run as long as
            the product's own vocabulary makes them, and a table name is chosen
            by whoever created the table, so one fixed width truncates somebody.
            Writes the variable the sidebar already sizes from, so nothing
            downstream needs to know a drag happened.

            This existed only in the Svelte mirror. The Vue consoles set
            --biss-sidebar-width and listened for the drag to finish, but there
            was no handle to drag: the workbench looked resizable and was not.
          -->
          <button
            ref="resizer"
            type="button"
            class="biss-sidebar-resizer"
            aria-label="Resize the sidebar"
            title="Drag to resize"
            @pointerdown="onResizeStart"
            @keydown="onResizeKey"
          />
        </aside>
      </template>
      <main class="biss-app-main" :class="{ 'is-fluid': fluid }">
        <div class="biss-app-main-inner">
          <div
            v-if="chrome === 'rail' && (topLinks.length || $slots['topbar-actions'])"
            class="biss-rail-bar"
          >
            <nav v-if="topLinks.length" class="biss-link-row" aria-label="Related links">
              <a
                v-for="link in topLinks"
                :key="link.href"
                :href="link.href"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                :target="link.newTab ? '_blank' : undefined"
              >
                {{ link.label }}
              </a>
            </nav>
            <div v-if="$slots['topbar-actions']" class="biss-rail-bar-end">
              <slot name="topbar-actions" />
            </div>
          </div>
          <slot />
        </div>
      </main>
    </div>

    <BissBottomBar v-if="showFooter" :managed-by="footerText" :links="footerLinks">
      <slot v-if="$slots.footer" name="footer" />
    </BissBottomBar>
  </div>
</template>
