<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissIcon, BissPageBar, BissViewTabs } from 'biss-ui/vue';

const view = ref('drafts');
const views = [
  { key: 'drafts', label: 'Drafts', count: 12 },
  { key: 'submitted', label: 'Submitted', count: 31 },
  { key: 'awarded', label: 'Awarded', count: 9 },
];
</script>

<template>
  <BissPageBar
    title="Grant applications"
    meta="52 in 2026"
    description="Applications from the Law faculty to external funders."
  >
    <template #actions>
      <BissButton variant="secondary">Export</BissButton>
      <BissButton><BissIcon name="plus" />New application</BissButton>
    </template>
    <template #tabs>
      <BissViewTabs v-model="view" :items="views" label="Application status" />
    </template>
  </BissPageBar>
</template>
