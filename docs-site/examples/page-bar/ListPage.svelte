<script lang="ts">
  import { BissButton, BissIcon, BissPageBar, BissViewTabs } from 'biss-ui/svelte';

  let view = $state('drafts');
  const views = [
    { key: 'drafts', label: 'Drafts', count: 12 },
    { key: 'submitted', label: 'Submitted', count: 31 },
    { key: 'awarded', label: 'Awarded', count: 9 },
  ];
</script>

<BissPageBar
  title="Grant applications"
  meta="52 in 2026"
  description="Applications from the Law faculty to external funders."
>
  {#snippet actions()}
    <BissButton variant="secondary">Export</BissButton>
    <BissButton><BissIcon name="plus" />New application</BissButton>
  {/snippet}
  {#snippet tabs()}
    <BissViewTabs bind:value={view} items={views} label="Application status" />
  {/snippet}
</BissPageBar>
