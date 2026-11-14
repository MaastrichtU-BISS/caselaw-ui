<script setup lang="ts">
import { BissButton, BissEmptyState, BissIcon } from 'biss-ui/vue';
</script>

<template>
  <BissEmptyState
    title="No projects yet"
    copy="Projects collect your team’s grants, datasets and deadlines in one place."
  >
    <BissButton><BissIcon name="plus" />New project</BissButton>
  </BissEmptyState>
</template>
