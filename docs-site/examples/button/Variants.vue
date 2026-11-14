<script setup lang="ts">
import { BissButton } from 'biss-ui/vue';
</script>

<template>
  <BissButton>New project</BissButton>
  <BissButton variant="secondary">Import</BissButton>
  <BissButton variant="ghost">Cancel</BissButton>
  <BissButton variant="danger-quiet">Archive</BissButton>
  <BissButton variant="danger">Delete project</BissButton>
</template>
