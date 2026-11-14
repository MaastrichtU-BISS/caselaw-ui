<script lang="ts">
  import { BissButton, BissSidePanel } from 'biss-ui/svelte';

  let open = $state(false);
</script>

<BissButton variant="secondary" onclick={() => (open = true)}>View grant</BissButton>
<BissSidePanel
  bind:open
  title="NWO Open Science Fund"
  description="OSF.23.1.042 · Law and Tech Lab"
  width={480}
>
  <p><strong>Principal investigator:</strong> Prof. Lena Janssen</p>
  <p><strong>Budget:</strong> €48,500, of which €31,200 spent</p>
  <p><strong>Period:</strong> 1 July 2025 to 30 June 2027</p>
  <p>Builds an open citation network of Dutch and EU case law for researchers.</p>
  {#snippet actions()}
    <BissButton variant="secondary" onclick={() => (open = false)}>Close</BissButton>
    <BissButton>Edit grant</BissButton>
  {/snippet}
</BissSidePanel>
