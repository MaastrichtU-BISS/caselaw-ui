<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  import BissMenu from './BissMenu.svelte';
  import type { BissMenuItem } from '../library-types';
  let {
    label,
    items = [],
    disabled = false,
    moreLabel = 'More ways to add',
    onadd,
    onpick,
  }: {
    label: string;
    items?: BissMenuItem[];
    disabled?: boolean;
    moreLabel?: string;
    onadd?: () => void;
    onpick?: (item: BissMenuItem) => void;
  } = $props();
  type Events = { add: []; pick: [item: BissMenuItem] };
  const handlers = {
    get add() {
      return onadd;
    },
    get pick() {
      return onpick;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<span class="biss-tool-new"
  ><button type="button" class="biss-button" {disabled} onclick={() => emit('add')}
    ><BissIcon name="plus" />{label}</button
  >{#if items.length}<BissMenu
      {items}
      label={moreLabel}
      {disabled}
      onpick={(item) => emit('pick', item)}
    />{/if}</span
>
