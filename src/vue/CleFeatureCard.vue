<script setup lang="ts">
/**
 * One capability, stated in a sentence.
 *
 * The icon is not decoration: these cards are read in a row, and the mark is
 * what distinguishes them from each other before any of the text is read.
 */
import type { CleServiceIconName } from "../icons";
import CleCard from "./CleCard.vue";
import CleServiceIcon from "./CleServiceIcon.vue";

defineProps<{
  icon?: CleServiceIconName;
  title: string;
  /** Ignored when the default slot is used, so markup is possible. */
  copy?: string;
}>();
</script>

<template>
  <CleCard class="cle-feature-card">
    <CleServiceIcon v-if="icon" :icon="icon" />
    <h3 class="cle-feature-card-title">{{ title }}</h3>
    <p class="cle-feature-card-copy"><slot>{{ copy }}</slot></p>
  </CleCard>
</template>
