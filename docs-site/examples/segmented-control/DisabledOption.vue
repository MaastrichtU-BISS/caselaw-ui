<script setup lang="ts">
import { ref } from 'vue';
import { BissSegmentedControl } from 'biss-ui/vue';

const view = ref('list');
const views = [
  { value: 'list', label: 'List' },
  { value: 'board', label: 'Board' },
  { value: 'timeline', label: 'Timeline', disabled: true },
];
</script>

<template>
  <BissSegmentedControl
    label="Show deliverables as"
    :options="views"
    :value="view"
    @change="view = $event"
  />
</template>
