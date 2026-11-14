<script lang="ts">
  import { BissTabs } from 'biss-ui/svelte';

  let view = $state('active');
  const items = [
    { value: 'active', label: 'Active', count: 12 },
    { value: 'review', label: 'In review', count: 3 },
    { value: 'archived', label: 'Archived' },
  ];
  const panels: Record<string, string> = {
    active: 'Twelve projects are running across three teams.',
    review: 'Three projects are waiting for an ethics review.',
    archived: 'Archived projects stay searchable and read-only.',
  };
</script>

<BissTabs bind:value={view} {items} label="Project views">
  {#snippet children(item)}{panels[item.value]}{/snippet}
</BissTabs>
<p>Selected: {view}</p>
