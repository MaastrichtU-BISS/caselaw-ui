<script lang="ts">
  import { BissField } from 'biss-ui/svelte';

  let share = $state(40);
</script>

<div style="width: min(100%, 24rem)">
  <BissField label="Time on this project" hint={`${share}% of your contract hours`}>
    {#snippet children({ control })}
      <input {...control} bind:value={share} type="range" min="0" max="100" step="10" />
    {/snippet}
  </BissField>
</div>
