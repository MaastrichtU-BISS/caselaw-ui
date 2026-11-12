<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import { moveItem } from '../core/collections';
  let {
    items,
    label = 'Meeting agenda',
    readonly = false,
    addLabel = 'Add agenda item',
    completeLabel = 'Covered',
    moveUpLabel = 'Move earlier',
    moveDownLabel = 'Move later',
    onchange,
    onadd,
  }: {
    items: { id: string; title: string; minutes?: number; done: boolean }[];
    label?: string;
    readonly?: boolean;
    addLabel?: string;
    completeLabel?: string;
    moveUpLabel?: string;
    moveDownLabel?: string;
    onchange?: (items: { id: string; title: string; minutes?: number; done: boolean }[]) => void;
    onadd?: (title: string) => void;
  } = $props();
  type Events = {
    change: [items: { id: string; title: string; minutes?: number; done: boolean }[]];
    add: [title: string];
  };
  const handlers = {
    get change() {
      return onchange;
    },
    get add() {
      return onadd;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let draft = $state('');
</script>

<section class="biss-agenda" aria-label={label}>
  <h3>{label}</h3>
  <ol>
    {#each items as item, i (item.id)}<li>
        <input
          type="checkbox"
          checked={item.done}
          disabled={readonly}
          aria-label={completeLabel + ' ' + item.title}
          onchange={() =>
            emit(
              'change',
              items.map((v) => (v.id === item.id ? { ...v, done: !v.done } : v)),
            )}
        /><span>{item.title}</span>{#if item.minutes}<small>{item.minutes} min</small
          >{/if}{#if !readonly}<button
            type="button"
            class="biss-header-action"
            aria-label={moveUpLabel + ' ' + item.title}
            disabled={i === 0}
            onclick={() => emit('change', moveItem(items, i, -1))}
            ><BissIcon name="arrowUp" /></button
          ><button
            type="button"
            class="biss-header-action"
            aria-label={moveDownLabel + ' ' + item.title}
            disabled={i === items.length - 1}
            onclick={() => emit('change', moveItem(items, i, 1))}
            ><BissIcon name="arrowDown" /></button
          >{/if}
      </li>{/each}
  </ol>
  {#if !readonly}<form
      onsubmit={(e) => {
        e.preventDefault();
        if (draft.trim()) emit('add', draft.trim());
      }}
    >
      <input
        class="biss-input"
        bind:value={draft}
        aria-label={addLabel}
        placeholder={addLabel}
      /><button type="submit" class="biss-text-button" disabled={!draft.trim()}>{addLabel}</button>
    </form>{/if}
</section>
