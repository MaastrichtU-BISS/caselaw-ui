<script setup lang="ts">
import { BissProgress } from 'biss-ui/vue';
</script>

<template>
  <BissProgress :value="62" label="Budget spent" show-label show-value />
  <BissProgress
    :value="3"
    :max="8"
    label="Files uploaded"
    value-text="3 of 8 files"
    show-label
    show-value
    tone="success"
  />
  <BissProgress :value="94" label="Storage used" show-label show-value tone="danger" size="sm" />
</template>
