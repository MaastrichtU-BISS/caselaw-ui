<script setup lang="ts">
import type { BissStat } from "../types";

defineProps<{
  stats: BissStat[];
}>();
</script>

<template>
  <dl class="biss-stat-list">
    <div v-for="stat in stats" :key="stat.label" class="biss-stat-row">
      <dt class="biss-stat-label">{{ stat.label }}</dt>
      <dd class="biss-stat-value">{{ stat.value }}</dd>
    </div>
  </dl>
</template>
