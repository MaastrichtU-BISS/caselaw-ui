<script setup lang="ts">
import { computed, ref } from "vue";
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
}>(), {
  loading: false,
  loadingRows: 4,
});

const sortKey = ref("");
const sortDesc = ref(false);

function cellClass(column: CleTableColumn) {
  return [
    column.numeric ? "cle-table-numeric" : "",
    column.actions ? "cle-table-actions" : "",
  ].filter(Boolean);
}

function toggleSort(column: CleTableColumn) {
  if (!column.sortable) return;
  if (sortKey.value === column.key) {
    sortDesc.value = !sortDesc.value;
    return;
  }
  sortKey.value = column.key;
  sortDesc.value = true;
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
            <button v-if="column.sortable" type="button" class="cle-table-sort" @click="toggleSort(column)">
              {{ column.label }}
              <span v-if="sortKey === column.key" class="cle-table-sort-caret">{{ sortDesc ? "▼" : "▲" }}</span>
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
          <tr v-for="(row, index) in sortedRows" :key="String(row.id ?? row.key_id ?? index)">
            <td v-for="column in columns" :key="column.key" :class="cellClass(column)">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] ?? "" }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
