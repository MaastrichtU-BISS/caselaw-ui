<script setup lang="ts">
import { computed } from 'vue';
import type { BissTone } from '../core/types';

const props = withDefaults(
  defineProps<{
    tone?: BissTone;
    title?: string;
  }>(),
  {
    tone: 'info',
  },
);

const classes = computed(() =>
  [
    'biss-callout',
    props.tone === 'neutral' || props.tone === 'info' ? '' : `biss-callout-${props.tone}`,
  ].filter(Boolean),
);
</script>

<template>
  <div :class="classes" role="status">
    <div>
      <p v-if="title" class="biss-callout-title">{{ title }}</p>
      <div class="biss-callout-body"><slot /></div>
    </div>
    <slot name="actions" />
  </div>
</template>
