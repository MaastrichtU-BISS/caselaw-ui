<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissButton, BissEmptyState, BissInput } from 'biss-ui/vue';

const datasets = ['Court decisions 2015–2024', 'Parliamentary questions', 'EU regulations corpus'];
const query = ref('tax tribunal');

const matches = computed(() =>
  datasets.filter((name) => name.toLowerCase().includes(query.value.toLowerCase())),
);
</script>

<template>
  <BissInput v-model="query" type="search" aria-label="Search datasets" placeholder="Search datasets" />
  <ul v-if="matches.length">
    <li v-for="name in matches" :key="name">{{ name }}</li>
  </ul>
  <BissEmptyState v-else title="No datasets match" :copy="`Nothing is called “${query}”.`">
    <BissButton variant="secondary" size="sm" @click="query = ''">Clear search</BissButton>
  </BissEmptyState>
</template>
