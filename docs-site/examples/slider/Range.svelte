<script lang="ts">
  import { BissField, BissSlider } from 'biss-ui/svelte';

  let budget = $state([50_000, 250_000]);
</script>

<BissField label="Grant size" hint="Calls outside this range are hidden.">
  <BissSlider
    bind:value={budget}
    min={0}
    max={500_000}
    step={10_000}
    showValue
    thumbLabels={['Smallest grant', 'Largest grant']}
    format={{ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }}
  />
</BissField>
