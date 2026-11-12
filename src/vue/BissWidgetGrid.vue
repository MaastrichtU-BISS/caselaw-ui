<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import { moveItem } from '../core/collections';
const {
  items,
  label = 'Dashboard widgets',
  editable = true,
  upLabel = 'Move earlier',
  downLabel = 'Move later',
} = defineProps<{
  items: { id: string; title: string; span?: number }[];
  label?: string;
  editable?: boolean;
  upLabel?: string;
  downLabel?: string;
}>();
const emit = defineEmits<{ change: [items: { id: string; title: string; span?: number }[]] }>();
function drop(e: DragEvent, index: number) {
  if (!editable) return;
  const from = items.findIndex(
    (i) => i.id === e.dataTransfer?.getData('application/x-biss-widget'),
  );
  if (from >= 0) emit('change', moveItem(items, from, index - from));
}
</script>
<template>
  <div class="biss-widget-grid" role="group" :aria-label="label">
    <section
      v-for="(item, i) in items"
      :key="item.id"
      :style="{ gridColumn: 'span ' + Math.max(1, Math.min(2, item.span ?? 1)) }"
      @dragover.prevent
      @drop.prevent="drop($event, i)"
    >
      <header>
        <h3>{{ item.title }}</h3>
        <span v-if="editable"
          ><button
            type="button"
            class="biss-header-action"
            :aria-label="upLabel + ' ' + item.title"
            :disabled="i === 0"
            @click="emit('change', moveItem(items, i, -1))"
          >
            <BissIcon name="arrowUp" /></button
          ><button
            type="button"
            class="biss-header-action"
            :aria-label="downLabel + ' ' + item.title"
            :disabled="i === items.length - 1"
            @click="emit('change', moveItem(items, i, 1))"
          >
            <BissIcon name="arrowDown" /></button
          ><button
            type="button"
            class="biss-header-action"
            :aria-label="'Drag ' + item.title"
            draggable="true"
            @dragstart="$event.dataTransfer?.setData('application/x-biss-widget', item.id)"
          >
            <BissIcon name="grip" /></button
        ></span>
      </header>
      <div class="biss-widget-content"><slot :item="item" :index="i" /></div>
    </section>
  </div>
</template>
