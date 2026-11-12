<script lang="ts">
  import type { Snippet } from 'svelte';
  import { floatPanel, listKeys, closePopover } from '../interactions';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  import type { BissPickOption } from '../library-types';

  let {
    label,
    options,
    value = '',
    placeholder = 'Choose…',
    searchable = true,
    searchLabel = 'Search options',
    emptyLabel = 'No matching options',
    disabled = false,
    width = 280,
    onchange,
  }: {
    label: string;
    options: BissPickOption[];
    value?: string;
    placeholder?: string;
    searchable?: boolean;
    searchLabel?: string;
    emptyLabel?: string;
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
  let query = $state('');
  let shown = $derived(options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())));
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
    >{options.find((o) => o.value === value)?.label ?? placeholder}<BissIcon name="chev" /></button
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
  {#if searchable}<input
      class="biss-picker-search"
      bind:value={query}
      aria-label={searchLabel}
      placeholder={searchLabel}
    />{/if}
  <div role="listbox" aria-label={label}>
    {#each shown as option, i (option.value)}{#if option.group && option.group !== shown[i - 1]?.group}<p
          class="biss-picker-option-group"
        >
          {option.group}
        </p>{/if}<button
        type="button"
        role="option"
        class="biss-picker-option"
        data-choice
        aria-selected={value === option.value}
        disabled={option.disabled}
        onclick={() => {
          value = option.value;
          emit('change', value);
          closePopover(panel);
        }}
        ><span class="biss-grow"
          >{option.label}{#if option.description}<small>{option.description}</small>{/if}</span
        >{#if value === option.value}<BissIcon name="check" />{/if}</button
      >{/each}{#if !shown.length}<p class="biss-picker-empty">{emptyLabel}</p>{/if}
  </div>
</div>
