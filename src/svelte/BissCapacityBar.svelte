<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissGoalBar from './BissGoalBar.svelte';
  let {
    allocated,
    available,
    label,
    locale = 'en-GB',
  }: { allocated: number; available: number | null; label: string; locale?: string } = $props();

  let nf = $derived(new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }));
</script>

<span class="biss-capacity" data-over={available !== null && allocated > available}
  ><BissGoalBar
    value={available === null || available <= 0 ? null : allocated / available}
    {label}
    tone={available !== null && allocated > available ? 'danger' : 'success'}
  /><b
    >{nf.format(allocated)}{#if available !== null}<small> / {nf.format(available)}</small>{/if}</b
  ></span
>
