<script setup lang="ts">
import { BissCard, BissSectionHeader, BissStatusCell } from 'biss-ui/vue';

const grants = [
  { id: 1, title: 'ERC Starting Grant', funder: 'European Research Council', due: '14 Jan 2027', status: 'Drafting' },
  { id: 2, title: 'Vidi', funder: 'NWO Talent Programme', due: '3 Mar 2027', status: 'Internal review' },
];
</script>

<template>
  <div class="biss-split">
    <BissCard v-for="grant in grants" :key="grant.id">
      <BissSectionHeader :title="grant.title" :copy="grant.funder" />
      <p style="display: flex; justify-content: space-between; margin: 0">
        Due {{ grant.due }}
        <BissStatusCell :label="grant.status" />
      </p>
    </BissCard>
  </div>
</template>
