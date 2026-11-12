<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  import BissDialog from './BissDialog.svelte';
  import type { BissSearchItem } from '../library-types';
  import { choiceKeys } from '../interactions';
  let {
    open = false,
    label = 'Search',
    items,
    placeholder = 'Search…',
    emptyLabel = 'No results',
    loading = false,
    loadingLabel = 'Searching…',
    onclose,
    onquery,
    onpick,
  }: {
    open?: boolean;
    label?: string;
    items: BissSearchItem[];
    placeholder?: string;
    emptyLabel?: string;
    loading?: boolean;
    loadingLabel?: string;
    onclose?: () => void;
    onquery?: (value: string) => void;
    onpick?: (item: BissSearchItem) => void;
  } = $props();
  type Events = { close: []; query: [value: string]; pick: [item: BissSearchItem] };
  const handlers = {
    get close() {
      return onclose;
    },
    get query() {
      return onquery;
    },
    get pick() {
      return onpick;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let query = $state('');
  let root: HTMLElement | null = $state(null);
  let shown = $derived(
    items.filter((i) =>
      (i.label + ' ' + (i.description ?? '')).toLowerCase().includes(query.toLowerCase()),
    ),
  );
</script>

<BissDialog {open} title={label} onclose={() => emit('close')}
  ><div bind:this={root} use:choiceKeys role="search" aria-label={label}>
    <input
      class="biss-picker-search"
      bind:value={query}
      aria-label={label}
      {placeholder}
      oninput={() => emit('query', query)}
    />{#if loading}<p role="status">{loadingLabel}</p>{:else}<div class="biss-picker-option-scroll">
        {#each shown as item, i (item.key)}{#if item.group && item.group !== shown[i - 1]?.group}<p
              class="biss-picker-option-group"
            >
              {item.group}
            </p>{/if}<button
            type="button"
            class="biss-picker-option"
            data-choice
            disabled={item.disabled}
            onclick={() => emit('pick', item)}
            >{#if item.icon}<BissIcon name={item.icon} />{/if}<span
              >{item.label}{#if item.description}<small>{item.description}</small>{/if}</span
            ></button
          >{/each}{#if !shown.length}<p>{emptyLabel}</p>{/if}
      </div>{/if}
  </div></BissDialog
>
