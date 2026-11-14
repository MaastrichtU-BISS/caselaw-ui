<script setup lang="ts">
import { BissStatusCell } from 'biss-ui/vue';

const columns = [
  { label: 'Data collection', color: '#7c3aed' },
  { label: 'Analysis', color: '#0e7490' },
  { label: 'Writing up', color: '#b45309' },
];
</script>

<template>
  <BissStatusCell v-for="column in columns" :key="column.label" :label="column.label" :color="column.color" />
</template>
