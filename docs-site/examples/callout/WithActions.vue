<script setup lang="ts">
import { BissButton, BissCallout } from 'biss-ui/vue';
</script>

<template>
  <div style="width: min(100%, 520px)">
    <BissCallout tone="warning" title="Budget exceeds the funder’s cap">
      Personnel costs are €18,400 over the €1.5 million limit for this call.
      <template #actions>
        <BissButton size="sm" variant="secondary">Review budget</BissButton>
      </template>
    </BissCallout>
  </div>
</template>
