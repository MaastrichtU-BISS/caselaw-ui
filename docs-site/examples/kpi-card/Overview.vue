<script setup lang="ts">
import { BissKpiCard } from 'biss-ui/vue';
</script>

<template>
  <div class="biss-kpi-grid">
    <BissKpiCard label="Active projects" :value="42" note="3 more than in September" />
    <BissKpiCard label="Open grant calls" :value="7" note="Next deadline 2 December" />
    <BissKpiCard label="Budget committed" value="€1.84M" note="68% of the 2026 allocation" />
    <BissKpiCard label="Reports due" :value="5" note="2 this week" />
  </div>
</template>
