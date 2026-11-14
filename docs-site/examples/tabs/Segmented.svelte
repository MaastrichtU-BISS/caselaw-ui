<script lang="ts">
  import { BissTabs } from 'biss-ui/svelte';

  let mode = $state('chart');
  const items = [
    { value: 'chart', label: 'Chart' },
    { value: 'table', label: 'Table' },
    { value: 'export', label: 'Export', disabled: true },
  ];
</script>

<BissTabs bind:value={mode} {items} label="Display" variant="segmented" size="sm">
  {#snippet children(item)}Publications per quarter, as a {item.value === 'chart'
      ? 'line chart'
      : 'table'}.{/snippet}
</BissTabs>
