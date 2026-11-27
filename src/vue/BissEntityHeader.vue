<script setup lang="ts">
import { useSlots } from 'vue';
import type { BissFactItem } from '../core/types';
import BissFactStrip from './BissFactStrip.vue';

withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    facts?: BissFactItem[];
    factsLabel?: string;
    /** `plain` sits open on a white panel with a bottom hairline; `band` adds a warm linen surface band. */
    variant?: 'plain' | 'band';
    flush?: boolean;
  }>(),
  {
    subtitle: undefined,
    facts: undefined,
    factsLabel: 'Details',
    variant: 'plain',
    flush: false,
  },
);

const slots = useSlots();
</script>

<template>
  <header
    class="biss-entity-header"
    :class="{
      'biss-entity-header-band': variant === 'band',
      'biss-entity-header-flush': flush,
      'biss-entity-header-has-tabs': Boolean(slots.tabs),
    }"
  >
    <div v-if="slots.meta" class="biss-entity-header-meta">
      <slot name="meta" />
    </div>
    <div class="biss-entity-header-row">
      <div class="biss-entity-header-main">
        <div v-if="slots.leading" class="biss-entity-header-leading">
          <slot name="leading" />
        </div>
        <div class="biss-entity-header-text">
          <h1 class="biss-entity-header-title">{{ title }}</h1>
          <p v-if="subtitle" class="biss-entity-header-subtitle">{{ subtitle }}</p>
        </div>
      </div>
      <div v-if="slots.actions" class="biss-entity-header-actions">
        <slot name="actions" />
      </div>
    </div>
    <div v-if="facts?.length || slots.facts" class="biss-entity-header-facts">
      <slot name="facts">
        <BissFactStrip v-if="facts?.length" :items="facts" :label="factsLabel" compact />
      </slot>
    </div>
    <slot />
    <div v-if="slots.tabs" class="biss-entity-header-tabs">
      <slot name="tabs" />
    </div>
  </header>
</template>
