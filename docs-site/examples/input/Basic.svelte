<script lang="ts">
  import { BissField, BissInput } from 'biss-ui/svelte';

  let name = $state('Data governance working group');
  let slug = $derived(
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
  );
</script>

<div style="width: min(100%, 24rem)">
  <BissField label="Team name" hint={`Address: biss.example/teams/${slug || '…'}`}>
    <BissInput bind:value={name} autocomplete="off" />
  </BissField>
</div>
