<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissTableColumn } from '../core/types';
  import BissIcon from './BissIcon.svelte';

  let {
    columns,
    rows,
    empty = 'No rows',
    loading = false,
    loadingRows = 4,
    pageSize = 0,
    cell,
  }: {
    columns: BissTableColumn[];
    /* Rows are arbitrary records, so cell values stay untyped by design,
       matching the Vue component: `unknown` would reject plain interfaces. */
    rows: Record<string, any>[];
    empty?: string;
    loading?: boolean;
    /** Skeleton rows drawn while loading. */
    loadingRows?: number;
    /** Rows per page. 0 shows everything. */
    pageSize?: number;
    /** Custom cell content; the Vue component's `cell-<key>` slots. */
    cell?: Snippet<[{ row: Record<string, any>; column: BissTableColumn; value: any }]>;
  } = $props();

  let sortKey = $state('');
  let sortDesc = $state(false);
  let page = $state(1);

  /** Every column sorts unless it opts out; action columns never do. */
  const isSortable = (column: BissTableColumn) => column.sortable !== false && !column.actions;
  const cellClass = (column: BissTableColumn) =>
    [column.numeric ? 'biss-table-numeric' : '', column.actions ? 'biss-table-actions' : '']
      .filter(Boolean)
      .join(' ') || undefined;

  /** Ascending, then descending, then back to the original order. */
  function toggleSort(column: BissTableColumn) {
    if (!isSortable(column)) return;
    if (sortKey !== column.key) {
      sortKey = column.key;
      sortDesc = false;
    } else if (!sortDesc) {
      sortDesc = true;
    } else {
      sortKey = '';
      sortDesc = false;
    }
    page = 1;
  }

  let sortedRows = $derived.by(() => {
    if (!sortKey) return rows;
    const key = sortKey;
    return [...rows].sort((a, b) => {
      const left = a[key];
      const right = b[key];
      if (left == null && right == null) return 0;
      if (left == null) return 1;
      if (right == null) return -1;
      const compared =
        typeof left === 'number' && typeof right === 'number'
          ? left - right
          : String(left).localeCompare(String(right), undefined, { numeric: true });
      return sortDesc ? -compared : compared;
    });
  });
  let pageCount = $derived(
    pageSize > 0 ? Math.max(1, Math.ceil(sortedRows.length / pageSize)) : 1,
  );
  // Clamped rather than reset, so deleting the last row lands on the new last page.
  let currentPage = $derived(Math.min(page, pageCount));
  let visibleRows = $derived(
    pageSize > 0
      ? sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : sortedRows,
  );
  let rangeStart = $derived(sortedRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1);
  let rangeEnd = $derived(Math.min(currentPage * pageSize, sortedRows.length));
</script>

<div class="biss-table-wrap">
  <table class="biss-table">
    <thead>
      <tr>
        {#each columns as column (column.key)}
          <th
            class={cellClass(column)}
            style:width={column.width}
            aria-sort={sortKey === column.key ? (sortDesc ? 'descending' : 'ascending') : undefined}
          >
            {#if isSortable(column) && column.label}
              <button type="button" class="biss-table-sort" onclick={() => toggleSort(column)}>
                {column.label}
                <span class="biss-table-sort-caret" class:is-active={sortKey === column.key}>
                  {sortKey === column.key && sortDesc ? '▼' : '▲'}
                </span>
              </button>
            {:else}{column.label}{/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if loading}
        {#each Array(Math.max(0, loadingRows)) as _, line (line)}
          <tr>
            {#each columns as column (column.key)}
              <td><div class="biss-skeleton" style="height: 13px"></div></td>
            {/each}
          </tr>
        {/each}
      {:else if sortedRows.length === 0}
        <tr><td colspan={columns.length} class="biss-table-empty">{empty}</td></tr>
      {:else}
        {#each visibleRows as row, index (String(row.id ?? row.key_id ?? index))}
          <tr>
            {#each columns as column (column.key)}
              <td class={cellClass(column)}>
                {#if cell}{@render cell({ row, column, value: row[column.key] })}{:else}{row[
                    column.key
                  ] ?? ''}{/if}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>

  {#if pageSize > 0 && !loading && sortedRows.length > pageSize}
    <div class="biss-table-pager">
      <span class="biss-table-pager-range">{rangeStart}–{rangeEnd} of {sortedRows.length}</span>
      <span class="biss-table-pager-page" aria-live="polite">{currentPage} / {pageCount}</span>
      <div class="biss-table-pager-buttons">
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onclick={() => (page = currentPage - 1)}><BissIcon name="chevLeft" /></button
        >
        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage >= pageCount}
          onclick={() => (page = currentPage + 1)}><BissIcon name="chev" /></button
        >
      </div>
    </div>
  {/if}
</div>
