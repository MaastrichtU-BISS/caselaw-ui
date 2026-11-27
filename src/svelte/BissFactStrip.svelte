<script lang="ts">
  import type { BissFactItem } from '../core/types';

  let {
    items,
    label,
    compact = false,
  }: {
    items: BissFactItem[];
    label: string;
    compact?: boolean;
  } = $props();
</script>

<dl class="biss-fact-strip" class:biss-fact-strip-compact={compact} aria-label={label}>
  {#each items as item (item.label)}
    <div class="biss-fact-strip-item">
      <dt class="biss-fact-strip-label">{item.label}</dt>
      <dd class="biss-fact-strip-value" class:biss-fact-strip-mono={item.mono}>
        {#if item.tone}<span class="biss-fact-strip-dot" data-tone={item.tone}></span>{/if}
        {#if item.href}<a href={item.href}>{item.value}</a>{:else}{item.value}{/if}
      </dd>
    </div>
  {/each}
</dl>
