<script setup lang="ts">
import type { CleStat } from "../types";

defineProps<{
  stats: CleStat[];
}>();
</script>

<template>
  <dl class="cle-stat-list">
    <div v-for="stat in stats" :key="stat.label" class="cle-stat-row">
      <dt class="cle-stat-label">{{ stat.label }}</dt>
      <dd class="cle-stat-value">{{ stat.value }}</dd>
    </div>
  </dl>
</template>
