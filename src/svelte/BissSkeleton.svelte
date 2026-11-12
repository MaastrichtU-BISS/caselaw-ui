<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    lines = 1,
    height = '14px',
    width = '100%',
    gap = '10px',
  }: { lines?: number; height?: string; width?: string; gap?: string } = $props();
</script>

<div style:display="grid" style:gap aria-hidden="true">
  {#each Array(Math.max(0, Math.min(50, lines))) as _, i}<div
      class="biss-skeleton"
      style:height
      style:width={i === lines - 1 && lines > 1 ? '62%' : width}
    ></div>{/each}
</div>
