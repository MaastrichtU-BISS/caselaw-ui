<script lang="ts">
  import { BissButton, BissEmptyState, BissInput } from 'biss-ui/svelte';

  const datasets = ['Court decisions 2015–2024', 'Parliamentary questions', 'EU regulations corpus'];
  let query = $state('tax tribunal');

  let matches = $derived(
    datasets.filter((name) => name.toLowerCase().includes(query.toLowerCase())),
  );
</script>

<BissInput bind:value={query} type="search" aria-label="Search datasets" placeholder="Search datasets" />
{#if matches.length}
  <ul>
    {#each matches as name (name)}<li>{name}</li>{/each}
  </ul>
{:else}
  <BissEmptyState title="No datasets match" copy={`Nothing is called “${query}”.`}>
    <BissButton variant="secondary" size="sm" onclick={() => (query = '')}>Clear search</BissButton>
  </BissEmptyState>
{/if}
