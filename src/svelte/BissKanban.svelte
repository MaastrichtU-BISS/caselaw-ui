<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import BissAvatar from './BissAvatar.svelte';
  import BissSelectPicker from './BissSelectPicker.svelte';
  import type { BissBoardLane, BissBoardCard } from '../core/types';
  let {
    lanes,
    cards,
    label,
    readonly = false,
    addLabel = 'Add item',
    moveLabel = 'Move to lane',
    onopen,
    onmove,
    onadd,
  }: {
    lanes: BissBoardLane[];
    cards: BissBoardCard[];
    label: string;
    readonly?: boolean;
    addLabel?: string;
    moveLabel?: string;
    onopen?: (id: string) => void;
    onmove?: (value: { id: string; lane: string }) => void;
    onadd?: (lane: string) => void;
  } = $props();
  type Events = {
    open: [id: string];
    move: [value: { id: string; lane: string }];
    add: [lane: string];
  };
  const handlers = {
    get open() {
      return onopen;
    },
    get move() {
      return onmove;
    },
    get add() {
      return onadd;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  function drag(e: DragEvent, id: string) {
    e.dataTransfer?.setData('application/x-biss-card', id);
  }
  function drop(e: DragEvent, lane: string) {
    e.preventDefault();
    if (readonly) return;
    const id = e.dataTransfer?.getData('application/x-biss-card');
    if (id && cards.some((c) => c.id === id)) emit('move', { id, lane });
  }
</script>

<div class="biss-kanban" role="group" aria-label={label}>
  {#each lanes as lane (lane.id)}<section
      class="biss-kanban-lane"
      ondragover={(e) => e.preventDefault()}
      ondrop={(e) => drop(e, lane.id)}
      role="group"
      aria-label={lane.label}
    >
      <header>
        <i class="biss-color-dot" style:background={lane.color ?? 'var(--biss-primary)'}></i>
        <h3>{lane.label}</h3>
        <small>{cards.filter((c) => c.lane === lane.id).length}</small>
      </header>
      {#each cards.filter((c) => c.lane === lane.id) as card (card.id)}<article
          draggable={!readonly}
          ondragstart={(e) => drag(e, card.id)}
        >
          <button type="button" class="biss-kanban-title" onclick={() => emit('open', card.id)}
            >{card.title}</button
          >{#if card.description}<p>{card.description}</p>{/if}
          <footer>
            {#if card.owner}<BissAvatar name={card.owner} size={20} />{/if}<small
              >{card.due ?? ''}</small
            >
          </footer>
          {#if !readonly}<BissSelectPicker
              label={moveLabel + ' ' + card.title}
              value={lane.id}
              options={lanes.map((l) => ({ value: l.id, label: l.label }))}
              onchange={(value) => emit('move', { id: card.id, lane: value })}
            />{/if}
        </article>{/each}{#if !readonly}<button
          type="button"
          class="biss-table-add"
          onclick={() => emit('add', lane.id)}><BissIcon name="plus" />{addLabel}</button
        >{/if}
    </section>{/each}
</div>
