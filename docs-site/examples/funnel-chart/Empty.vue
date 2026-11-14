<script setup lang="ts">
import { BissFunnelChart } from 'biss-ui/vue';
</script>

<template>
  <BissFunnelChart
    label="Grant pipeline 2027"
    :stages="[]"
    empty-label="No grant ideas logged for 2027 yet."
  />
</template>
