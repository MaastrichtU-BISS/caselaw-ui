<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import { tooltip } from '../core/dom';
  let { label, text, children }: { label: string; text: string; children?: Snippet } = $props();
  const uid = $props.id();
</script>

<span class="biss-tooltip"
  ><button
    type="button"
    class="biss-header-action"
    aria-label={label}
    aria-describedby={uid}
    use:tooltip={{ id: uid }}
    >{#if children}{@render children()}{:else}<BissIcon name="info" />{/if}</button
  ><span id={uid} role="tooltip" popover="manual" class="biss-tooltip-content">{text}</span></span
>
