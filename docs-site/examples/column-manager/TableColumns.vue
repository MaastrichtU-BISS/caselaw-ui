<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissColumnManager, type BissColumn } from 'biss-ui/vue';

const columns = ref<BissColumn[]>([
  { key: 'reference', label: 'Reference', visible: true, width: 120, locked: true },
  { key: 'title', label: 'Project title', visible: true, width: 240, pinned: true },
  { key: 'lead', label: 'Principal investigator', visible: true, width: 180 },
  { key: 'funder', label: 'Funder', visible: true, width: 150 },
  { key: 'budget', label: 'Budget', visible: false, width: 120 },
  { key: 'ends', label: 'End date', visible: false, width: 120 },
]);
const shown = computed(() => columns.value.filter((column) => column.visible).length);
</script>

<template>
  <div class="biss-stack biss-stack-sm">
    <BissColumnManager
      label="Project register columns"
      :columns="columns"
      @change="columns = $event"
    />
    <p role="status">{{ shown }} of {{ columns.length }} columns shown</p>
  </div>
</template>
