<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    title,
    note = undefined,
    accent = 'var(--biss-primary)',
    source = undefined,
    sourceLabel = 'View records',
    children,
    actions,
    footer,
  }: {
    title: string;
    note?: string | undefined;
    accent?: string;
    source?: string | undefined;
    sourceLabel?: string;
    children?: Snippet;
    actions?: Snippet;
    footer?: Snippet;
  } = $props();
</script>

<section class="biss-data-tile">
  <header>
    <i class="biss-color-dot" style:background={accent}></i>
    <div class="biss-grow">
      <h3>{title}</h3>
      {#if note}<p>{note}</p>{/if}
    </div>
    {#if actions}{@render actions()}{/if}
  </header>
  <div class="biss-data-tile-body">
    {#if children}{@render children()}{/if}
  </div>
  {#if source || footer}<footer>
      {#if footer}{@render footer()}{/if}{#if source}<a href={source}
          >{sourceLabel}<BissIcon name="chev" /></a
        >{/if}
    </footer>{/if}
</section>
