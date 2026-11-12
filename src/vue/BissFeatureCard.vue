<script setup lang="ts">
/**
 * One capability, stated in a sentence.
 *
 * The icon is not decoration: these cards are read in a row, and the mark is
 * what distinguishes them from each other before any of the text is read.
 */
import type { BissServiceIconName } from '../core/service-icons';
import BissCard from './BissCard.vue';
import BissServiceIcon from './BissServiceIcon.vue';

defineProps<{
  icon?: BissServiceIconName;
  title: string;
  /** Ignored when the default slot is used, so markup is possible. */
  copy?: string;
}>();
</script>

<template>
  <BissCard class="biss-feature-card">
    <BissServiceIcon v-if="icon" :icon="icon" />
    <h3 class="biss-feature-card-title">{{ title }}</h3>
    <p class="biss-feature-card-copy">
      <slot>{{ copy }}</slot>
    </p>
  </BissCard>
</template>
