<script setup lang="ts">
import { ref } from 'vue';
import { BissColumnManager, BissPopover, type BissColumn } from 'biss-ui/vue';

const columns = ref<BissColumn[]>([
  { key: 'name', label: 'Name', visible: true, locked: true },
  { key: 'team', label: 'Team', visible: true },
  { key: 'role', label: 'Role', visible: true },
  { key: 'contract', label: 'Contract ends', visible: false },
]);
</script>

<template>
  <BissPopover label="Columns" :width="480">
    <BissColumnManager label="Staff columns" :columns="columns" @change="columns = $event" />
  </BissPopover>
</template>
