<script lang="ts">
  import { BissGoalBar, BissLineChart, BissWidgetGrid } from 'biss-ui/svelte';

  const widgets = [
    { id: 'publications', title: 'Articles per quarter' },
    { id: 'datasets', title: 'Open datasets' },
  ];

  const articlesPerQuarter = [21, 26, 24, 31, 29, 35, 33, 41];
</script>

<BissWidgetGrid items={widgets} editable={false} label="Faculty research output">
  {#snippet children({ item })}
    {#if item.id === 'publications'}
      <BissLineChart
        values={articlesPerQuarter}
        height={96}
        label="Peer-reviewed articles per quarter, 2025 to 2026"
      />
    {:else}
      <div class="biss-stack biss-stack-sm">
        <span>34 of 40 datasets have a DOI</span>
        <BissGoalBar value={34 / 40} tone="success" label="Datasets with a DOI" />
      </div>
    {/if}
  {/snippet}
</BissWidgetGrid>
