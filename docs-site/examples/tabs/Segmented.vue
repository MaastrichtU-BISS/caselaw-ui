<script setup lang="ts">
import { ref } from 'vue';
import { BissTabs } from 'biss-ui/vue';

const mode = ref('chart');
const items = [
  { value: 'chart', label: 'Chart' },
  { value: 'table', label: 'Table' },
  { value: 'export', label: 'Export', disabled: true },
];
</script>

<template>
  <BissTabs v-model="mode" :items="items" label="Display" variant="segmented" size="sm">
    <template #chart>Publications per quarter, as a line chart.</template>
    <template #table>Publications per quarter, as a table.</template>
  </BissTabs>
</template>
