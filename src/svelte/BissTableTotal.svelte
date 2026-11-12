<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    value,
    note = undefined,
  }: { label: string; value: string | number; note?: string | undefined } = $props();
</script>

<span class="biss-table-total" title={note}><small>{label}</small><b>{value}</b></span>
