<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissChartPoint } from '../core/types';
  let {
    points,
    seriesLabel = 'Requests',
    compareLabel = 'Flagged',
  }: { points: BissChartPoint[]; seriesLabel?: string; compareLabel?: string } = $props();
  let max = $derived(Math.max(1, ...points.map((p) => p.value)));
</script>

<figure class="biss-chart">
  <div class="biss-chart-scale"><span>{max}</span><span>0</span></div>
  <div
    class="biss-chart-plot"
    role="img"
    aria-label={seriesLabel + ' over ' + points.length + ' buckets'}
  >
    {#each points as point}<div class="biss-chart-bar" title={point.label + ': ' + point.value}>
        <div
          class="biss-chart-bar-fill"
          style:height={(Math.max(0, point.value) / max) * 100 + '%'}
        >
          {#if point.compare}<div
              class="biss-chart-bar-denied"
              style:height={Math.min(100, (point.compare / Math.max(1, point.value)) * 100) + '%'}
            ></div>{/if}
        </div>
      </div>{/each}
  </div>
  <div class="biss-chart-axis">
    <span>{points[0]?.label ?? ''}</span><span>{points.at(-1)?.label ?? ''}</span>
  </div>
  <figcaption class="biss-chart-legend">
    <span>{seriesLabel}</span>{#if points.some((p) => p.compare)}<span>{compareLabel}</span>{/if}
  </figcaption>
</figure>
