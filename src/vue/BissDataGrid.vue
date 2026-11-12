<script setup lang="ts">
import { computed, ref } from 'vue';
import BissPopover from './BissPopover.vue';
import BissColumnManager from './BissColumnManager.vue';
import BissTableHead from './BissTableHead.vue';
import type { BissColumn } from '../core/types';
import { dataGridModel } from '../core/data-grid';

import { resizeHandle, observeWidth } from '../core/dom';
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
const availableWidth = ref(0);
const vMeasure = actionDirective(observeWidth);
const vResize = actionDirective(resizeHandle);
const grid = computed(() =>
  dataGridModel({
    rows,
    columns,
    selected,
    sortKey,
    sortDirection,
    availableWidth: availableWidth.value,
  }),
);
const visible = computed(() => grid.value.visible),
  sorted = computed(() => grid.value.sorted);
const pinLeft = (index: number) => grid.value.geometry(visible.value[index]!.key).left;
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
    <div
      class="biss-table-wrap"
      v-measure="{ onchange: (width: number) => (availableWidth = width) }"
    >
      <table class="biss-table" :style="{ width: grid.width + 'px', tableLayout: 'fixed' }">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                :aria-label="selectAllLabel"
                :checked="grid.allSelected"
                :indeterminate="grid.someSelected"
                @change="
                  emit('select', grid.selectAll(($event.target as HTMLInputElement).checked))
                "
              />
            </th>
            <th
              v-for="(column, i) in visible"
              :key="column.key"
              :style="{
                width: grid.geometry(column.key).width + 'px',
                minWidth: grid.geometry(column.key).width + 'px',
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
                @change="emit('select', grid.toggleRow(row.id))"
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
