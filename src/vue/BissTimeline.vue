<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';
import type { BissTimelineItem } from '../library-types';
import { timelineSpan } from '../portable';
const { from, to, items, label } = defineProps<{
  from: string;
  to: string;
  items: BissTimelineItem[];
  label: string;
}>();
const emit = defineEmits<{ open: [id: string] }>();
const span = (item: BissTimelineItem) => timelineSpan(from, to, item.start, item.end);
</script>
<template>
  <div class="biss-timeline" role="group" :aria-label="label">
    <div class="biss-timeline-axis">
      <span>{{ from }}</span
      ><span>{{ to }}</span>
    </div>
    <div v-for="item in items" :key="item.id" class="biss-timeline-row">
      <span>{{ item.title }}</span>
      <div>
        <button
          type="button"
          :aria-label="item.title + ': ' + item.start + ' – ' + item.end"
          :style="{
            left: span(item).left + '%',
            width: span(item).width + '%',
            background: item.color ?? 'var(--biss-primary)',
          }"
          @click="emit('open', item.id)"
        >
          {{ item.title }}
        </button>
      </div>
    </div>
  </div>
</template>
