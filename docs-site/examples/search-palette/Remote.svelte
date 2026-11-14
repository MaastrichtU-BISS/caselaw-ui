<script lang="ts">
  import { BissButton, BissSearchPalette, type BissSearchItem } from 'biss-ui/svelte';

  const rulings: BissSearchItem[] = [
    { key: '1', label: 'Schrems II', description: 'C-311/18 · Court of Justice, 2020' },
    { key: '2', label: 'Google Spain', description: 'C-131/12 · Court of Justice, 2014' },
    { key: '3', label: 'Urgenda', description: 'ECLI:NL:HR:2019:2007 · Supreme Court, 2019' },
    { key: '4', label: 'Digital Rights Ireland', description: 'C-293/12 · Court of Justice, 2014' },
  ];
  let open = $state(false);
  let loading = $state(false);
  let results = $state<BissSearchItem[]>([]);
  let timer: ReturnType<typeof setTimeout> | undefined;

  function search(query: string) {
    clearTimeout(timer);
    loading = true;
    timer = setTimeout(() => {
      // Replace with a request to your search endpoint.
      const q = query.toLowerCase();
      results = rulings.filter((r) => (r.label + r.description).toLowerCase().includes(q));
      loading = false;
    }, 500);
  }
</script>

<BissButton variant="secondary" onclick={() => (open = true)}>Find a ruling</BissButton>
<BissSearchPalette
  {open}
  items={results}
  {loading}
  label="Find a ruling"
  placeholder="Case name or number"
  emptyLabel="Type to search 48,000 rulings"
  onquery={search}
  onpick={() => (open = false)}
  onclose={() => (open = false)}
/>
