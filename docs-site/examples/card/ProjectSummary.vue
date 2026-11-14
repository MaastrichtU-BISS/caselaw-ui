<script setup lang="ts">
import { BissBadge, BissButton, BissCard, BissSectionHeader } from 'biss-ui/vue';
</script>

<template>
  <BissCard style="width: min(100%, 420px)">
    <BissSectionHeader
      title="Automated case law annotation"
      copy="NWO Open Science · Law and Tech Lab"
    >
      <template #actions>
        <BissBadge tone="success">Funded</BissBadge>
      </template>
    </BissSectionHeader>
    <p style="margin: 0 0 16px">
      Builds an open corpus of annotated Dutch court decisions. Next milestone: annotation guidelines
      due 12 December.
    </p>
    <div class="biss-form-actions" style="margin: 0">
      <BissButton variant="secondary" size="sm">Share</BissButton>
      <BissButton size="sm">Open project</BissButton>
    </div>
  </BissCard>
</template>
