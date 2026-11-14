<script lang="ts">
  import { BissButton, BissCallout } from 'biss-ui/svelte';
</script>

<div style="width: min(100%, 520px)">
  <BissCallout tone="warning" title="Budget exceeds the funder’s cap">
    Personnel costs are €18,400 over the €1.5 million limit for this call.
    {#snippet actions()}
      <BissButton size="sm" variant="secondary">Review budget</BissButton>
    {/snippet}
  </BissCallout>
</div>
