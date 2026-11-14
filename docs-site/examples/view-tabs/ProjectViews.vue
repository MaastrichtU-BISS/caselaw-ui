<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissViewTabs } from 'biss-ui/vue';

const projects = [
  { name: 'Case law annotation', status: 'active' },
  { name: 'Court data portal', status: 'active' },
  { name: 'Citation network study', status: 'active' },
  { name: 'Legal NLP benchmark', status: 'review' },
  { name: 'Open access monitor', status: 'archived' },
];

const view = ref('active');

const count = (status: string) => projects.filter((project) => project.status === status).length;
const views = [
  { key: 'all', label: 'All projects', count: projects.length },
  { key: 'active', label: 'Active', count: count('active') },
  { key: 'review', label: 'In review', count: count('review') },
  { key: 'archived', label: 'Archived', count: count('archived') },
];

const visible = computed(() =>
  projects.filter((project) => view.value === 'all' || project.status === view.value),
);
</script>

<template>
  <BissViewTabs v-model="view" :items="views" label="Project views" />
  <ul>
    <li v-for="project in visible" :key="project.name">{{ project.name }}</li>
  </ul>
</template>
