<script setup lang="ts">
/**
 * Stages of a pipeline as one narrowing shape, with the count of each stage and
 * the share that continues from the stage before. Every figure is written out
 * beside the shape, so the chart never relies on width or color alone.
 */
import { computed } from 'vue';
import { funnelLayout, type BissFunnelStage } from '../core/charts';
import { fillLabel } from '../core/blocks';

const props = withDefaults(
  defineProps<{
    stages: BissFunnelStage[];
    /** Accessible name of the chart, for example “Grant pipeline 2026”. */
    label: string;
    locale?: string;
    /** Render each stage as a button that emits `pick`. */
    interactive?: boolean;
    /** Conversion from the previous stage. `{percent}` is replaced. */
    conversionLabel?: string;
    /** The summary under the chart. `{percent}`, `{first}` and `{last}` are replaced. Empty hides it. */
    overallLabel?: string;
    emptyLabel?: string;
  }>(),
  {
    locale: 'en-GB',
    interactive: false,
    conversionLabel: '{percent} of previous',
    overallLabel: '{percent} of {first} reach {last}',
    emptyLabel: 'No stages to show yet.',
  },
);
const emit = defineEmits<{ pick: [stage: BissFunnelStage] }>();
const chart = computed(() => funnelLayout(props.stages));
const count = computed(() => new Intl.NumberFormat(props.locale));
const percent = (n: number) =>
  new Intl.NumberFormat(props.locale, {
    style: 'percent',
    maximumFractionDigits: n > 0 && n < 0.1 ? 1 : 0,
  }).format(n);
const shade = (index: number) =>
  props.stages.length > 1 ? 1 - (index / (props.stages.length - 1)) * 0.5 : 1;
const summary = computed(() => {
  const c = chart.value;
  if (!props.overallLabel || c.overall === null) return '';
  return fillLabel(props.overallLabel, {
    percent: percent(c.overall),
    first: props.stages[0]?.label ?? '',
    last: props.stages.at(-1)?.label ?? '',
  });
});
function pick(index: number) {
  const stage = props.stages[index];
  if (stage) emit('pick', stage);
}
</script>

<template>
  <figure class="biss-funnel">
    <p v-if="chart.empty" class="biss-funnel-empty">{{ emptyLabel }}</p>
    <template v-else>
      <ol class="biss-funnel-stages" :aria-label="label">
        <li v-for="stage in chart.stages" :key="stage.key">
          <component
            :is="interactive ? 'button' : 'div'"
            :type="interactive ? 'button' : undefined"
            class="biss-funnel-row"
            @click="interactive && pick(stage.index)"
          >
            <span class="biss-funnel-label"
              ><strong>{{ stage.label }}</strong
              ><small v-if="stage.note">{{ stage.note }}</small></span
            >
            <svg
              class="biss-funnel-shape"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon
                :points="stage.points"
                :style="{ fill: stage.color ?? 'var(--biss-primary)' }"
                :fill-opacity="stage.color ? 1 : shade(stage.index)"
              />
            </svg>
            <span class="biss-funnel-value"
              ><b>{{ stage.display ?? count.format(stage.value) }}</b
              ><small v-if="stage.conversion !== null">{{
                fillLabel(conversionLabel, { percent: percent(stage.conversion) })
              }}</small></span
            >
          </component>
        </li>
      </ol>
      <figcaption v-if="summary" class="biss-funnel-summary">{{ summary }}</figcaption>
    </template>
  </figure>
</template>
