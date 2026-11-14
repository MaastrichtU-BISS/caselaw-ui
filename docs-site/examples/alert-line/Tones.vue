<script setup lang="ts">
import { BissAlertLine } from 'biss-ui/vue';
</script>

<template>
  <BissAlertLine>The grants office is closed between 24 December and 2 January.</BissAlertLine>
  <BissAlertLine tone="warning">Your storage quota is 92% full.</BissAlertLine>
  <BissAlertLine tone="danger">The repository sync failed. Changes since 09:40 are not backed up.</BissAlertLine>
</template>
