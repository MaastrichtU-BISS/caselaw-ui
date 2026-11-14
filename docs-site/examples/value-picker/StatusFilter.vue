<script setup lang="ts">
import { ref } from 'vue';
import { BissValuePicker, type BissPickOption } from 'biss-ui/vue';

const selected = ref(['active', 'review']);
const statuses: BissPickOption[] = [
  { value: 'draft', label: 'Draft', color: 'var(--biss-muted)', count: 4 },
  { value: 'review', label: 'In review', color: 'var(--biss-warning)', count: 7 },
  { value: 'active', label: 'Active', color: 'var(--biss-success)', count: 18 },
  { value: 'paused', label: 'Paused', color: 'var(--biss-danger)', count: 2 },
  { value: 'closed', label: 'Closed', color: 'var(--biss-border-strong)', count: 31 },
];
</script>

<template>
  <BissValuePicker
    label="Status"
    :options="statuses"
    :selected="selected"
    search-label="Search statuses"
    @change="selected = $event"
  />
</template>
