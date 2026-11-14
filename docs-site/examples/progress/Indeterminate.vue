<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { BissButton, BissProgress } from 'biss-ui/vue';

const value = ref<number | null>(null);
let timer: ReturnType<typeof setInterval> | undefined;

function start() {
  value.value = null;
  clearInterval(timer);
  setTimeout(() => {
    value.value = 0;
    timer = setInterval(() => {
      value.value = Math.min(100, (value.value ?? 0) + 10);
      if (value.value === 100) clearInterval(timer);
    }, 250);
  }, 1200);
}
onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <BissProgress :value="value" label="Importing records" show-label show-value />
  <BissButton variant="secondary" size="sm" @click="start">Run import</BissButton>
</template>
