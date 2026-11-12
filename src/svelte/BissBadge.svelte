<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissTone } from '../core/types';
  let {
    tone = 'neutral',
    dot = false,
    mono = false,
    children,
  }: { tone?: BissTone; dot?: boolean; mono?: boolean; children?: Snippet } = $props();
</script>

<span
  class="biss-badge"
  class:biss-badge-mono={mono}
  class:biss-badge-success={tone === 'success'}
  class:biss-badge-danger={tone === 'danger'}
  class:biss-badge-warning={tone === 'warning'}
  class:biss-badge-info={tone === 'info'}
  >{#if dot}<span class="biss-badge-dot"></span>{/if}{#if children}{@render children()}{/if}</span
>
