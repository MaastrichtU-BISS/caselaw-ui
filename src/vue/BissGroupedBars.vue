<script setup lang="ts">
import { computed } from 'vue';
import { groupedLayout } from '../core/charts';
import type { BissBarSeries } from '../core/types';
const {
  categories,
  series,
  label,
  height = 240,
  locale = 'en-GB',
} = defineProps<{
  categories: string[];
  series: BissBarSeries[];
  label: string;
  height?: number;
  locale?: string;
}>();
const emit = defineEmits<{ pick: [value: { series: string; index: number }] }>();
const chart = computed(() => groupedLayout(categories, series, height));
const nf = computed(
  () => new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }),
);
</script>
<template>
  <div class="biss-chart-scroll" role="group" :aria-label="label">
    <svg
      class="biss-grouped-bars"
      :viewBox="`0 0 ${chart.width} ${height}`"
      :style="{ minWidth: chart.width + 'px' }"
      :height="height"
    >
      <g v-for="tick in chart.ticks" :key="tick.value">
        <line x1="48" :x2="chart.width" :y1="tick.y" :y2="tick.y" />
        <text x="42" :y="tick.y + 4" text-anchor="end">{{ nf.format(tick.value) }}</text>
      </g>
      <g v-for="group in chart.groups" :key="group.index">
        <g
          v-for="bar in group.bars"
          :key="bar.key"
          role="button"
          tabindex="0"
          :aria-label="group.label + ' · ' + bar.label + ': ' + nf.format(bar.value)"
          @click="emit('pick', { series: bar.key, index: group.index })"
          @keydown.enter.prevent="emit('pick', { series: bar.key, index: group.index })"
          @keydown.space.prevent="emit('pick', { series: bar.key, index: group.index })"
        >
          <title>{{ group.label }} · {{ bar.label }}: {{ nf.format(bar.value) }}</title>
          <rect
            :x="bar.x"
            :y="bar.y"
            :width="bar.width"
            :height="Math.max(1, bar.height)"
            :fill="bar.ghost ? 'transparent' : bar.color"
            :stroke="bar.color"
            :stroke-dasharray="bar.ghost ? '3 2' : undefined"
            rx="2"
          />
        </g>
        <text :x="group.x" :y="height - 8" text-anchor="middle">{{ group.label }}</text>
      </g>
    </svg>
  </div>
</template>
