<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    items,
    label,
  }: { items: { key: string; label: string; value: string; href?: string }[]; label: string } =
    $props();
</script>

<dl class="biss-property-list" aria-label={label}>
  {#each items as item (item.key)}<div>
      <dt>{item.label}</dt>
      <dd>
        {#if item.href}<a href={item.href}>{item.value}</a>{:else}{item.value}{/if}
      </dd>
    </div>{/each}
</dl>
