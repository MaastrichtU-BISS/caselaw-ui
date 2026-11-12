<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';
import { lineLayout } from '../chart-layout';
const {
  values,
  label,
  height = 160,
  color = 'var(--biss-primary)',
} = defineProps<{ values: number[]; label: string; height?: number; color?: string }>();

const points = computed(() => lineLayout(values, 160));
</script>
<template>
  <div class="biss-chart-scroll">
    <svg
      class="biss-line-chart"
      viewBox="0 0 480 160"
      role="img"
      :aria-label="label"
      :style="{ color }"
      :height="height"
    >
      <polyline :points="points.map((p) => p.x + ',' + p.y).join(' ')" />
      <g v-for="point in points" :key="point.index">
        <circle :cx="point.x" :cy="point.y" r="3">
          <title>{{ point.value }}</title>
        </circle>
      </g>
    </svg>
  </div>
</template>
