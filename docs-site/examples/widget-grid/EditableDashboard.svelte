<script lang="ts">
  import {
    BissBarChart,
    BissGoalBar,
    BissWidgetGrid,
    type BissChartPoint,
  } from 'biss-ui/svelte';

  let widgets = $state([
    { id: 'submissions', title: 'Ethics submissions', span: 2 },
    { id: 'budget', title: 'Budget spent' },
    { id: 'deadlines', title: 'Upcoming deadlines' },
  ]);

  const submissions: BissChartPoint[] = [
    { label: 'Jun', value: 18, compare: 3 },
    { label: 'Jul', value: 12, compare: 2 },
    { label: 'Aug', value: 9, compare: 1 },
    { label: 'Sep', value: 27, compare: 6 },
    { label: 'Oct', value: 31, compare: 5 },
    { label: 'Nov', value: 22, compare: 4 },
  ];

  const deadlines = [
    { id: 'veni', name: 'Veni pre-proposal', due: '2 Dec' },
    { id: 'erc', name: 'ERC mid-term report', due: '15 Dec' },
    { id: 'dmp', name: 'Data management plan', due: '9 Jan' },
  ];
</script>

<BissWidgetGrid items={widgets} onchange={(next) => (widgets = next)}>
  {#snippet children({ item })}
    {#if item.id === 'submissions'}
      <BissBarChart points={submissions} seriesLabel="Submitted" compareLabel="Returned" />
    {:else if item.id === 'budget'}
      <div class="biss-stack biss-stack-sm">
        <span>€460,200 of €742,000</span>
        <BissGoalBar value={0.62} expected={0.58} label="Project budget spent" />
      </div>
    {:else if item.id === 'deadlines'}
      <ul class="deadlines">
        {#each deadlines as deadline (deadline.id)}
          <li>{deadline.name} <span class="biss-muted">{deadline.due}</span></li>
        {/each}
      </ul>
    {/if}
  {/snippet}
</BissWidgetGrid>

<style>
  .deadlines {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .deadlines li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
</style>
