<script lang="ts">
  import type { Snippet } from 'svelte';
  import { floatPanel, listKeys, closePopover } from '../interactions';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  import type { BissMenuItem } from '../library-types';

  let {
    label,
    items,
    searchable = false,
    searchLabel = 'Search actions',
    backLabel = 'Back',
    emptyLabel = 'No matching actions',
    disabled = false,
    width = 280,
    onpick,
  }: {
    label: string;
    items: BissMenuItem[];
    searchable?: boolean;
    searchLabel?: string;
    backLabel?: string;
    emptyLabel?: string;
    disabled?: boolean;
    width?: number;
    onpick?: (item: BissMenuItem) => void;
  } = $props();
  type Events = { pick: [item: BissMenuItem] };
  const handlers = {
    get pick() {
      return onpick;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  const uid = $props.id();
  let panel: HTMLElement | null = $state(null);
  let query = $state('');
  let path: BissMenuItem[] = $state([]);
  let shown = $derived(
    (path.at(-1)?.children ?? items).filter((i) =>
      i.label.toLowerCase().includes(query.toLowerCase()),
    ),
  );
  function choose(item: BissMenuItem) {
    if (item.disabled) return;
    if (item.children) {
      path = [...path, item];
      query = '';
      queueMicrotask(() => panel?.querySelector<HTMLElement>('[data-choice]')?.focus());
      return;
    }
    closePopover(panel);
    emit('pick', item);
    if (item.href) location.assign(item.href);
  }
</script>

<span class="biss-floating-trigger"
  ><button
    id={uid + '-anchor'}
    type="button"
    class="biss-picker-trigger"
    popovertarget={uid}
    {disabled}
    aria-label={label}
    aria-haspopup="menu">{label}</button
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
  use:floatPanel={{
    anchorId: uid + '-anchor',
    width,
    onopen: () => {
      query = '';
      path = [];
    },
  }}
>
  {#if searchable}<input
      class="biss-picker-search"
      bind:value={query}
      aria-label={searchLabel}
      placeholder={searchLabel}
    />{/if}
  <div role="menu" aria-label={label}>
    {#if path.length}<button
        type="button"
        class="biss-picker-option"
        data-choice
        onclick={() => {
          path = path.slice(0, -1);
          query = '';
        }}><BissIcon name="chevLeft" />{backLabel}</button
      >{/if}{#each shown as item (item.key)}{#if item.separator}<hr />{/if}<button
        type="button"
        class="biss-picker-option"
        data-choice
        role={item.checked === undefined ? 'menuitem' : 'menuitemcheckbox'}
        aria-checked={item.checked}
        aria-haspopup={item.children ? 'menu' : undefined}
        disabled={item.disabled}
        data-danger={item.danger}
        onclick={() => choose(item)}
        >{#if item.icon}<BissIcon name={item.icon} />{/if}<span class="biss-grow"
          >{item.label}{#if item.description}<small>{item.description}</small>{/if}</span
        >{#if item.checked}<BissIcon name="check" />{/if}{#if item.children}<BissIcon
            name="chev"
          />{/if}{#if item.hint}<kbd>{item.hint}</kbd>{/if}</button
      >{/each}{#if !shown.length}<p class="biss-picker-empty">{emptyLabel}</p>{/if}
  </div>
</div>
