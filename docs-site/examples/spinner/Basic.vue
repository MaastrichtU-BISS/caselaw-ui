<script setup lang="ts">
import { BissSpinner } from 'biss-ui/vue';
</script>

<template>
  <BissSpinner label="Loading projects" />
  <BissSpinner size="sm" label="Saving" />
  <span><BissSpinner size="sm" decorative /> Checking access…</span>
</template>
