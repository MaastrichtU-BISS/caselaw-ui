<script lang="ts">
  import type { BissChartPoint } from '../core/types';
  let {
    points,
    seriesLabel = 'Requests',
    compareLabel,
  }: {
    points: BissChartPoint[];
    /** Legend label for the main series. */
    seriesLabel?: string;
    /** Legend label for the highlighted sub-series (drawn at the base of each bar). */
    compareLabel?: string;
  } = $props();
  let max = $derived(Math.max(1, ...points.map((p) => p.value)));
  /* The peak, so the bars mean a number rather than a shape. */
  let peak = $derived(Math.max(0, ...points.map((p) => p.value)));
  let empty = $derived(points.reduce((sum, p) => sum + p.value, 0) === 0);
  const height = (value: number) =>
    Math.max(value > 0 ? 3 : 0, Math.round((Math.max(0, value) / max) * 100)) + '%';
</script>

<figure class="biss-chart" style="margin: 0">
  <div class="biss-chart-scale"><span>{peak}</span><span>0</span></div>
  <div
    class="biss-chart-plot"
    role="img"
    aria-label={seriesLabel + ' over ' + points.length + ' buckets'}
  >
    {#each points as point}<div
        class="biss-chart-bar"
        title={`${point.label}: ${point.value}${point.compare ? ` (${point.compare} ${compareLabel || 'flagged'})` : ''}`}
      >
        <div class="biss-chart-bar-fill" style:height={height(point.value)}>
          {#if point.compare}<div
              class="biss-chart-bar-denied"
              style:height={Math.min(
                100,
                Math.max(3, Math.round((point.compare / Math.max(1, point.value)) * 100)),
              ) + '%'}
            ></div>{/if}
        </div>
      </div>{/each}
  </div>
  {#if empty}<p class="biss-chart-empty">No requests in this window.</p>{/if}
  {#if points.length}<div class="biss-chart-axis">
      <span>{points[0]?.label ?? ''}</span><span
        >{points[Math.floor(points.length / 2)]?.label ?? ''}</span
      ><span>{points.at(-1)?.label ?? ''}</span>
    </div>{/if}
  <figcaption class="biss-chart-legend">
    <span class="biss-chart-legend-item"><span class="biss-chart-swatch"></span>{seriesLabel}</span
    >{#if compareLabel}<span class="biss-chart-legend-item"
        ><span class="biss-chart-swatch biss-chart-swatch-denied"></span>{compareLabel}</span
      >{/if}
  </figcaption>
</figure>
