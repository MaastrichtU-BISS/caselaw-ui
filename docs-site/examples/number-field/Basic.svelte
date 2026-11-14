<script lang="ts">
  import { BissField, BissNumberField } from 'biss-ui/svelte';

  let seats = $state<number | null>(4);
</script>

<BissField label="Team seats" hint="Between 1 and 50.">
  <BissNumberField bind:value={seats} min={1} max={50} />
</BissField>
