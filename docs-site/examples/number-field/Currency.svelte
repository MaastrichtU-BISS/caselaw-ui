<script lang="ts">
  import { BissField, BissNumberField } from 'biss-ui/svelte';

  let amount = $state<number | null>(1250.5);
</script>

<BissField label="Travel budget" error={amount === null ? 'Enter an amount.' : undefined}>
  <BissNumberField
    bind:value={amount}
    min={0}
    step={50}
    locale="nl-NL"
    format={{ style: 'currency', currency: 'EUR' }}
    invalid={amount === null}
  />
</BissField>
