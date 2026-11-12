<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import { formatDay } from '../core/collections';
  let {
    items,
    label = 'Upcoming deadlines',
    locale = 'en-GB',
    onopen,
  }: {
    items: { id: string; title: string; day: string; context?: string; overdue?: boolean }[];
    label?: string;
    locale?: string;
    onopen?: (id: string) => void;
  } = $props();
  type Events = { open: [id: string] };
  const handlers = {
    get open() {
      return onopen;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<section class="biss-deadline-list" aria-label={label}>
  {#each items as item (item.id)}<button
      type="button"
      data-overdue={item.overdue}
      onclick={() => emit('open', item.id)}
      ><time datetime={item.day}>{formatDay(item.day, locale)}</time><span
        ><b>{item.title}</b>{#if item.context}<small>{item.context}</small>{/if}</span
      ><BissIcon name="chev" /></button
    >{/each}
</section>
