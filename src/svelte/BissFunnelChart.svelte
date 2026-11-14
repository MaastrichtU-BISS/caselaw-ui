<script lang="ts">
  /**
   * Stages of a pipeline as one narrowing shape, with the count of each stage and
   * the share that continues from the stage before. Every figure is written out
   * beside the shape, so the chart never relies on width or color alone.
   */
  import { funnelLayout, type BissFunnelStage } from '../core/charts';
  import { fillLabel } from '../core/blocks';

  interface Props {
    stages: BissFunnelStage[];
    /** Accessible name of the chart, for example “Grant pipeline 2026”. */
    label: string;
    locale?: string;
    /** Render each stage as a button that calls `onpick`. */
    interactive?: boolean;
    /** Conversion from the previous stage. `{percent}` is replaced. */
    conversionLabel?: string;
    /** The summary under the chart. `{percent}`, `{first}` and `{last}` are replaced. Empty hides it. */
    overallLabel?: string;
    emptyLabel?: string;
    onpick?: (stage: BissFunnelStage) => void;
  }

  let {
    stages,
    label,
    locale = 'en-GB',
    interactive = false,
    conversionLabel = '{percent} of previous',
    overallLabel = '{percent} of {first} reach {last}',
    emptyLabel = 'No stages to show yet.',
    onpick,
  }: Props = $props();

  const chart = $derived(funnelLayout(stages));
  const count = $derived(new Intl.NumberFormat(locale));
  const percent = (n: number) =>
    new Intl.NumberFormat(locale, {
      style: 'percent',
      maximumFractionDigits: n > 0 && n < 0.1 ? 1 : 0,
    }).format(n);
  const shade = (index: number) =>
    stages.length > 1 ? 1 - (index / (stages.length - 1)) * 0.5 : 1;
  const summary = $derived(
    !overallLabel || chart.overall === null
      ? ''
      : fillLabel(overallLabel, {
          percent: percent(chart.overall),
          first: stages[0]?.label ?? '',
          last: stages.at(-1)?.label ?? '',
        }),
  );
  function pick(index: number) {
    const stage = stages[index];
    if (stage) onpick?.(stage);
  }
</script>

{#snippet row(stage: (typeof chart.stages)[number])}
  <span class="biss-funnel-label"
    ><strong>{stage.label}</strong>{#if stage.note}<small>{stage.note}</small>{/if}</span
  >
  <svg class="biss-funnel-shape" viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden="true">
    <polygon
      points={stage.points}
      style:fill={stage.color ?? 'var(--biss-primary)'}
      fill-opacity={stage.color ? 1 : shade(stage.index)}
    />
  </svg>
  <span class="biss-funnel-value"
    ><b>{stage.display ?? count.format(stage.value)}</b>{#if stage.conversion !== null}<small
        >{fillLabel(conversionLabel, { percent: percent(stage.conversion) })}</small
      >{/if}</span
  >
{/snippet}

<figure class="biss-funnel">
  {#if chart.empty}
    <p class="biss-funnel-empty">{emptyLabel}</p>
  {:else}
    <ol class="biss-funnel-stages" aria-label={label}>
      {#each chart.stages as stage (stage.key)}
        <li>
          {#if interactive}
            <button type="button" class="biss-funnel-row" onclick={() => pick(stage.index)}
              >{@render row(stage)}</button
            >
          {:else}
            <div class="biss-funnel-row">{@render row(stage)}</div>
          {/if}
        </li>
      {/each}
    </ol>
    {#if summary}<figcaption class="biss-funnel-summary">{summary}</figcaption>{/if}
  {/if}
</figure>
