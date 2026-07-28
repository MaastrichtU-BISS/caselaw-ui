<script lang="ts">
  import { onMount } from "svelte";
  import { setCleFavicon, type CleServiceIconName } from "../icons";
  import type { CleLink } from "../tokens";
  import CleServiceIcon from "./CleServiceIcon.svelte";
  import CleBottomBar from "./CleBottomBar.svelte";
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
  /**
   * Close the page with the same footer the public pages carry.
   *
   * A console is a place you stay, so it did without one. A workspace is
   * still a page of a site, and a product whose signed-in half has no
   * footer reads as somewhere else entirely. Off unless asked for, so no
   * existing console grows one by surprise.
   */
  export let footer = false;
  export let footerText = "Managed by BISS Institute.";
  export let footerLinks: CleLink[] = [];

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

  /**
   * Widens or narrows the rail.
   *
   * Pointer events rather than mouse events so a trackpad, a touchscreen and a
   * pen all work, and pointer capture keeps the drag alive when the cursor
   * outruns the handle, which at speed it always does. Arrow keys do the same
   * thing, since a drag cannot be tabbed to.
   */
  const SIDEBAR_MIN = 200;
  const SIDEBAR_MAX = 460;

  function sidebarResize(node: HTMLElement) {
    const shell = node.closest<HTMLElement>(".cle-app-shell");
    const rail = node.closest<HTMLElement>(".cle-app-sidebar");
    if (!shell || !rail) return {};

    let startX = 0;
    let startWidth = 0;

    function apply(width: number) {
      const next = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, width));
      shell!.style.setProperty("--cle-sidebar-width", `${Math.round(next)}px`);
    }

    function onPointerMove(event: PointerEvent) {
      apply(startWidth + (event.clientX - startX));
    }

    function onPointerUp(event: PointerEvent) {
      node.releasePointerCapture?.(event.pointerId);
      node.classList.remove("is-dragging");
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    }

    function onPointerDown(event: PointerEvent) {
      if (event.button !== 0) return;
      event.preventDefault();
      startX = event.clientX;
      startWidth = rail!.getBoundingClientRect().width;
      node.setPointerCapture?.(event.pointerId);
      node.classList.add("is-dragging");
      document.body.style.userSelect = "none";
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    }

    function onKeydown(event: KeyboardEvent) {
      const step = event.shiftKey ? 64 : 16;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        apply(rail!.getBoundingClientRect().width + step);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        apply(rail!.getBoundingClientRect().width - step);
      }
    }

    node.addEventListener("pointerdown", onPointerDown);
    node.addEventListener("keydown", onKeydown);

    return {
      destroy() {
        node.removeEventListener("pointerdown", onPointerDown);
        node.removeEventListener("keydown", onKeydown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        document.body.style.userSelect = "";
      },
    };
  }
</script>

<div class="cle-app-shell" class:has-footer={footer}>
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
        <!--
          Drag the rail's outer edge to widen it. Navigation labels are as long
          as the product's own vocabulary makes them, and a saved query is named
          by whoever saved it, so one fixed width truncates somebody. Writes the
          variable the sidebar already sizes from, so nothing downstream needs
          to know a drag happened.
        -->
        <button
          type="button"
          class="cle-sidebar-resizer"
          aria-label="Resize the sidebar"
          title="Drag to resize"
          use:sidebarResize
        ></button>
      </aside>
    {/if}
    <main class="cle-app-main" class:is-fluid={fluid}>
      <div class="cle-app-main-inner">
        <slot />
      </div>
    </main>
  </div>

  {#if footer}
    <CleBottomBar managedBy={footerText} links={footerLinks} />
  {/if}
</div>
