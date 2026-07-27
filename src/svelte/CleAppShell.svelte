<script lang="ts">
  import { onMount } from "svelte";
  import { setCleFavicon, type CleServiceIconName } from "../icons";
  import type { CleLink } from "../tokens";
  import CleServiceIcon from "./CleServiceIcon.svelte";
  import CleTopBar from "./CleTopBar.svelte";

  export let brand = "Case Law Explorer";
  export let mark = "CLE";
  export let icon: CleServiceIconName | undefined = undefined;
  export let iconLabel: string | undefined = undefined;
  export let favicon = true;
  export let href = "/";
  export let topLinks: CleLink[] = [];
  /**
   * Whether to render the sidebar. Defaults to "was the slot given", which is
   * the right answer for direct use — but a wrapper always forwards its slots,
   * so it has to say explicitly.
   */
  export let sidebar: boolean | undefined = undefined;
  export let sidebarFooter: boolean | undefined = undefined;
  /**
   * Let the content own the whole area: no page padding, no measure.
   *
   * The default is a document surface, where a line of prose past 1440px is
   * unreadable and 32px of breathing room is right. A workspace is the other
   * thing entirely — a graph canvas, a results table, a docked panel — and it
   * wants the pixels. Without this each one reaches for a negative-margin
   * override, and they all reach differently.
   */
  export let fluid = false;

  /** Sidebar is a drawer below 960px; the toggle only renders there. */
  let sidebarOpen = false;
  let mounted = false;

  function syncFavicon() {
    if (favicon && icon) setCleFavicon(icon);
  }

  onMount(() => {
    mounted = true;
    syncFavicon();
  });

  $: if (mounted) syncFavicon();

  $: showSidebar = sidebar ?? Boolean($$slots.sidebar);
  $: showSidebarFooter = sidebarFooter ?? Boolean($$slots["sidebar-footer"]);
</script>

<div class="cle-app-shell">
  <CleTopBar {brand} {mark} {icon} {iconLabel} {href} links={topLinks}>
    <!-- A <svelte:fragment> must be a direct child of the component, so the
         "was it provided" test goes inside it. Providing a slot at all
         suppresses the child's fallback, which is why the default is repeated
         here rather than left to CleTopBar. -->
    <svelte:fragment slot="icon">
      {#if $$slots.icon}
        <slot name="icon" />
      {:else}
        <CleServiceIcon {icon} {mark} label={iconLabel} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="actions">
      {#if showSidebar}
        <button
          type="button"
          class="cle-button cle-button-secondary cle-button-sm cle-sidebar-toggle"
          aria-expanded={sidebarOpen}
          on:click={() => (sidebarOpen = !sidebarOpen)}
        >
          Menu
        </button>
      {/if}
      <slot name="topbar-actions" />
    </svelte:fragment>
  </CleTopBar>

  <div class="cle-app-body">
    <!-- Consoles without a record switcher (a self-service account page, say)
         omit the slot and get the full width. -->
    {#if showSidebar}
      {#if sidebarOpen}
        <button
          type="button"
          class="cle-sidebar-scrim"
          aria-label="Close navigation"
          on:click={() => (sidebarOpen = false)}
        ></button>
      {/if}
      <aside class="cle-app-sidebar" class:is-open={sidebarOpen}>
        <!-- Closing on click is what dismisses the mobile drawer after a nav
             link is followed. Scoped to the scrolling body so the account
             block's own buttons do not inherit it. -->
        <div
          class="cle-sidebar-body"
          role="presentation"
          on:click={() => (sidebarOpen = false)}
        >
          <slot name="sidebar" />
        </div>
        {#if showSidebarFooter}
          <div class="cle-sidebar-footer">
            <slot name="sidebar-footer" />
          </div>
        {/if}
      </aside>
    {/if}
    <main class="cle-app-main" class:is-fluid={fluid}>
      <div class="cle-app-main-inner">
        <slot />
      </div>
    </main>
  </div>
</div>
