<script lang="ts">
  import type { CleLink } from "../tokens";
  import CleBottomBar from "./CleBottomBar.svelte";
  import CleTopBar from "./CleTopBar.svelte";

  export let brand = "Case Law Explorer";
  export let mark = "CLE";
  export let href = "/";
  export let topLinks: CleLink[] = [];
  export let footerText = "Managed by BISS Institute.";
  export let footerLinks: CleLink[] = [];
</script>

<div class="cle-grid-shell">
  <CleTopBar {brand} {mark} {href} links={topLinks} />
  <main class="cle-page">
    <slot />
  </main>
  <CleBottomBar managedBy={footerText} links={footerLinks} />
</div>
