<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissTone } from '../core/types';
  let {
    tone = 'info',
    title,
    children,
    actions,
  }: { tone?: BissTone; title?: string; children?: Snippet; actions?: Snippet } = $props();
</script>

<div
  class="biss-callout"
  class:biss-callout-success={tone === 'success'}
  class:biss-callout-danger={tone === 'danger'}
  class:biss-callout-warning={tone === 'warning'}
  role="status"
>
  <div>
    {#if title}<p class="biss-callout-title">{title}</p>{/if}
    <div class="biss-callout-body">
      {#if children}{@render children()}{/if}
    </div>
  </div>
  {#if actions}{@render actions()}{/if}
</div>
