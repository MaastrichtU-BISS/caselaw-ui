<script setup lang="ts">
import { BissGoalBar } from 'biss-ui/vue';

const goals = [
  { id: 'papers', label: 'Journal articles published', value: 0.9, note: '9 of 10', tone: 'success' },
  { id: 'hours', label: 'Annotation hours logged', value: 0.52, note: '520 of 1,000', tone: 'warning' },
  { id: 'travel', label: 'Travel budget used', value: 1, note: '€12,400 of €11,000', tone: 'danger' },
] as const;
</script>

<template>
  <ul class="goals">
    <li v-for="goal in goals" :key="goal.id">
      <span>
        {{ goal.label }}
        <small class="biss-muted">{{ goal.note }}</small>
      </span>
      <BissGoalBar :value="goal.value" :tone="goal.tone" :label="goal.label" />
    </li>
  </ul>
</template>

<style scoped>
  .goals {
    display: grid;
    gap: 14px;
    width: min(100%, 28rem);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .goals li {
    display: grid;
    gap: 6px;
  }
  .goals span {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
</style>
