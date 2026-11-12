<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissPopover from './BissPopover.svelte';
  import BissColumnManager from './BissColumnManager.svelte';
  import BissTableHead from './BissTableHead.svelte';
  import type { BissColumn } from '../core/types';
  import { sortRows } from '../core/collections';
  import { toggleValue } from '../core/format';
  import { resizeHandle } from '../core/dom';
  let {
    selectedLabel = '{count} selected',
    rowLabel = 'Select {id}',
    resizeLabel = 'Resize {label}',
    columnLabels = {},

    rows,
    columns,
    selected = [],
    sortKey = '',
    sortDirection = 'asc',
    label,
    emptyLabel = 'No records',
    columnsLabel = 'Customize columns',
    selectAllLabel = 'Select all rows',
    oncolumns,
    onselect,
    onsort,
    cell,
  }: {
    selectedLabel?: string;
    rowLabel?: string;
    resizeLabel?: string;
    columnLabels?: {
      label?: string;
      showLabel?: string;
      pinLabel?: string;
      widthLabel?: string;
      upLabel?: string;
      downLabel?: string;
    };

    rows: ({ id: string } & Record<string, unknown>)[];
    columns: BissColumn[];
    selected?: string[];
    sortKey?: string;
    sortDirection?: 'asc' | 'desc';
    label: string;
    emptyLabel?: string;
    columnsLabel?: string;
    selectAllLabel?: string;
    oncolumns?: (columns: BissColumn[]) => void;
    onselect?: (ids: string[]) => void;
    onsort?: (value: { key: string; direction: 'asc' | 'desc' }) => void;
    cell?: Snippet<
      [{ row: { id: string } & Record<string, unknown>; column: BissColumn; value: unknown }]
    >;
  } = $props();
  type Events = {
    columns: [columns: BissColumn[]];
    select: [ids: string[]];
    sort: [value: { key: string; direction: 'asc' | 'desc' }];
  };
  const handlers = {
    get columns() {
      return oncolumns;
    },
    get select() {
      return onselect;
    },
    get sort() {
      return onsort;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let visible = $derived(columns.filter((c) => c.visible));
  let sorted = $derived(sortRows(rows, sortKey, sortDirection));
  const pinLeft = (index: number) =>
    44 +
    visible
      .slice(0, index)
      .filter((c) => c.pinned)
      .reduce((sum, c) => sum + (c.width ?? 160), 0);
</script>

<section class="biss-data-grid" aria-label={label}>
  <header>
    <span>{selectedLabel.replace('{count}', String(selected.length))}</span><BissPopover
      label={columnsLabel}
      width={480}
      ><BissColumnManager
        {...columnLabels}
        {columns}
        onchange={(value) => emit('columns', value)}
      /></BissPopover
    >
  </header>
  <div class="biss-table-wrap">
    <table class="biss-table">
      <thead
        ><tr
          ><th
            ><input
              type="checkbox"
              aria-label={selectAllLabel}
              checked={rows.length > 0 && rows.every((r) => selected.includes(r.id))}
              onchange={(e) =>
                emit(
                  'select',
                  e.currentTarget.checked
                    ? Array.from(new Set([...selected, ...rows.map((r) => r.id)]))
                    : selected.filter((id) => !rows.some((r) => r.id === id)),
                )}
            /></th
          >{#each visible as column, i (column.key)}<th
              style:width={(column.width ?? 160) + 'px'}
              style:min-width={(column.width ?? 160) + 'px'}
              style:position={column.pinned ? 'sticky' : undefined}
              style:left={column.pinned ? pinLeft(i) + 'px' : undefined}
              style:z-index={column.pinned ? 2 : undefined}
              aria-sort={sortKey === column.key
                ? sortDirection === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'}
              ><BissTableHead
                label={column.label}
                sort={sortKey === column.key ? sortDirection : null}
                onsort={(direction) =>
                  emit('sort', { key: column.key, direction: direction ?? 'asc' })}
              /><button
                type="button"
                class="biss-column-resize"
                aria-label={resizeLabel.replace('{label}', column.label)}
                use:resizeHandle={{
                  value: column.width ?? 160,
                  min: 60,
                  max: 800,
                  onchange: (width: number) =>
                    emit(
                      'columns',
                      columns.map((c) => (c.key === column.key ? { ...c, width } : c)),
                    ),
                }}
              ></button></th
            >{/each}</tr
        ></thead
      ><tbody
        >{#each sorted as row (row.id)}<tr data-selected={selected.includes(row.id)}
            ><td
              ><input
                type="checkbox"
                aria-label={rowLabel.replace('{id}', row.id)}
                checked={selected.includes(row.id)}
                onchange={() => emit('select', toggleValue(selected, row.id))}
              /></td
            >{#each visible as column, i (column.key)}<td
                style:position={column.pinned ? 'sticky' : undefined}
                style:left={column.pinned ? pinLeft(i) + 'px' : undefined}
                style:z-index={column.pinned ? 1 : undefined}
                >{#if cell}{@render cell({ row, column, value: row[column.key] })}{:else}{String(
                    row[column.key] ?? '',
                  )}{/if}</td
              >{/each}</tr
          >{/each}{#if !rows.length}<tr
            ><td colspan={visible.length + 1} class="biss-table-empty">{emptyLabel}</td></tr
          >{/if}</tbody
      >
    </table>
  </div>
</section>
