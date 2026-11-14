<script lang="ts">
  import { BissSlider } from 'biss-ui/svelte';

  let confidence = $state(70);
</script>

<BissSlider
  bind:value={confidence}
  label="Confidence"
  showValue
  format={{ style: 'unit', unit: 'percent' }}
/>
