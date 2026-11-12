<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import { moveItem } from '../core/collections';
  let {
    items,
    label = 'Dashboard widgets',
    editable = true,
    upLabel = 'Move earlier',
    downLabel = 'Move later',
    onchange,
    children,
  }: {
    items: { id: string; title: string; span?: number }[];
    label?: string;
    editable?: boolean;
    upLabel?: string;
    downLabel?: string;
    onchange?: (items: { id: string; title: string; span?: number }[]) => void;
    children?: Snippet<[{ item: { id: string; title: string; span?: number }; index: number }]>;
  } = $props();
  type Events = { change: [items: { id: string; title: string; span?: number }[]] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  function drop(e: DragEvent, index: number) {
    e.preventDefault();
    if (!editable) return;
    const from = items.findIndex(
      (i) => i.id === e.dataTransfer?.getData('application/x-biss-widget'),
    );
    if (from >= 0) emit('change', moveItem(items, from, index - from));
  }
</script>

<div class="biss-widget-grid" role="group" aria-label={label}>
  {#each items as item, i (item.id)}<section
      style:grid-column={'span ' + Math.max(1, Math.min(2, item.span ?? 1))}
      ondragover={(e) => e.preventDefault()}
      ondrop={(e) => drop(e, i)}
      role="group"
      aria-label={item.title}
    >
      <header>
        <h3>{item.title}</h3>
        {#if editable}<span
            ><button
              type="button"
              class="biss-header-action"
              aria-label={upLabel + ' ' + item.title}
              disabled={i === 0}
              onclick={() => emit('change', moveItem(items, i, -1))}
              ><BissIcon name="arrowUp" /></button
            ><button
              type="button"
              class="biss-header-action"
              aria-label={downLabel + ' ' + item.title}
              disabled={i === items.length - 1}
              onclick={() => emit('change', moveItem(items, i, 1))}
              ><BissIcon name="arrowDown" /></button
            ><button
              type="button"
              class="biss-header-action"
              aria-label={'Drag ' + item.title}
              draggable="true"
              ondragstart={(e) => e.dataTransfer?.setData('application/x-biss-widget', item.id)}
              ><BissIcon name="grip" /></button
            ></span
          >{/if}
      </header>
      <div class="biss-widget-content">
        {#if children}{@render children({ item, index: i })}{/if}
      </div>
    </section>{/each}
</div>
