<script lang="ts">
  import type { Snippet } from 'svelte';
  import { floatPanel, closePopover } from '../core/dom';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import { bissSwatches } from '../core/types';

  let {
    label,
    value = 'blue',
    colors = bissSwatches,
    disabled = false,
    width = 160,
    onchange,
  }: {
    label: string;
    value?: string;
    colors?: { value: string; label: string; color: string }[];
    disabled?: boolean;
    width?: number;
    onchange?: (value: string) => void;
  } = $props();
  type Events = { change: [value: string] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
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
    aria-haspopup="dialog"
    ><i class="biss-color-dot" style:background={colors.find((c) => c.value === value)?.color}
    ></i>{label}</button
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
  <div role="group" aria-label={label} class="biss-swatch-grid">
    {#each colors as color (color.value)}<button
        type="button"
        data-choice
        aria-label={color.label}
        title={color.label}
        aria-pressed={color.value === value}
        style:--swatch={color.color}
        onclick={() => {
          value = color.value;
          emit('change', value);
          closePopover(panel);
        }}><i></i></button
      >{/each}
  </div>
</div>
