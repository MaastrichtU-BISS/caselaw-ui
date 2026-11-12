<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    tone = 'info',
    title = undefined,
    icon = 'info',
    children,
  }: {
    tone?: 'neutral' | 'info' | 'warning' | 'danger' | 'success';
    title?: string | undefined;
    icon?: BissIconName;
    children?: Snippet;
  } = $props();
</script>

<aside class="biss-document-callout" data-tone={tone}>
  <BissIcon name={icon} />
  <div>
    {#if title}<h3>{title}</h3>{/if}{#if children}{@render children()}{/if}
  </div>
</aside>
