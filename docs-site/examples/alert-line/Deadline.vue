<script setup lang="ts">
import { BissAlertLine, BissButton } from 'biss-ui/vue';
</script>

<template>
  <BissAlertLine tone="warning">
    Quarterly progress reports for 3 projects are due on 30 November.
    <template #actions>
      <BissButton size="sm" variant="ghost">View reports</BissButton>
    </template>
  </BissAlertLine>
</template>
