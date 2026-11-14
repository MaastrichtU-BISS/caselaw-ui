<script setup lang="ts">
import { ref } from 'vue';
import { BissToggleGroup } from 'biss-ui/vue';

const layout = ref('board');
const items = [
  { value: 'list', label: 'List', icon: 'list' as const },
  { value: 'board', label: 'Board', icon: 'kanban' as const },
  { value: 'timeline', label: 'Timeline', icon: 'gantt' as const },
];
</script>

<template>
  <BissToggleGroup v-model="layout" :items="items" label="Layout" />
</template>
