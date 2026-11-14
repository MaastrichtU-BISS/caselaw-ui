<script lang="ts">
  import { BissButton, BissIcon, BissViewTabs } from 'biss-ui/svelte';

  const views = [
    { key: 'open', label: 'Open tasks', count: 18 },
    { key: 'mine', label: 'Assigned to me', count: 4 },
    { key: 'done', label: 'Completed', count: 0, disabled: true },
  ];

  let view = $state('open');
</script>

<BissViewTabs bind:value={view} items={views} label="Task views">
  {#snippet end()}
    <BissButton size="sm" variant="ghost" style="margin-left: auto">
      <BissIcon name="plus" />New view
    </BissButton>
  {/snippet}
</BissViewTabs>
