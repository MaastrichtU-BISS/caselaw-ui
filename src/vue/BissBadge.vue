<script setup lang="ts">
import { computed } from 'vue';
import type { BissTone } from '../core/types';

const props = withDefaults(
  defineProps<{
    tone?: BissTone;
    dot?: boolean;
    mono?: boolean;
    quiet?: boolean;
  }>(),
  {
    tone: 'neutral',
    dot: false,
    mono: false,
    quiet: false,
  },
);

const classes = computed(() =>
  [
    'biss-badge',
    props.tone === 'neutral' ? '' : `biss-badge-${props.tone}`,
    props.mono ? 'biss-badge-mono' : '',
    props.quiet ? 'biss-badge-quiet' : '',
  ].filter(Boolean),
);
</script>

<template>
  <span :class="classes">
    <span v-if="dot" class="biss-badge-dot" />
    <slot />
  </span>
</template>
