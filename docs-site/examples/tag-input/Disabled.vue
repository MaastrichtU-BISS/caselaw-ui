<script setup lang="ts">
import { BissTagInput } from 'biss-ui/vue';
</script>

<template>
  <div style="width: min(100%, 26rem)">
    <BissTagInput :model-value="['open-data', 'CC-BY-4.0', 'ECLI']" disabled />
  </div>
</template>
