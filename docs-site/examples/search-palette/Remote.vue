<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissSearchPalette, type BissSearchItem } from 'biss-ui/vue';

const rulings: BissSearchItem[] = [
  { key: '1', label: 'Schrems II', description: 'C-311/18 · Court of Justice, 2020' },
  { key: '2', label: 'Google Spain', description: 'C-131/12 · Court of Justice, 2014' },
  { key: '3', label: 'Urgenda', description: 'ECLI:NL:HR:2019:2007 · Supreme Court, 2019' },
  { key: '4', label: 'Digital Rights Ireland', description: 'C-293/12 · Court of Justice, 2014' },
];
const open = ref(false);
const loading = ref(false);
const results = ref<BissSearchItem[]>([]);
let timer: ReturnType<typeof setTimeout> | undefined;

function search(query: string) {
  clearTimeout(timer);
  loading.value = true;
  timer = setTimeout(() => {
    // Replace with a request to your search endpoint.
    const q = query.toLowerCase();
    results.value = rulings.filter((r) => (r.label + r.description).toLowerCase().includes(q));
    loading.value = false;
  }, 500);
}
</script>

<template>
  <BissButton variant="secondary" @click="open = true">Find a ruling</BissButton>
  <BissSearchPalette
    :open="open"
    :items="results"
    :loading="loading"
    label="Find a ruling"
    placeholder="Case name or number"
    empty-label="Type to search 48,000 rulings"
    @query="search"
    @pick="open = false"
    @close="open = false"
  />
</template>
