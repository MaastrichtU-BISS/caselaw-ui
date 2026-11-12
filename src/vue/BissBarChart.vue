<script setup lang="ts">
import { computed } from "vue";
import type { BissChartPoint } from "../types";

const props = withDefaults(defineProps<{
  points: BissChartPoint[];
  /** Legend label for the main series. */
  seriesLabel?: string;
  /** Legend label for the highlighted sub-series (drawn at the base of each bar). */
  compareLabel?: string;
}>(), {
  seriesLabel: "Requests",
});

const max = computed(() => Math.max(1, ...props.points.map((point) => point.value)));

const bars = computed(() => props.points.map((point) => ({
  ...point,
  height: `${Math.max(point.value > 0 ? 3 : 0, Math.round((point.value / max.value) * 100))}%`,
  compareHeight: point.compare
    ? `${Math.max(3, Math.round((point.compare / max.value) * 100))}%`
    : "0%",
})));

const firstLabel = computed(() => props.points[0]?.label || "");
const midLabel = computed(() => props.points[Math.floor(props.points.length / 2)]?.label || "");
const lastLabel = computed(() => props.points[props.points.length - 1]?.label || "");

/* The peak, so the bars mean a number rather than a shape. Without it a chart
   of one request and a chart of ten thousand are the same picture. */
const peak = computed(() => Math.max(...props.points.map((point) => point.value), 0));
const total = computed(() => props.points.reduce((sum, point) => sum + point.value, 0));
const empty = computed(() => total.value === 0);
</script>

<template>
  <figure class="biss-chart" style="margin: 0">
    <div class="biss-chart-scale">
      <span>{{ peak }}</span>
      <span>0</span>
    </div>

    <div class="biss-chart-plot" role="img" :aria-label="`${seriesLabel} over ${points.length} buckets`">
      <div
        v-for="(bar, index) in bars"
        :key="index"
        class="biss-chart-bar"
        :title="`${bar.label}: ${bar.value}${bar.compare ? ` (${bar.compare} ${compareLabel || 'flagged'})` : ''}`"
      >
        <div class="biss-chart-bar-fill" :style="{ height: bar.height }">
          <div v-if="bar.compare" class="biss-chart-bar-denied" :style="{ height: bar.compareHeight }" />
        </div>
      </div>
    </div>
    <p v-if="empty" class="biss-chart-empty">No requests in this window.</p>

    <div v-if="points.length" class="biss-chart-axis">
      <span>{{ firstLabel }}</span>
      <span>{{ midLabel }}</span>
      <span>{{ lastLabel }}</span>
    </div>
    <figcaption class="biss-chart-legend">
      <span class="biss-chart-legend-item"><span class="biss-chart-swatch" />{{ seriesLabel }}</span>
      <span v-if="compareLabel" class="biss-chart-legend-item">
        <span class="biss-chart-swatch biss-chart-swatch-denied" />{{ compareLabel }}
      </span>
    </figcaption>
  </figure>
</template>
