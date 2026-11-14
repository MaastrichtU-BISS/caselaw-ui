<script setup lang="ts">
import { ref } from 'vue';
import {
  BissImportMapper,
  type BissImportColumn,
  type BissImportField,
  type BissImportMapping,
} from 'biss-ui/vue';

const columns: BissImportColumn[] = [
  { key: 'Grant name', samples: ['Open justice', 'Courts and citizens', 'Public access'] },
  { key: 'PI', samples: ['Ada Lovelace', 'Grace Hopper', 'Alan Turing'] },
  { key: 'Funder', samples: ['NWO', 'ERC', 'Horizon Europe'] },
  { key: 'Amount (€)', samples: [240000, 1500000, 480000] },
  { key: 'Kick-off', samples: ['2026-01-01', '2026-03-01', '2027-01-01'] },
  { key: 'Internal notes', samples: ['Check overhead', null, ''] },
];
const fields: BissImportField[] = [
  { key: 'title', label: 'Project title', required: true, aliases: ['Grant name', 'Name'] },
  { key: 'lead', label: 'Principal investigator', aliases: ['PI', 'Lead'] },
  { key: 'funder', label: 'Funder' },
  { key: 'budget', label: 'Budget', required: true, aliases: ['Amount'] },
  { key: 'start', label: 'Start date', required: true, aliases: ['Begin'] },
];
const mapping = ref<BissImportMapping>({});
const imported = ref('');

function submit(result: BissImportMapping) {
  // Send the mapping to your import endpoint; show its preview next.
  imported.value = Object.values(result).filter(Boolean).length + ' columns sent to the preview';
}
</script>

<template>
  <BissImportMapper
    v-model:mapping="mapping"
    :columns="columns"
    :fields="fields"
    :steps="['Upload', 'Match columns', 'Review']"
    :step="2"
    description="grants-2026.xlsx · 48 rows"
    @submit="submit"
  />
  <p v-if="imported" role="status" class="example-status">{{ imported }}</p>
</template>

<style scoped>
.example-status {
  margin: 12px 0 0;
  color: var(--biss-success);
  font-size: 13px;
}
</style>
