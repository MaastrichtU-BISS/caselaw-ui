<script lang="ts">
  import type { Snippet } from 'svelte';
  import { groupedLayout } from '../core/charts';
  import type { BissBarSeries } from '../core/types';
  let {
    categories,
    series,
    label,
    height = 240,
    locale = 'en-GB',
    onpick,
  }: {
    categories: string[];
    series: BissBarSeries[];
    label: string;
    height?: number;
    locale?: string;
    onpick?: (value: { series: string; index: number }) => void;
  } = $props();
  type Events = { pick: [value: { series: string; index: number }] };
  const handlers = {
    get pick() {
      return onpick;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let chart = $derived(groupedLayout(categories, series, height));
  let nf = $derived(
    new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }),
  );
</script>

<div class="biss-chart-scroll" role="group" aria-label={label}>
  <svg
    class="biss-grouped-bars"
    viewBox="0 0 {chart.width} {height}"
    style:min-width={chart.width + 'px'}
    {height}
    >{#each chart.ticks as tick}<g
        ><line x1="48" x2={chart.width} y1={tick.y} y2={tick.y} /><text
          x="42"
          y={tick.y + 4}
          text-anchor="end">{nf.format(tick.value)}</text
        ></g
      >{/each}{#each chart.groups as group}<g
        >{#each group.bars as bar}<g
            role="button"
            tabindex="0"
            aria-label={group.label + ' · ' + bar.label + ': ' + nf.format(bar.value)}
            onclick={() => emit('pick', { series: bar.key, index: group.index })}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                emit('pick', { series: bar.key, index: group.index });
              }
            }}
            ><title>{group.label} · {bar.label}: {nf.format(bar.value)}</title><rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={Math.max(1, bar.height)}
              fill={bar.ghost ? 'transparent' : bar.color}
              stroke={bar.color}
              stroke-dasharray={bar.ghost ? '3 2' : undefined}
              rx="2"
            /></g
          >{/each}<text x={group.x} y={height - 8} text-anchor="middle">{group.label}</text></g
      >{/each}</svg
  >
</div>
