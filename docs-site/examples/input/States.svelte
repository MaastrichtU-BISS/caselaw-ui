<script lang="ts">
  import { BissInput } from 'biss-ui/svelte';

  let costCentre = $state('KP-41');
  let invalid = $derived(!/^[A-Z]{2}-\d{4}$/.test(costCentre));
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 22rem)">
  <BissInput bind:value={costCentre} {invalid} aria-label="Cost centre" mono />
  <BissInput value="Archived 12 May 2026" aria-label="Archive date" disabled />
</div>
