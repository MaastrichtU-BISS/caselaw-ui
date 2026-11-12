<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  import {
    isPickDay,
    dayPlus,
    addMonths,
    keyStep,
    monthGrid,
    parseDay,
    startOfMonth,
    todayDay,
  } from '../date-pick';
  import { tick, untrack } from 'svelte';
  let {
    value = null,
    range = false,
    start = null,
    end = null,
    min = undefined,
    max = undefined,
    label = 'Choose date',
    locale = 'en-GB',
    today = todayDay(),
    previousLabel = 'Previous month',
    nextLabel = 'Next month',
    clearLabel = 'Clear',
    todayLabel = 'Today',
    typeLabel = 'Type a date',
    invalidLabel = 'Enter a valid date',
    onchange,
    onrange,
  }: {
    value?: string | null;
    range?: boolean;
    start?: string | null;
    end?: string | null;
    min?: string | undefined;
    max?: string | undefined;
    label?: string;
    locale?: string;
    today?: string;
    previousLabel?: string;
    nextLabel?: string;
    clearLabel?: string;
    todayLabel?: string;
    typeLabel?: string;
    invalidLabel?: string;
    onchange?: (value: string | null) => void;
    onrange?: (value: { start: string | null; end: string | null }) => void;
  } = $props();
  type Events = {
    change: [value: string | null];
    range: [value: { start: string | null; end: string | null }];
  };
  const handlers = {
    get change() {
      return onchange;
    },
    get range() {
      return onrange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let focusDay = $state(
    untrack(() =>
      isPickDay(value) ? value : isPickDay(start) ? start : isPickDay(today) ? today : todayDay(),
    ),
  );
  let view = $state(untrack(() => startOfMonth(focusDay)));
  let typed = $state('');
  let gridEl: HTMLElement | null = $state(null);
  let parsed = $derived(parseDay(typed, today));
  let grid = $derived(monthGrid(Number(view.slice(0, 4)), Number(view.slice(5, 7))));
  const format = (d: string, o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...o, timeZone: 'UTC' }).format(new Date(d + 'T00:00:00Z'));
  let weekdays = $derived(
    Array.from({ length: 7 }, (_, i) => format(dayPlus('2024-01-01', i), { weekday: 'short' })),
  );
  const disabledDay = (d: string) => (!!min && d < min) || (!!max && d > max);
  const selected = (d: string) => (range ? d === start || d === end : d === value);
  function choose(d: string) {
    if (disabledDay(d)) return;
    focusDay = d;
    view = startOfMonth(d);
    if (range) {
      if (!start || end) emit('range', { start: d, end: null });
      else emit('range', { start: d < start ? d : start, end: d < start ? start : d });
    } else emit('change', d);
  }
  async function gridKey(e: KeyboardEvent) {
    const d = keyStep(focusDay, e.key, e.shiftKey);
    if (!d) return;
    e.preventDefault();
    if (disabledDay(d)) return;
    focusDay = d;
    view = startOfMonth(d);
    await tick();
    gridEl?.querySelector<HTMLElement>('[data-day="' + d + '"]')?.focus();
  }
  $effect(() => {
    if (isPickDay(value)) {
      focusDay = value;
      view = startOfMonth(value);
    }
  });
</script>

<div class="biss-date-picker">
  <input
    class="biss-picker-search"
    bind:value={typed}
    aria-label={typeLabel}
    placeholder={typeLabel}
    aria-invalid={!!typed && !parsed}
    onkeydown={(e) => {
      if (e.key === 'Enter' && parsed) {
        e.preventDefault();
        choose(parsed);
      }
    }}
  />{#if typed && !parsed}<p class="biss-date-error" role="status">{invalidLabel}</p>{/if}
  <header>
    <b aria-live="polite">{format(view, { month: 'long', year: 'numeric' })}</b><button
      type="button"
      class="biss-header-action"
      aria-label={previousLabel}
      onclick={() => (view = addMonths(view, -1))}><BissIcon name="chevLeft" /></button
    ><button
      type="button"
      class="biss-header-action"
      aria-label={nextLabel}
      onclick={() => (view = addMonths(view, 1))}><BissIcon name="chev" /></button
    >
  </header>
  <table bind:this={gridEl} role="grid" aria-label={label} onkeydown={gridKey}>
    <thead
      ><tr
        >{#each weekdays as d}<th scope="col">{d}</th>{/each}</tr
      ></thead
    ><tbody
      >{#each grid as row}<tr
          >{#each row as cell (cell.day)}<td role="gridcell" aria-selected={selected(cell.day)}
              ><button
                type="button"
                data-day={cell.day}
                data-out={cell.out}
                data-selected={selected(cell.day)}
                data-range={!!start && !!end && cell.day > start && cell.day < end}
                tabindex={cell.day === focusDay ? 0 : -1}
                aria-label={format(cell.day, { day: 'numeric', month: 'long', year: 'numeric' })}
                aria-current={cell.day === today ? 'date' : undefined}
                disabled={disabledDay(cell.day)}
                onclick={() => choose(cell.day)}
                onfocus={() => (focusDay = cell.day)}>{Number(cell.day.slice(8))}</button
              ></td
            >{/each}</tr
        >{/each}</tbody
    >
  </table>
  <footer>
    <button
      type="button"
      class="biss-text-button"
      disabled={disabledDay(today)}
      onclick={() => choose(today)}>{todayLabel}</button
    ><button
      type="button"
      class="biss-text-button"
      onclick={() => {
        emit('change', null);
        emit('range', { start: null, end: null });
      }}>{clearLabel}</button
    >
  </footer>
</div>
