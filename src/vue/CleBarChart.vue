<script setup lang="ts">
import { computed } from "vue";
import type { CleChartPoint } from "../types";

const props = withDefaults(defineProps<{
  points: CleChartPoint[];
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
const lastLabel = computed(() => props.points[props.points.length - 1]?.label || "");
</script>

<template>
  <figure class="cle-chart" style="margin: 0">
    <div class="cle-chart-plot" role="img" :aria-label="`${seriesLabel} over ${points.length} buckets`">
      <div
        v-for="(bar, index) in bars"
        :key="index"
        class="cle-chart-bar"
        :title="`${bar.label}: ${bar.value}${bar.compare ? ` (${bar.compare} ${compareLabel || 'flagged'})` : ''}`"
      >
        <div class="cle-chart-bar-fill" :style="{ height: bar.height }">
          <div v-if="bar.compare" class="cle-chart-bar-denied" :style="{ height: bar.compareHeight }" />
        </div>
      </div>
    </div>
    <div v-if="points.length" class="cle-chart-axis">
      <span>{{ firstLabel }}</span>
      <span>{{ lastLabel }}</span>
    </div>
    <figcaption class="cle-chart-legend">
      <span class="cle-chart-legend-item"><span class="cle-chart-swatch" />{{ seriesLabel }}</span>
      <span v-if="compareLabel" class="cle-chart-legend-item">
        <span class="cle-chart-swatch cle-chart-swatch-denied" />{{ compareLabel }}
      </span>
    </figcaption>
  </figure>
</template>
