<script setup lang="ts">
import { ref } from 'vue';
import { BissTabs } from 'biss-ui/vue';

const view = ref('active');
const items = [
  { value: 'active', label: 'Active', count: 12 },
  { value: 'review', label: 'In review', count: 3 },
  { value: 'archived', label: 'Archived' },
];
</script>

<template>
  <BissTabs v-model="view" :items="items" label="Project views">
    <template #active>Twelve projects are running across three teams.</template>
    <template #review>Three projects are waiting for an ethics review.</template>
    <template #archived>Archived projects stay searchable and read-only.</template>
  </BissTabs>
  <p>Selected: {{ view }}</p>
</template>
