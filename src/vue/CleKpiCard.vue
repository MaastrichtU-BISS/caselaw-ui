<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
  note?: string;
}>();
</script>

<template>
  <article class="cle-card cle-kpi-card">
    <div class="cle-kpi-label">{{ label }}</div>
    <div class="cle-kpi-value">{{ value }}</div>
    <div v-if="note" class="cle-kpi-note">{{ note }}</div>
  </article>
</template>
