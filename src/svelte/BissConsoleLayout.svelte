<script lang="ts">
  /**
   * The console arrangement: top bar, sidebar, breadcrumbs, page heading,
   * tabs, content — and the signed-in account pinned to the foot of the
   * sidebar.
   *
   * `BissAppShell` provides the chrome and `BissConsoleHeader` the heading, but
   * every console that used them had to assemble the two the same way and get
   * the same details right: where the account goes, that breadcrumbs sit above
   * the title, that tabs belong under it rather than in the bar. That assembly
   * is the thing worth owning here, so a second console does not have to
   * rediscover it.
   *
   * Omit the `nav` slot and the sidebar disappears, at which point the account
   * falls back to the top bar — a full-width page still has to say who is
   * signed in.
   */
  import type { BissServiceIconName } from "../icons";
  import type { BissLink } from "../tokens";
  import type { BissConsoleUser, BissCrumb } from "../types";
  import BissAppShell from "./BissAppShell.svelte";
  import BissConsoleHeader from "./BissConsoleHeader.svelte";
  import BissServiceIcon from "./BissServiceIcon.svelte";
  import BissSidebarUser from "./BissSidebarUser.svelte";

  export let brand = "Case Law Explorer";
  export let mark = "CLE";
  export let icon: BissServiceIconName | undefined = undefined;
  export let iconLabel: string | undefined = undefined;
  export let favicon = true;
  export let href = "/";
  export let topLinks: BissLink[] = [];
  /** Close the console with the shared site footer. */
  export let footer = false;
  export let footerText = "Managed by BISS Institute.";
  export let footerLinks: BissLink[] = [];
  /** Hand the content area the whole surface. See BissAppShell. */
  export let fluid = false;
  /** Heading. Omit to render content with no header at all. */
  export let title: string | undefined = undefined;
  export let subtitle: string | undefined = undefined;
  export let crumbs: BissCrumb[] = [];
  export let user: BissConsoleUser | undefined = undefined;
  /** Render the sign-out control in the account block. */
  export let signOut = false;
  export let signOutLabel = "Sign out";
  export let confirmSignOut = true;
  export let signOutTitle = "Sign out?";
  export let signOutCopy: string | undefined = undefined;
  export let busy = false;

  $: hasSidebar = Boolean($$slots.nav || $$slots["nav-footer"]);
  $: showHeader = Boolean(title || crumbs.length || $$slots.actions);
</script>

<!-- A wrapper always forwards its slots, so the shell cannot infer whether a
     sidebar exists from slot presence — it is told. -->
<BissAppShell
  {brand}
  {mark}
  {icon}
  {iconLabel}
  {favicon}
  {href}
  {topLinks}
  {footer}
  {footerText}
  {footerLinks}
  {fluid}
  sidebar={hasSidebar}
  sidebarFooter={hasSidebar && Boolean(user || signOut || $$slots["user-actions"])}
>
  <svelte:fragment slot="icon">
    {#if $$slots.icon}
      <slot name="icon" />
    {:else}
      <BissServiceIcon {icon} {mark} label={iconLabel} />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="topbar-actions">
    <!-- Only when there is no sidebar to put it in. -->
    {#if user && !hasSidebar}
      <span class="biss-topbar-account">{user.email || user.name}</span>
    {/if}
    <slot name="topbar-actions" />
    {#if !hasSidebar}
      <slot name="user-actions" />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="sidebar">
    <slot name="nav" />
    <slot name="nav-footer" />
  </svelte:fragment>

  <svelte:fragment slot="sidebar-footer">
    {#if user}
      <BissSidebarUser name={user.name} email={user.email} initials={user.initials} {signOut} {signOutLabel} {confirmSignOut} {signOutTitle} {signOutCopy} {busy} on:signOut>
        <svelte:fragment slot="menu"><slot name="user-actions" /></svelte:fragment>
      </BissSidebarUser>
    {:else}
      <div class="biss-sidebar-user-actions"><slot name="user-actions" /></div>
    {/if}
  </svelte:fragment>

  {#if showHeader}
    <BissConsoleHeader title={title || ""} {subtitle} {crumbs} actions={Boolean($$slots.actions)}>
      <svelte:fragment slot="actions"><slot name="actions" /></svelte:fragment>
      <slot name="tabs" />
    </BissConsoleHeader>
  {/if}

  <slot />
</BissAppShell>
