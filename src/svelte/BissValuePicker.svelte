<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissPickOption } from '../core/types';
  import { toggleValue } from '../core/format';
  let {
    options,
    selected = $bindable([]),
    label,
    negate = $bindable(false),
    canNegate = false,
    searchLabel = 'Search values',
    clearLabel = 'Clear',
    isLabel = 'Is',
    isNotLabel = 'Is not',
    emptyLabel = 'No matching values',
    onchange,
    onnegate,
  }: {
    options: BissPickOption[];
    selected?: string[];
    label: string;
    negate?: boolean;
    canNegate?: boolean;
    searchLabel?: string;
    clearLabel?: string;
    isLabel?: string;
    isNotLabel?: string;
    emptyLabel?: string;
    onchange?: (value: string[]) => void;
    onnegate?: (value: boolean) => void;
  } = $props();
  type Events = { change: [value: string[]]; negate: [value: boolean] };
  const handlers = {
    get change() {
      return onchange;
    },
    get negate() {
      return onnegate;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let query = $state('');
  let shown = $derived(options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())));
</script>

<div class="biss-value-picker">
  <header>
    <b>{label}</b>{#if canNegate}<span class="biss-segmented"
        ><button
          type="button"
          aria-pressed={!negate}
          onclick={() => {
            negate = false;
            emit('negate', false);
          }}>{isLabel}</button
        ><button
          type="button"
          aria-pressed={negate}
          onclick={() => {
            negate = true;
            emit('negate', true);
          }}>{isNotLabel}</button
        ></span
      >{/if}
  </header>
  <input
    class="biss-picker-search"
    bind:value={query}
    placeholder={searchLabel}
    aria-label={searchLabel}
  />
  <div class="biss-picker-option-scroll" role="group" aria-label={label}>
    {#each shown as option (option.value)}<label class="biss-picker-option"
        ><input
          type="checkbox"
          checked={selected.includes(option.value)}
          disabled={option.disabled}
          onchange={() => {
            selected = toggleValue(selected, option.value);
            emit('change', selected);
          }}
        />{#if option.color}<i class="biss-color-dot" style:background={option.color}></i>{/if}<span
          class="biss-grow">{option.label}</span
        >{#if option.count !== undefined}<small>{option.count}</small>{/if}</label
      >{/each}{#if !shown.length}<p>{emptyLabel}</p>{/if}
  </div>
  <footer>
    <span>{selected.length}</span><button
      type="button"
      class="biss-text-button"
      onclick={() => {
        selected = [];
        emit('change', []);
      }}>{clearLabel}</button
    >
  </footer>
</div>
