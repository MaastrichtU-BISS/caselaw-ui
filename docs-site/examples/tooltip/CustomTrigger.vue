<script setup lang="ts">
import { BissIcon, BissTooltip } from 'biss-ui/vue';
</script>

<template>
  <p>
    Budget 2026
    <BissTooltip label="Why this budget is locked" text="Locked by Finance after the annual close.">
      <BissIcon name="lock" />
    </BissTooltip>
  </p>
</template>
