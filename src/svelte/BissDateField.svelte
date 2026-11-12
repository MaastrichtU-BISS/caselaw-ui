<script lang="ts">
  import type { Snippet } from 'svelte';
  import { floatPanel, closePopover } from '../core/dom';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import BissDatePicker from './BissDatePicker.svelte';

  let {
    label,
    value = null,
    placeholder = 'Choose date',
    min = undefined,
    max = undefined,
    locale = 'en-GB',
    disabled = false,
    width = 300,
    onchange,
  }: {
    label: string;
    value?: string | null;
    placeholder?: string;
    min?: string | undefined;
    max?: string | undefined;
    locale?: string;
    disabled?: boolean;
    width?: number;
    onchange?: (value: string | null) => void;
  } = $props();
  type Events = { change: [value: string | null] };
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
    aria-haspopup="dialog"><BissIcon name="cal" />{value ?? placeholder}</button
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
  <BissDatePicker
    {value}
    {label}
    {min}
    {max}
    {locale}
    onchange={(v) => {
      value = v;
      emit('change', v);
      closePopover(panel);
    }}
  />
</div>
