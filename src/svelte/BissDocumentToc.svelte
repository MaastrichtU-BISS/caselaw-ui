<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    items,
    label = 'On this page',
  }: {
    items: { id: string; title: string; level?: number; disabled?: boolean }[];
    label?: string;
  } = $props();
</script>

<nav class="biss-document-toc" aria-label={label}>
  {#each items as item (item.id)}<a
      href={item.disabled ? undefined : '#' + item.id}
      aria-disabled={item.disabled}
      style:padding-inline-start={Math.max(0, (item.level ?? 1) - 1) * 14 + 10 + 'px'}
      >{item.title}</a
    >{/each}
</nav>
