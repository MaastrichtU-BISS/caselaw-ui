<script setup lang="ts">
/**
 * An application sidebar: a brand or workspace area, navigation, pinned items and an
 * account footer. On wide screens it collapses to an icon rail (`collapsed`); on
 * phones it is hidden and opens as a drawer (`mobileOpen`) with a focus trap,
 * Escape and an overlay. The host composes the content (BissNavSection, BissNavItem,
 * BissWorkspaceSwitcher, BissSidebarUser) and owns routing and persistence.
 * Slots receive `{ collapsed }` so content can switch to its compact form.
 */
import * as Dialog from './dialog';
import BissIcon from './BissIcon.vue';
import BissNavSection from './BissNavSection.vue';

const props = withDefaults(
  defineProps<{
    /** Accessible name of the sidebar and the drawer's title. */
    label?: string;
    /** Heading of the pinned section. */
    pinnedLabel?: string;
    collapseLabel?: string;
    expandLabel?: string;
    closeLabel?: string;
    /** Show the collapse toggle on wide screens. */
    collapsible?: boolean;
    /** Render the phone drawer in `<body>`. */
    portal?: boolean;
  }>(),
  {
    label: 'Main navigation',
    pinnedLabel: 'Pinned',
    collapseLabel: 'Collapse sidebar',
    expandLabel: 'Expand sidebar',
    closeLabel: 'Close navigation',
    collapsible: true,
    portal: true,
  },
);
defineOptions({ inheritAttrs: false });
const collapsed = defineModel<boolean>('collapsed', { default: false });
const mobileOpen = defineModel<boolean>('mobileOpen', { default: false });
defineSlots<{
  brand?: (props: { collapsed: boolean }) => unknown;
  default?: (props: { collapsed: boolean }) => unknown;
  pinned?: (props: { collapsed: boolean }) => unknown;
  footer?: (props: { collapsed: boolean }) => unknown;
}>();
</script>

<template>
  <aside v-bind="$attrs" class="biss-sidebar" :aria-label="label" :data-collapsed="collapsed || undefined">
    <div class="biss-sidebar-top">
      <div v-if="$slots.brand" class="biss-sidebar-brand"><slot name="brand" :collapsed="collapsed" /></div>
      <button
        v-if="collapsible"
        type="button"
        class="biss-header-action biss-sidebar-rail-toggle"
        :aria-label="collapsed ? expandLabel : collapseLabel"
        :title="collapsed ? expandLabel : collapseLabel"
        :aria-expanded="!collapsed"
        @click="collapsed = !collapsed"
      >
        <BissIcon name="panel" />
      </button>
    </div>
    <div class="biss-sidebar-nav">
      <slot :collapsed="collapsed" />
      <BissNavSection v-if="$slots.pinned" :heading="pinnedLabel">
        <slot name="pinned" :collapsed="collapsed" />
      </BissNavSection>
    </div>
    <div v-if="$slots.footer" class="biss-sidebar-foot"><slot name="footer" :collapsed="collapsed" /></div>
  </aside>
  <Dialog.Root v-model:open="mobileOpen">
    <Dialog.Portal :disabled="!props.portal">
      <Dialog.Overlay class="biss-sidebar-overlay" />
      <Dialog.Content class="biss-sidebar-drawer" :width="300" :aria-describedby="undefined">
        <Dialog.Title class="biss-visually-hidden">{{ label }}</Dialog.Title>
        <div class="biss-sidebar-top">
          <div v-if="$slots.brand" class="biss-sidebar-brand"><slot name="brand" :collapsed="false" /></div>
          <Dialog.Close class="biss-header-action biss-sidebar-close" :aria-label="closeLabel"
            ><BissIcon name="x"
          /></Dialog.Close>
        </div>
        <div class="biss-sidebar-nav" @click="($event.target as HTMLElement).closest('a[href]') && (mobileOpen = false)">
          <slot :collapsed="false" />
          <BissNavSection v-if="$slots.pinned" :heading="pinnedLabel">
            <slot name="pinned" :collapsed="false" />
          </BissNavSection>
        </div>
        <div v-if="$slots.footer" class="biss-sidebar-foot"><slot name="footer" :collapsed="false" /></div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
</template>
