<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    name,
    color = '#005CA9',
    x = 0,
    y = 0,
    height = 20,
  }: { name: string; color?: string; x?: number; y?: number; height?: number } = $props();
</script>

<span
  class="biss-presence-cursor"
  style:left={x + 'px'}
  style:top={y + 'px'}
  style:height={height + 'px'}
  style:--cursor-color={color}
  aria-hidden="true"><span>{name}</span></span
>
