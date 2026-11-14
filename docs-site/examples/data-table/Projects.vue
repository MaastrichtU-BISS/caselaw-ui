<script setup lang="ts">
import { BissBadge, BissDataTable, type BissTableColumn, type BissTone } from 'biss-ui/vue';

const columns: BissTableColumn[] = [
  { key: 'title', label: 'Project' },
  { key: 'lead', label: 'Lead' },
  { key: 'status', label: 'Status' },
  { key: 'budget', label: 'Budget', numeric: true },
  { key: 'ends', label: 'Ends' },
];

const projects = [
  { id: 'dls', title: 'Digital Legal Studies', lead: 'Mara Jansen', status: 'Active', budget: 742_000, ends: '2027-06-30' },
  { id: 'cle', title: 'Case Law Explorer', lead: 'Pedro Alves', status: 'Active', budget: 318_500, ends: '2026-12-31' },
  { id: 'eur', title: 'EU Citation Networks', lead: 'Ines Verbeek', status: 'At risk', budget: 205_000, ends: '2026-11-30' },
  { id: 'gdp', title: 'GDPR Enforcement Atlas', lead: 'Tom de Wit', status: 'Proposal', budget: 96_000, ends: '2028-03-31' },
  { id: 'ail', title: 'AI and Liability', lead: 'Sofia Rossi', status: 'Closed', budget: 410_000, ends: '2025-09-30' },
];

const tones: Record<string, BissTone> = {
  Active: 'success',
  'At risk': 'warning',
  Proposal: 'info',
  Closed: 'neutral',
};

const euros = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});
</script>

<template>
  <BissDataTable :columns="columns" :rows="projects">
    <template #cell-status="{ value }">
      <BissBadge :tone="tones[value]" dot>{{ value }}</BissBadge>
    </template>
    <template #cell-budget="{ value }">{{ euros.format(value) }}</template>
  </BissDataTable>
</template>
