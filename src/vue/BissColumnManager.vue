<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import type { BissColumn } from '../core/types';
import { moveItem } from '../core/collections';
const {
  columns,
  label = 'Columns',
  showLabel = 'Show',
  pinLabel = 'Pin',
  widthLabel = 'Width',
  upLabel = 'Move up',
  downLabel = 'Move down',
} = defineProps<{
  columns: BissColumn[];
  label?: string;
  showLabel?: string;
  pinLabel?: string;
  widthLabel?: string;
  upLabel?: string;
  downLabel?: string;
}>();
const emit = defineEmits<{ change: [columns: BissColumn[]] }>();
function patch(key: string, p: Partial<BissColumn>) {
  emit(
    'change',
    columns.map((c) => (c.key === key ? { ...c, ...p } : c)),
  );
}
</script>
<template>
  <section class="biss-column-manager" :aria-label="label">
    <h3>{{ label }}</h3>
    <div v-for="(column, i) in columns" :key="column.key" class="biss-editor-row">
      <label class="biss-checkbox"
        ><input
          type="checkbox"
          :checked="column.visible"
          :disabled="column.locked"
          :aria-label="showLabel + ' ' + column.label"
          @change="patch(column.key, { visible: !column.visible })"
        /><span>{{ column.label }}</span></label
      ><label class="biss-column-width"
        >{{ widthLabel
        }}<input
          type="number"
          class="biss-input"
          :value="column.width ?? 160"
          min="60"
          max="800"
          :aria-label="widthLabel + ' ' + column.label"
          @change="
            patch(column.key, {
              width: Math.max(
                60,
                Math.min(800, Number(($event.target as HTMLInputElement).value) || 160),
              ),
            })
          " /></label
      ><label class="biss-checkbox"
        ><input
          type="checkbox"
          :checked="column.pinned"
          :aria-label="pinLabel + ' ' + column.label"
          @change="patch(column.key, { pinned: !column.pinned })"
        /><span>{{ pinLabel }}</span></label
      ><button
        class="biss-header-action"
        type="button"
        :disabled="i === 0"
        :aria-label="upLabel + ' ' + column.label"
        @click="emit('change', moveItem(columns, i, -1))"
      >
        <BissIcon name="arrowUp" /></button
      ><button
        class="biss-header-action"
        type="button"
        :disabled="i === columns.length - 1"
        :aria-label="downLabel + ' ' + column.label"
        @click="emit('change', moveItem(columns, i, 1))"
      >
        <BissIcon name="arrowDown" />
      </button>
    </div>
  </section>
</template>
