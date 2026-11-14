<script setup lang="ts">
import { BissCard, BissEmptyState, BissSectionHeader } from 'biss-ui/vue';
</script>

<template>
  <BissCard>
    <BissSectionHeader title="Upcoming deadlines" copy="Next 30 days" />
    <BissEmptyState
      title="No deadlines this month"
      copy="Deadlines from your projects and grant calls show up here."
    />
  </BissCard>
</template>
