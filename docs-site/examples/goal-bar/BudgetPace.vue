<script setup lang="ts">
import { BissGoalBar } from 'biss-ui/vue';

// 58% of the project's time has passed.
const elapsed = 0.58;

const workPackages = [
  { id: 'wp1', name: 'WP1 Case law corpus', spent: 0.71 },
  { id: 'wp2', name: 'WP2 Data infrastructure', spent: 0.44 },
  { id: 'wp3', name: 'WP3 Citation analysis', spent: 0.6 },
  { id: 'wp4', name: 'WP4 Dissemination', spent: 0.18 },
];

const percent = (value: number) => `${Math.round(value * 100)}%`;
</script>

<template>
  <ul class="work-packages">
    <li v-for="wp in workPackages" :key="wp.id">
      <span>
        {{ wp.name }}
        <small class="biss-muted">{{ percent(wp.spent) }} spent</small>
      </span>
      <BissGoalBar :value="wp.spent" :expected="elapsed" :label="`${wp.name} budget spent`" />
    </li>
  </ul>
</template>

<style scoped>
  .work-packages {
    display: grid;
    gap: 14px;
    width: min(100%, 28rem);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .work-packages li {
    display: grid;
    gap: 6px;
  }
  .work-packages span {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
</style>
