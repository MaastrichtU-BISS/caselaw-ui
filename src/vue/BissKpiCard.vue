<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
  note?: string;
}>();
</script>

<template>
  <article class="biss-card biss-kpi-card">
    <div class="biss-kpi-label">{{ label }}</div>
    <div class="biss-kpi-value">{{ value }}</div>
    <div v-if="note" class="biss-kpi-note">{{ note }}</div>
  </article>
</template>
