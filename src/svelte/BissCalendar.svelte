<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import { monthGrid } from '../core/date';
  import type { BissCalendarItem } from '../core/types';
  let {
    month,
    items,
    label,
    locale = 'en-GB',
    readonly = false,
    addLabel = 'Add on',
    onopen,
    onadd,
  }: {
    month: string;
    items: BissCalendarItem[];
    label: string;
    locale?: string;
    readonly?: boolean;
    addLabel?: string;
    onopen?: (id: string) => void;
    onadd?: (day: string) => void;
  } = $props();
  type Events = { open: [id: string]; add: [day: string] };
  const handlers = {
    get open() {
      return onopen;
    },
    get add() {
      return onadd;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let days = $derived(monthGrid(Number(month.slice(0, 4)), Number(month.slice(5, 7))).flat());
  const format = (d: string) =>
    new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric' }).format(
      new Date(d + 'T12:00:00Z'),
    );
</script>

<div class="biss-calendar" role="group" aria-label={label}>
  {#each days as cell (cell.day)}<section data-out={cell.out}>
      <header>
        <time datetime={cell.day}>{format(cell.day)}</time>{#if !readonly}<button
            type="button"
            class="biss-header-action"
            aria-label={addLabel + ' ' + cell.day}
            onclick={() => emit('add', cell.day)}><BissIcon name="plus" /></button
          >{/if}
      </header>
      {#each items.filter((i) => i.day === cell.day) as item (item.id)}<button
          type="button"
          class="biss-calendar-item"
          style:color={item.color}
          onclick={() => emit('open', item.id)}>{item.title}</button
        >{/each}
    </section>{/each}
</div>
