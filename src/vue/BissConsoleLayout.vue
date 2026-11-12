<script setup lang="ts">
/**
 * The console arrangement: top bar, sidebar, breadcrumbs, page heading, tabs,
 * content — and the signed-in account pinned to the foot of the sidebar.
 *
 * `BissAppShell` provides the chrome and `BissConsoleHeader` the heading, but
 * every console that used them had to assemble the two the same way and get
 * the same details right: where the account goes, that breadcrumbs sit above
 * the title, that tabs belong under it rather than in the bar. That assembly
 * is the thing worth owning here, so a second console does not have to
 * rediscover it.
 *
 *     <BissConsoleLayout
 *       brand="Caselaw Access" icon="access"
 *       :crumbs="[{ label: 'Projects', href: '/' }, { label: slug }]"
 *       title="Database Workbench"
 *       :user="{ name: 'dwicker', email: 'dwicker@example.org' }"
 *     >
 *       <template #nav>…</template>
 *       <template #user-actions><button>Sign out</button></template>
 *       <template #tabs>…</template>
 *       …page content
 *     </BissConsoleLayout>
 *
 * Omit `nav` and the sidebar disappears, at which point the account falls back
 * to the top bar — a full-width page still has to say who is signed in.
 */
import { computed, useSlots } from "vue";
import type { BissServiceIconName } from "../icons";
import type { BissLink } from "../tokens";
import type { BissConsoleUser, BissCrumb } from "../types";
import BissAppShell from "./BissAppShell.vue";
import BissConsoleHeader from "./BissConsoleHeader.vue";
import BissSidebarUser from "./BissSidebarUser.vue";

const props = withDefaults(defineProps<{
  brand?: string;
  mark?: string;
  icon?: BissServiceIconName;
  iconLabel?: string;
  favicon?: boolean;
  href?: string;
  topLinks?: BissLink[];
  /** Close the console with the shared site footer. */
  footer?: boolean;
  footerText?: string;
  footerLinks?: BissLink[];
  /** Hand the content area the whole surface. See BissAppShell. */
  fluid?: boolean;
  /** Heading. Omit to render content with no header at all. */
  title?: string;
  subtitle?: string;
  crumbs?: BissCrumb[];
  user?: BissConsoleUser;
  /** Passed through to the account block, making the identity a link. */
  accountHref?: string;
  /** Render the sign-out control in the account block. */
  signOut?: boolean;
  signOutLabel?: string;
  confirmSignOut?: boolean;
  signOutTitle?: string;
  signOutCopy?: string;
  busy?: boolean;
}>(), {
  // Declared here, not left to BissSidebarUser's own defaults: binding a prop
  // the wrapper never sets passes `undefined` down, and the child's default
  // does not reliably win against an explicitly-passed undefined. Relying on
  // it turned the sign-out confirmation off in every console that used the
  // layout, while working fine for anyone using BissSidebarUser directly.
  signOut: false,
  signOutLabel: "Sign out",
  confirmSignOut: true,
  signOutTitle: "Sign out?",
  busy: false,
  brand: "Case Law Explorer",
  mark: "CLE",
  favicon: true,
  href: "/",
  topLinks: () => [],
  footer: false,
  footerText: "Managed by BISS Institute.",
  footerLinks: () => [],
  fluid: false,
});

const emit = defineEmits<{ signOut: [] }>();
const slots = useSlots();
const hasSidebar = computed(() => Boolean(slots.nav || slots["nav-footer"]));
const showHeader = computed(() => Boolean(props.title || props.crumbs?.length || slots.actions));
</script>

<template>
  <BissAppShell
    :brand="brand"
    :mark="mark"
    :icon="icon"
    :icon-label="iconLabel"
    :favicon="favicon"
    :href="href"
    :top-links="topLinks"
    :footer="footer"
    :footer-text="footerText"
    :footer-links="footerLinks"
    :fluid="fluid"
  >
    <template v-if="$slots.icon" #icon><slot name="icon" /></template>

    <template #topbar-actions>
      <!-- Only when there is no sidebar to put it in. -->
      <span v-if="user && !hasSidebar" class="biss-topbar-account">{{ user.email || user.name }}</span>
      <slot name="topbar-actions" />
      <slot v-if="!hasSidebar" name="user-actions" />
    </template>

    <template v-if="hasSidebar" #sidebar>
      <slot name="nav" />
      <slot name="nav-footer" />
    </template>

    <template v-if="hasSidebar && (user || signOut || $slots['user-actions'])" #sidebar-footer>
      <BissSidebarUser
        :account-href="accountHref"
        v-if="user"
        v-bind="user"
        :sign-out="signOut"
        :sign-out-label="signOutLabel"
        :confirm-sign-out="confirmSignOut"
        :sign-out-title="signOutTitle"
        :sign-out-copy="signOutCopy"
        :busy="busy"
        @sign-out="emit('signOut')"
      >
        <template v-if="$slots['user-actions']" #actions><slot name="user-actions" /></template>
      </BissSidebarUser>
      <div v-else class="biss-sidebar-user-actions"><slot name="user-actions" /></div>
    </template>

    <template v-if="$slots.footer" #footer><slot name="footer" /></template>

    <BissConsoleHeader
      v-if="showHeader"
      :title="title || ''"
      :subtitle="subtitle"
      :crumbs="crumbs"
    >
      <template v-if="$slots.actions" #actions><slot name="actions" /></template>
      <slot name="tabs" />
    </BissConsoleHeader>

    <slot />
  </BissAppShell>
</template>
