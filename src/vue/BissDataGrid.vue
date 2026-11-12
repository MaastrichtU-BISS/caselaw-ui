<script setup lang="ts">
import { computed } from 'vue';
import BissPopover from './BissPopover.vue';
import BissColumnManager from './BissColumnManager.vue';
import BissTableHead from './BissTableHead.vue';
import type { BissColumn } from '../core/types';
import { sortRows } from '../core/collections';
import { toggleValue } from '../core/format';
import { resizeHandle } from '../core/dom';
import { actionDirective } from './actions';
const {
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
} = defineProps<{
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
}>();
const emit = defineEmits<{
  columns: [columns: BissColumn[]];
  select: [ids: string[]];
  sort: [value: { key: string; direction: 'asc' | 'desc' }];
}>();
const vResize = actionDirective(resizeHandle);
const visible = computed(() => columns.filter((c) => c.visible));
const sorted = computed(() => sortRows(rows, sortKey, sortDirection));
const pinLeft = (index: number) =>
  44 +
  visible.value
    .slice(0, index)
    .filter((c) => c.pinned)
    .reduce((sum, c) => sum + (c.width ?? 160), 0);
</script>
<template>
  <section class="biss-data-grid" :aria-label="label">
    <header>
      <span>{{ selectedLabel.replace('{count}', String(selected.length)) }}</span><BissPopover
        :label="columnsLabel"
        :width="480"
        ><BissColumnManager
          v-bind="columnLabels"
          :columns="columns"
          @change="emit('columns', $event)"
      /></BissPopover>
    </header>
    <div class="biss-table-wrap">
      <table class="biss-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                :aria-label="selectAllLabel"
                :checked="rows.length > 0 && rows.every((r) => selected.includes(r.id))"
                @change="
                  emit(
                    'select',
                    ($event.target as HTMLInputElement).checked
                      ? Array.from(new Set([...selected, ...rows.map((r) => r.id)]))
                      : selected.filter((id) => !rows.some((r) => r.id === id)),
                  )
                "
              />
            </th>
            <th
              v-for="(column, i) in visible"
              :key="column.key"
              :style="{
                width: (column.width ?? 160) + 'px',
                minWidth: (column.width ?? 160) + 'px',
                position: column.pinned ? 'sticky' : undefined,
                left: column.pinned ? pinLeft(i) + 'px' : undefined,
                zIndex: column.pinned ? 2 : undefined,
              }"
              :aria-sort="
                sortKey === column.key
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              "
            >
              <BissTableHead
                :label="column.label"
                :sort="sortKey === column.key ? sortDirection : null"
                @sort="emit('sort', { key: column.key, direction: $event ?? 'asc' })"
              /><button
                type="button"
                class="biss-column-resize"
                :aria-label="resizeLabel.replace('{label}', column.label)"
                v-resize="{
                  value: column.width ?? 160,
                  min: 60,
                  max: 800,
                  onchange: (width: number) =>
                    emit(
                      'columns',
                      columns.map((c) => (c.key === column.key ? { ...c, width } : c)),
                    ),
                }"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in sorted" :key="row.id" :data-selected="selected.includes(row.id)">
            <td>
              <input
                type="checkbox"
                :aria-label="rowLabel.replace('{id}', row.id)"
                :checked="selected.includes(row.id)"
                @change="emit('select', toggleValue(selected, row.id))"
              />
            </td>
            <td
              v-for="(column, i) in visible"
              :key="column.key"
              :style="{
                position: column.pinned ? 'sticky' : undefined,
                left: column.pinned ? pinLeft(i) + 'px' : undefined,
                zIndex: column.pinned ? 1 : undefined,
              }"
            >
              <slot name="cell" :row="row" :column="column" :value="row[column.key]">{{
                row[column.key]
              }}</slot>
            </td>
          </tr>
          <tr v-if="!rows.length">
            <td :colspan="visible.length + 1" class="biss-table-empty">{{ emptyLabel }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
