<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { CleTableColumn } from "../types";

const props = withDefaults(defineProps<{
  columns: CleTableColumn[];
  /* Rows are arbitrary records, so cell values stay untyped by design.
     `unknown` here would reject every plain interface passed in. */
  rows: Record<string, any>[];
  empty?: string;
  loading?: boolean;
  /** Skeleton rows drawn while loading. */
  loadingRows?: number;
  /** Rows per page. 0 shows everything. */
  pageSize?: number;
}>(), {
  loading: false,
  loadingRows: 4,
  pageSize: 0,
});

const sortKey = ref("");
const sortDesc = ref(false);
const page = ref(1);

/**
 * Every column sorts unless it opts out.
 *
 * `sortable: true` had to be set per column, so most tables shipped with a
 * couple of sortable headers and the rest inert — which reads as broken
 * rather than as deliberate. Action columns hold buttons, not values, so
 * those stay out.
 */
function isSortable(column: CleTableColumn) {
  return column.sortable !== false && !column.actions;
}

function cellClass(column: CleTableColumn) {
  return [
    column.numeric ? "cle-table-numeric" : "",
    column.actions ? "cle-table-actions" : "",
  ].filter(Boolean);
}

/** Ascending, then descending, then back to the original order. */
function toggleSort(column: CleTableColumn) {
  if (!isSortable(column)) return;
  if (sortKey.value !== column.key) {
    sortKey.value = column.key;
    sortDesc.value = false;
  } else if (!sortDesc.value) {
    sortDesc.value = true;
  } else {
    sortKey.value = "";
    sortDesc.value = false;
  }
  page.value = 1;
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows;
  const key = sortKey.value;
  return [...props.rows].sort((a, b) => {
    const left = a[key];
    const right = b[key];
    if (left == null && right == null) return 0;
    if (left == null) return 1;
    if (right == null) return -1;
    const compared = typeof left === "number" && typeof right === "number"
      ? left - right
      : String(left).localeCompare(String(right), undefined, { numeric: true });
    return sortDesc.value ? -compared : compared;
  });
});

const pageCount = computed(() =>
  props.pageSize > 0 ? Math.max(1, Math.ceil(sortedRows.value.length / props.pageSize)) : 1,
);

// Clamped rather than reset: deleting the last row of the last page should
// land on the new last page, not send you back to the beginning.
watch([pageCount, () => props.pageSize], () => {
  if (page.value > pageCount.value) page.value = pageCount.value;
});

const visibleRows = computed(() => {
  if (props.pageSize <= 0) return sortedRows.value;
  const start = (page.value - 1) * props.pageSize;
  return sortedRows.value.slice(start, start + props.pageSize);
});

const rangeStart = computed(() =>
  sortedRows.value.length === 0 ? 0 : (page.value - 1) * props.pageSize + 1,
);
const rangeEnd = computed(() =>
  Math.min(page.value * props.pageSize, sortedRows.value.length),
);
</script>

<template>
  <div class="cle-table-wrap">
    <table class="cle-table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="cellClass(column)"
            :style="column.width ? { width: column.width } : undefined"
            :aria-sort="sortKey === column.key ? (sortDesc ? 'descending' : 'ascending') : undefined"
          >
            <button
              v-if="isSortable(column) && column.label"
              type="button"
              class="cle-table-sort"
              @click="toggleSort(column)"
            >
              {{ column.label }}
              <span class="cle-table-sort-caret" :class="{ 'is-active': sortKey === column.key }">
                {{ sortKey === column.key && sortDesc ? "▼" : "▲" }}
              </span>
            </button>
            <template v-else>{{ column.label }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="line in loadingRows" :key="`skeleton-${line}`">
            <td v-for="column in columns" :key="column.key">
              <div class="cle-skeleton" style="height: 13px" />
            </td>
          </tr>
        </template>
        <tr v-else-if="!sortedRows.length">
          <td :colspan="columns.length" class="cle-table-empty">
            <slot name="empty">{{ empty || "No rows" }}</slot>
          </td>
        </tr>
        <template v-else>
          <tr v-for="(row, index) in visibleRows" :key="String(row.id ?? row.key_id ?? index)">
            <td v-for="column in columns" :key="column.key" :class="cellClass(column)">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] ?? "" }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <div v-if="pageSize > 0 && !loading && sortedRows.length > pageSize" class="cle-table-pager">
      <span class="cle-table-pager-range">
        {{ rangeStart }}–{{ rangeEnd }} of {{ sortedRows.length }}
      </span>
      <div class="cle-table-pager-buttons">
        <button
          type="button"
          class="cle-button cle-button-secondary cle-button-sm"
          :disabled="page <= 1"
          @click="page -= 1"
        >
          Previous
        </button>
        <span class="cle-table-pager-page">{{ page }} / {{ pageCount }}</span>
        <button
          type="button"
          class="cle-button cle-button-secondary cle-button-sm"
          :disabled="page >= pageCount"
          @click="page += 1"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
