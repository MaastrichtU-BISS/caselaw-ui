<script setup lang="ts">
import { ref } from 'vue';
import { BissSegmentedControl } from 'biss-ui/vue';

const range = ref('quarter');
const ranges = [
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: 'Quarter' },
  { value: 'year', label: 'Year' },
];
const spent: Record<string, string> = {
  month: '€18,400',
  quarter: '€52,900',
  year: '€187,300',
};
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="align-items: center">
    <BissSegmentedControl
      label="Reporting period"
      :options="ranges"
      :value="range"
      @change="range = $event"
    />
    <p role="status" style="margin: 0">Spent this {{ range }}: <b>{{ spent[range] }}</b></p>
  </div>
</template>
