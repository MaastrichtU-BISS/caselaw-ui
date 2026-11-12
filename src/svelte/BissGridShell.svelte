<script lang="ts">
  import { onMount } from "svelte";
  import { setBissFavicon, type BissServiceIconName } from "../icons";
  import type { BissLink } from "../tokens";
  import BissBottomBar from "./BissBottomBar.svelte";
  import BissServiceIcon from "./BissServiceIcon.svelte";
  import BissTopBar from "./BissTopBar.svelte";

  export let brand = "Case Law Explorer";
  export let mark = "CLE";
  export let icon: BissServiceIconName | undefined = undefined;
  export let iconLabel: string | undefined = undefined;
  export let favicon = true;
  export let href = "/";
  export let topLinks: BissLink[] = [];
  export let footerText = "Managed by BISS Institute.";
  export let footerLinks: BissLink[] = [];

  let mounted = false;

  function syncFavicon() {
    if (favicon && icon) setBissFavicon(icon);
  }

  onMount(() => {
    mounted = true;
    syncFavicon();
  });

  $: if (mounted) syncFavicon();
</script>

<div class="biss-grid-shell">
  <BissTopBar {brand} {mark} {icon} {iconLabel} {href} links={topLinks}>
    <!-- A <svelte:fragment> must be a direct child of the component, so the
         "was it provided" test goes inside it. Providing a slot at all
         suppresses the child's fallback, which is why the default is repeated
         here rather than left to BissTopBar. -->
    <svelte:fragment slot="icon">
      {#if $$slots.icon}
        <slot name="icon" />
      {:else}
        <BissServiceIcon {icon} {mark} label={iconLabel} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="actions">
      <slot name="topbar-actions" />
    </svelte:fragment>
    {#if $$slots.topbar}
      <slot name="topbar" />
    {/if}
  </BissTopBar>
  <main class="biss-page">
    <slot />
  </main>
  <BissBottomBar managedBy={footerText} links={footerLinks} />
</div>
