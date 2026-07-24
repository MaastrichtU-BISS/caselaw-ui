<script setup lang="ts">
import type { CleTableColumn } from "../types";

defineProps<{
  columns: CleTableColumn[];
  rows: Record<string, unknown>[];
  empty?: string;
}>();
</script>

<template>
  <div class="cle-table-wrap">
    <table class="cle-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!rows.length">
          <td :colspan="columns.length">{{ empty || "No rows" }}</td>
        </tr>
        <tr v-for="(row, index) in rows" v-else :key="String(row.id || row.key_id || index)">
          <td v-for="column in columns" :key="column.key">
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ row[column.key] ?? "" }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
