<script lang="ts">
  import type { Snippet } from 'svelte';
  import { floatPanel } from '../core/dom';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';

  let {
    label,
    disabled = false,
    width = 280,
    children,
  }: { label: string; disabled?: boolean; width?: number; children?: Snippet } = $props();

  const uid = $props.id();
  let panel: HTMLElement | null = $state(null);
</script>

<span class="biss-floating-trigger"
  ><button
    id={uid + '-anchor'}
    type="button"
    class="biss-picker-trigger"
    popovertarget={uid}
    {disabled}
    aria-label={label}
    aria-haspopup="dialog">{label}</button
  ></span
>
<div
  id={uid}
  bind:this={panel}
  popover="auto"
  class="biss-floating"
  role="group"
  aria-label={label}
  tabindex="-1"
  use:floatPanel={{ anchorId: uid + '-anchor', width }}
>
  <div role="dialog" aria-label={label}>
    {#if children}{@render children()}{/if}
  </div>
</div>
