<script lang="ts">
  import { BissStatusCell } from 'biss-ui/svelte';

  const columns = [
    { label: 'Data collection', color: '#7c3aed' },
    { label: 'Analysis', color: '#0e7490' },
    { label: 'Writing up', color: '#b45309' },
  ];
</script>

{#each columns as column (column.label)}
  <BissStatusCell label={column.label} color={column.color} />
{/each}
