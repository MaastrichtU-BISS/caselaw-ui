<script setup lang="ts">
import type { BissFactItem } from '../core/types';

withDefaults(
  defineProps<{
    items: BissFactItem[];
    label: string;
    compact?: boolean;
  }>(),
  {
    compact: false,
  },
);
</script>

<template>
  <dl
    class="biss-fact-strip"
    :class="{ 'biss-fact-strip-compact': compact }"
    :aria-label="label"
  >
    <div v-for="item in items" :key="item.label" class="biss-fact-strip-item">
      <dt class="biss-fact-strip-label">{{ item.label }}</dt>
      <dd
        class="biss-fact-strip-value"
        :class="{ 'biss-fact-strip-mono': item.mono }"
      >
        <span v-if="item.tone" class="biss-fact-strip-dot" :data-tone="item.tone" />
        <a v-if="item.href" :href="item.href">{{ item.value }}</a>
        <template v-else>{{ item.value }}</template>
      </dd>
    </div>
  </dl>
</template>
