<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissFactItem } from '../core/types';
  import BissFactStrip from './BissFactStrip.svelte';

  let {
    title,
    subtitle,
    facts,
    factsLabel = 'Details',
    variant = 'plain',
    flush = false,
    meta,
    leading,
    actions,
    factsSlot,
    tabs,
    children,
  }: {
    title: string;
    subtitle?: string;
    facts?: BissFactItem[];
    factsLabel?: string;
    variant?: 'plain' | 'band';
    flush?: boolean;
    meta?: Snippet;
    leading?: Snippet;
    actions?: Snippet;
    factsSlot?: Snippet;
    tabs?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<header
  class="biss-entity-header"
  class:biss-entity-header-band={variant === 'band'}
  class:biss-entity-header-flush={flush}
  class:biss-entity-header-has-tabs={Boolean(tabs)}
>
  {#if meta}
    <div class="biss-entity-header-meta">{@render meta()}</div>
  {/if}
  <div class="biss-entity-header-row">
    <div class="biss-entity-header-main">
      {#if leading}
        <div class="biss-entity-header-leading">{@render leading()}</div>
      {/if}
      <div class="biss-entity-header-text">
        <h1 class="biss-entity-header-title">{title}</h1>
        {#if subtitle}<p class="biss-entity-header-subtitle">{subtitle}</p>{/if}
      </div>
    </div>
    {#if actions}
      <div class="biss-entity-header-actions">{@render actions()}</div>
    {/if}
  </div>
  {#if factsSlot || (facts && facts.length > 0)}
    <div class="biss-entity-header-facts">
      {#if factsSlot}
        {@render factsSlot()}
      {:else if facts && facts.length > 0}
        <BissFactStrip items={facts} label={factsLabel} compact />
      {/if}
    </div>
  {/if}
  {#if children}{@render children()}{/if}
  {#if tabs}
    <div class="biss-entity-header-tabs">{@render tabs()}</div>
  {/if}
</header>
