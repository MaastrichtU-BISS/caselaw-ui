<script setup lang="ts">
import { ref } from 'vue';
import { BissDataGrid, type BissColumn } from 'biss-ui/vue';

const columns = ref<BissColumn[]>([
  { key: 'title', label: 'Project', visible: true, width: 240 },
  { key: 'lead', label: 'Lead', visible: true, width: 170 },
  { key: 'deadline', label: 'Report due', visible: true, width: 140 },
]);
</script>

<template>
  <BissDataGrid
    label="Overdue reports"
    :rows="[]"
    :columns="columns"
    empty-label="No overdue reports. Everything is filed."
    @columns="columns = $event"
  />
</template>
