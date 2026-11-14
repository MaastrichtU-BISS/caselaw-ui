<script setup lang="ts">
import { ref } from 'vue';
import { BissBarChart, BissGoalBar, BissWidgetGrid, type BissChartPoint } from 'biss-ui/vue';

const widgets = ref([
  { id: 'submissions', title: 'Ethics submissions', span: 2 },
  { id: 'budget', title: 'Budget spent' },
  { id: 'deadlines', title: 'Upcoming deadlines' },
]);

const submissions: BissChartPoint[] = [
  { label: 'Jun', value: 18, compare: 3 },
  { label: 'Jul', value: 12, compare: 2 },
  { label: 'Aug', value: 9, compare: 1 },
  { label: 'Sep', value: 27, compare: 6 },
  { label: 'Oct', value: 31, compare: 5 },
  { label: 'Nov', value: 22, compare: 4 },
];

const deadlines = [
  { id: 'veni', name: 'Veni pre-proposal', due: '2 Dec' },
  { id: 'erc', name: 'ERC mid-term report', due: '15 Dec' },
  { id: 'dmp', name: 'Data management plan', due: '9 Jan' },
];
</script>

<template>
  <BissWidgetGrid :items="widgets" @change="widgets = $event">
    <template #default="{ item }">
      <BissBarChart
        v-if="item.id === 'submissions'"
        :points="submissions"
        series-label="Submitted"
        compare-label="Returned"
      />
      <div v-else-if="item.id === 'budget'" class="biss-stack biss-stack-sm">
        <span>€460,200 of €742,000</span>
        <BissGoalBar :value="0.62" :expected="0.58" label="Project budget spent" />
      </div>
      <ul v-else-if="item.id === 'deadlines'" class="deadlines">
        <li v-for="deadline in deadlines" :key="deadline.id">
          {{ deadline.name }} <span class="biss-muted">{{ deadline.due }}</span>
        </li>
      </ul>
    </template>
  </BissWidgetGrid>
</template>

<style scoped>
  .deadlines {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .deadlines li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
</style>
