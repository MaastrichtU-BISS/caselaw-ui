<script lang="ts">
  import { onMount } from "svelte";
  import { setCleFavicon, type CleServiceIconName } from "../icons";
  import type { CleLink } from "../tokens";
  import CleBottomBar from "./CleBottomBar.svelte";
  import CleServiceIcon from "./CleServiceIcon.svelte";
  import CleTopBar from "./CleTopBar.svelte";

  export let brand = "Case Law Explorer";
  export let mark = "CLE";
  export let icon: CleServiceIconName | undefined = undefined;
  export let iconLabel: string | undefined = undefined;
  export let favicon = true;
  export let href = "/";
  export let topLinks: CleLink[] = [];
  export let footerText = "Managed by BISS Institute.";
  export let footerLinks: CleLink[] = [];

  let mounted = false;

  function syncFavicon() {
    if (favicon && icon) setCleFavicon(icon);
  }

  onMount(() => {
    mounted = true;
    syncFavicon();
  });

  $: if (mounted) syncFavicon();
</script>

<div class="cle-grid-shell">
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
      <slot name="topbar-actions" />
    </svelte:fragment>
    {#if $$slots.topbar}
      <slot name="topbar" />
    {/if}
  </CleTopBar>
  <main class="cle-page">
    <slot />
  </main>
  <CleBottomBar managedBy={footerText} links={footerLinks} />
</div>
