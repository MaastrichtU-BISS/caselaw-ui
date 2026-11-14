<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissValuePicker, type BissPickOption } from 'biss-ui/vue';

const funders = ref(['industry']);
const exclude = ref(true);
const options: BissPickOption[] = [
  { value: 'nwo', label: 'NWO', count: 12 },
  { value: 'erc', label: 'European Research Council', count: 5 },
  { value: 'horizon', label: 'Horizon Europe', count: 9 },
  { value: 'industry', label: 'Industry partners', count: 6 },
  { value: 'internal', label: 'University funds', count: 14 },
];

const summary = computed(() =>
  funders.value.length
    ? `Funder ${exclude.value ? 'is not' : 'is'} ${funders.value.length} selected`
    : 'No funder filter',
);
</script>

<template>
  <div class="biss-stack biss-stack-sm">
    <BissValuePicker
      label="Funder"
      :options="options"
      :selected="funders"
      :negate="exclude"
      can-negate
      search-label="Search funders"
      @change="funders = $event"
      @negate="exclude = $event"
    />
    <p role="status" style="margin: 0; color: var(--biss-muted)">{{ summary }}</p>
  </div>
</template>
