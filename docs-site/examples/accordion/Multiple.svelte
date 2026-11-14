<script lang="ts">
  import { BissAccordion, BissBadge } from 'biss-ui/svelte';

  let open = $state<string[]>(['budget']);
  const items = [
    { value: 'budget', title: 'Budget' },
    { value: 'team', title: 'Team' },
  ];
</script>

<BissAccordion bind:value={open} {items} type="multiple">
  {#snippet children(item)}
    {#if item.value === 'budget'}
      €240k awarded · <BissBadge tone="success">62% spent</BissBadge>
    {:else}
      Ada Lovelace, Grace Hopper and Alan Turing.
    {/if}
  {/snippet}
</BissAccordion>
