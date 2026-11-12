<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    title,
    note = undefined,
    icon = undefined,
    count = undefined,
    busy = false,
    flush = false,
    children,
    actions,
    footer,
  }: {
    title: string;
    note?: string | undefined;
    icon?: BissIconName | undefined;
    count?: number | undefined;
    busy?: boolean;
    flush?: boolean;
    children?: Snippet;
    actions?: Snippet;
    footer?: Snippet;
  } = $props();
</script>

<section class="biss-home-card" aria-label={title} aria-busy={busy}>
  <header>
    {#if icon}<BissIcon name={icon} />{/if}
    <div class="biss-grow">
      <h2>{title}</h2>
      {#if note}<p>{note}</p>{/if}
    </div>
    {#if count !== undefined}<small>{count}</small>{/if}{#if actions}{@render actions()}{/if}
  </header>
  <div class="biss-home-body" data-flush={flush}>
    {#if children}{@render children()}{/if}
  </div>
  {#if footer}<footer>{@render footer()}</footer>{/if}
</section>
