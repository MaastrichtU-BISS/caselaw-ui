<script lang="ts">
  import { onMount } from 'svelte';
  import { BissButton, BissSkeleton } from 'biss-ui/svelte';

  let loading = $state(true);

  async function load() {
    loading = true;
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Your request goes here.
    loading = false;
  }

  onMount(load);
</script>

<section class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)" aria-busy={loading}>
  {#if loading}
    <span class="biss-visually-hidden" role="status">Loading project summary</span>
    <BissSkeleton height="20px" width="55%" />
    <BissSkeleton lines={3} />
  {:else}
    <h3 style="margin: 0">Digital Legal Studies</h3>
    <p style="margin: 0">
      Four-year NWO project mapping how Dutch courts cite European case law. Two PhD positions,
      one postdoc, and a public dataset due in June 2027.
    </p>
  {/if}
  <div><BissButton variant="secondary" size="sm" {loading} onclick={load}>Reload</BissButton></div>
</section>
