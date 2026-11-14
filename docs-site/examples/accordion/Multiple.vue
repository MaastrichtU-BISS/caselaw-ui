<script setup lang="ts">
import { ref } from 'vue';
import { BissAccordion, BissBadge } from 'biss-ui/vue';

const open = ref<string[]>(['budget']);
const items = [
  { value: 'budget', title: 'Budget' },
  { value: 'team', title: 'Team' },
];
</script>

<template>
  <BissAccordion v-model="open" :items="items" type="multiple">
    <template #budget>€240k awarded · <BissBadge tone="success">62% spent</BissBadge></template>
    <template #team>Ada Lovelace, Grace Hopper and Alan Turing.</template>
  </BissAccordion>
</template>
