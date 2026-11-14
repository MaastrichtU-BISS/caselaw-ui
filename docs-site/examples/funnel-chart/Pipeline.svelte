<script lang="ts">
  import { BissFunnelChart, type BissFunnelStage } from 'biss-ui/svelte';

  const stages: BissFunnelStage[] = [
    { key: 'ideas', label: 'Ideas', value: 48, note: 'Logged by researchers' },
    { key: 'drafts', label: 'In preparation', value: 31 },
    { key: 'submitted', label: 'Submitted', value: 22 },
    { key: 'shortlisted', label: 'Shortlisted', value: 9 },
    { key: 'awarded', label: 'Awarded', value: 5, display: '5 · €3.1M' },
  ];
  let opened = $state('');
</script>

<div class="example-chart">
  <BissFunnelChart
    label="Grant pipeline 2026"
    {stages}
    interactive
    onpick={(stage) => (opened = stage.label)}
  />
  <p role="status" class="example-status">
    {opened ? `Showing grants in “${opened}”` : 'Choose a stage to see its grants.'}
  </p>
</div>

<style>
  .example-chart {
    max-width: 760px;
  }
  .example-status {
    margin: 12px 8px 0;
    font-size: 13px;
    color: var(--biss-muted);
  }
</style>
