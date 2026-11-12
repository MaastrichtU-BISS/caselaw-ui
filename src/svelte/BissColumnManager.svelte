<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import type { BissColumn } from '../core/types';
  import { moveItem } from '../core/collections';
  let {
    columns,
    label = 'Columns',
    showLabel = 'Show',
    pinLabel = 'Pin',
    widthLabel = 'Width',
    upLabel = 'Move up',
    downLabel = 'Move down',
    onchange,
  }: {
    columns: BissColumn[];
    label?: string;
    showLabel?: string;
    pinLabel?: string;
    widthLabel?: string;
    upLabel?: string;
    downLabel?: string;
    onchange?: (columns: BissColumn[]) => void;
  } = $props();
  type Events = { change: [columns: BissColumn[]] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  function patch(key: string, p: Partial<BissColumn>) {
    emit(
      'change',
      columns.map((c) => (c.key === key ? { ...c, ...p } : c)),
    );
  }
</script>

<section class="biss-column-manager" aria-label={label}>
  <h3>{label}</h3>
  {#each columns as column, i (column.key)}<div class="biss-editor-row">
      <label class="biss-checkbox"
        ><input
          type="checkbox"
          checked={column.visible}
          disabled={column.locked}
          aria-label={showLabel + ' ' + column.label}
          onchange={() => patch(column.key, { visible: !column.visible })}
        /><span>{column.label}</span></label
      ><label class="biss-column-width"
        >{widthLabel}<input
          type="number"
          class="biss-input"
          value={column.width ?? 160}
          min="60"
          max="800"
          aria-label={widthLabel + ' ' + column.label}
          onchange={(e) =>
            patch(column.key, {
              width: Math.max(60, Math.min(800, Number(e.currentTarget.value) || 160)),
            })}
        /></label
      ><label class="biss-checkbox"
        ><input
          type="checkbox"
          checked={column.pinned}
          aria-label={pinLabel + ' ' + column.label}
          onchange={() => patch(column.key, { pinned: !column.pinned })}
        /><span>{pinLabel}</span></label
      ><button
        class="biss-header-action"
        type="button"
        disabled={i === 0}
        aria-label={upLabel + ' ' + column.label}
        onclick={() => emit('change', moveItem(columns, i, -1))}><BissIcon name="arrowUp" /></button
      ><button
        class="biss-header-action"
        type="button"
        disabled={i === columns.length - 1}
        aria-label={downLabel + ' ' + column.label}
        onclick={() => emit('change', moveItem(columns, i, 1))}
        ><BissIcon name="arrowDown" /></button
      >
    </div>{/each}
</section>
