<script setup lang="ts">
import { BissDataTable, type BissTableColumn } from 'biss-ui/vue';

const columns: BissTableColumn[] = [
  { key: 'applicant', label: 'Applicant' },
  { key: 'call', label: 'Call' },
  { key: 'requested', label: 'Requested (€k)', numeric: true },
  { key: 'submitted', label: 'Submitted' },
];

const applications = [
  { id: 1, applicant: 'Anna Kowalski', call: 'Veni 2026', requested: 320, submitted: '2026-09-02' },
  { id: 2, applicant: 'Ben Okafor', call: 'ERC Starting', requested: 1500, submitted: '2026-10-14' },
  { id: 3, applicant: 'Chloé Martin', call: 'Open Competition', requested: 750, submitted: '2026-08-21' },
  { id: 4, applicant: 'Daan Hendriks', call: 'Veni 2026', requested: 320, submitted: '2026-09-05' },
  { id: 5, applicant: 'Elif Demir', call: 'Horizon Cluster 2', requested: 2100, submitted: '2026-10-01' },
  { id: 6, applicant: 'Femke Bakker', call: 'Open Competition', requested: 680, submitted: '2026-08-30' },
  { id: 7, applicant: 'Gabriel Costa', call: 'ERC Starting', requested: 1480, submitted: '2026-10-15' },
  { id: 8, applicant: 'Hannah Schmidt', call: 'Veni 2026', requested: 320, submitted: '2026-09-04' },
  { id: 9, applicant: 'Iris van Dam', call: 'Horizon Cluster 2', requested: 1900, submitted: '2026-09-28' },
  { id: 10, applicant: 'Jonas Peeters', call: 'Open Competition', requested: 560, submitted: '2026-08-19' },
  { id: 11, applicant: 'Karin Lund', call: 'ERC Starting', requested: 1350, submitted: '2026-10-11' },
  { id: 12, applicant: 'Luca Bianchi', call: 'Veni 2026', requested: 320, submitted: '2026-09-06' },
];
</script>

<template>
  <BissDataTable :columns="columns" :rows="applications" :page-size="5" />
</template>
