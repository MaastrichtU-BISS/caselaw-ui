<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  let {
    label,
    sort = null,
    sortable = true,
    align = 'start',
    onsort,
    children,
  }: {
    label: string;
    sort?: 'asc' | 'desc' | null;
    sortable?: boolean;
    align?: 'start' | 'end';
    onsort?: (direction: 'asc' | 'desc' | null) => void;
    children?: Snippet;
  } = $props();
  type Events = { sort: [direction: 'asc' | 'desc' | null] };
  const handlers = {
    get sort() {
      return onsort;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<span class="biss-table-head" style:justify-content={align === 'end' ? 'flex-end' : 'flex-start'}
  >{#if sortable}<button
      type="button"
      onclick={() => emit('sort', sort === null ? 'asc' : sort === 'asc' ? 'desc' : null)}
      >{label}{#if sort}<BissIcon name={sort === 'asc' ? 'arrowUp' : 'arrowDown'} />{/if}</button
    >{:else}<span>{label}</span>{/if}{#if children}{@render children()}{/if}</span
>
