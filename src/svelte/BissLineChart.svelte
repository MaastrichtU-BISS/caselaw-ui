<script lang="ts">
  import type { Snippet } from 'svelte';
  import { lineLayout } from '../chart-layout';
  let {
    values,
    label,
    height = 160,
    color = 'var(--biss-primary)',
  }: { values: number[]; label: string; height?: number; color?: string } = $props();

  let points = $derived(lineLayout(values, 160));
</script>

<div class="biss-chart-scroll">
  <svg
    class="biss-line-chart"
    viewBox="0 0 480 160"
    role="img"
    aria-label={label}
    style:color
    {height}
    ><polyline points={points.map((p) => p.x + ',' + p.y).join(' ')} />{#each points as point}<g
        ><circle cx={point.x} cy={point.y} r="3"><title>{point.value}</title></circle></g
      >{/each}</svg
  >
</div>
