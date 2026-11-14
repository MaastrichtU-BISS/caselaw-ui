<script setup lang="ts">
import { BissButton } from 'biss-ui/vue';
</script>

<template>
  <BissButton href="#/components" variant="secondary">Browse components</BissButton>
  <BissButton href="#/components" variant="secondary" disabled>Not available</BissButton>
</template>
