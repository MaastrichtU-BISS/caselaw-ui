<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissIcon, BissViewTabs } from 'biss-ui/vue';

const views = [
  { key: 'open', label: 'Open tasks', count: 18 },
  { key: 'mine', label: 'Assigned to me', count: 4 },
  { key: 'done', label: 'Completed', count: 0, disabled: true },
];

const view = ref('open');
</script>

<template>
  <BissViewTabs v-model="view" :items="views" label="Task views">
    <template #end>
      <BissButton size="sm" variant="ghost" style="margin-left: auto">
        <BissIcon name="plus" />New view
      </BissButton>
    </template>
  </BissViewTabs>
</template>
