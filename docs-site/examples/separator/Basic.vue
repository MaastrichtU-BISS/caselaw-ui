<script setup lang="ts">
import { BissButton, BissSeparator } from 'biss-ui/vue';
</script>

<template>
  <p>Signed in as Ada Lovelace</p>
  <BissSeparator />
  <BissSeparator label="or continue with" />
  <div style="display: flex; align-items: center; gap: 8px; height: 32px">
    <BissButton variant="ghost" size="sm">Docs</BissButton>
    <BissSeparator orientation="vertical" />
    <BissButton variant="ghost" size="sm">Support</BissButton>
  </div>
</template>
