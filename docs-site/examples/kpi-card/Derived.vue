<script setup lang="ts">
import { BissKpiCard } from 'biss-ui/vue';

const grants = [
  { funder: 'NWO', amount: 742_000, awarded: true },
  { funder: 'ERC', amount: 1_480_000, awarded: true },
  { funder: 'Horizon Europe', amount: 2_100_000, awarded: false },
  { funder: 'ZonMw', amount: 318_500, awarded: true },
];

const euros = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  maximumFractionDigits: 1,
});

const awarded = grants.filter((grant) => grant.awarded);
const total = awarded.reduce((sum, grant) => sum + grant.amount, 0);
const successRate = Math.round((awarded.length / grants.length) * 100);
</script>

<template>
  <div class="biss-kpi-grid">
    <BissKpiCard
      label="Funding awarded"
      :value="euros.format(total)"
      :note="`${awarded.length} of ${grants.length} applications`"
    />
    <BissKpiCard label="Success rate" :value="`${successRate}%`" note="Faculty average is 31%" />
  </div>
</template>
