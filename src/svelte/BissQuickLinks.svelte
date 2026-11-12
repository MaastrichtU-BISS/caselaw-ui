<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import { safeLink } from '../core/collections';
  let {
    items,
    label = 'Quick links',
  }: {
    items: { id: string; label: string; href: string; description?: string; external?: boolean }[];
    label?: string;
  } = $props();
</script>

<nav class="biss-quick-links" aria-label={label}>
  {#each items as item (item.id)}<a
      href={safeLink(item.href)}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      ><BissIcon name={item.external ? 'globe' : 'link'} /><span
        ><b>{item.label}</b>{#if item.description}<small>{item.description}</small>{/if}</span
      ><BissIcon name="chev" /></a
    >{/each}
</nav>
