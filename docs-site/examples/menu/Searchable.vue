<script setup lang="ts">
import { ref } from 'vue';
import { BissMenu, type BissMenuItem } from 'biss-ui/vue';

const projects: BissMenuItem[] = [
  { key: 'ecli', label: 'ECLI citation network', icon: 'folder' },
  { key: 'gdpr', label: 'GDPR enforcement tracker', icon: 'folder' },
  { key: 'cjeu', label: 'CJEU preliminary references', icon: 'folder' },
  { key: 'asylum', label: 'Asylum appeals dataset', icon: 'folder' },
  { key: 'climate', label: 'Climate litigation review', icon: 'folder' },
  { key: 'tax', label: 'Tax ruling annotations', icon: 'folder' },
];
const destination = ref('GDPR enforcement tracker');
</script>

<template>
  <BissMenu
    label="Move to project"
    searchable
    search-label="Find a project"
    empty-label="No project with that name"
    :items="projects"
    @pick="destination = $event.label"
  />
  <p role="status">In {{ destination }}</p>
</template>
