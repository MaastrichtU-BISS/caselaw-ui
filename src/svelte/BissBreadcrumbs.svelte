<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    items,
    label = 'Breadcrumbs',
  }: { items: { label: string; href?: string }[]; label?: string } = $props();
</script>

<nav aria-label={label}>
  <ol class="biss-breadcrumbs">
    {#each items as item, i}<li>
        {#if i}<span class="biss-breadcrumb-sep" aria-hidden="true">/</span
          >{/if}{#if item.href && i < items.length - 1}<a href={item.href}>{item.label}</a
          >{:else}<span aria-current={i === items.length - 1 ? 'page' : undefined}
            >{item.label}</span
          >{/if}
      </li>{/each}
  </ol>
</nav>
