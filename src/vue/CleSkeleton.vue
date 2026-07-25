<script setup lang="ts">
withDefaults(defineProps<{
  /** Number of stacked bars to render. */
  lines?: number;
  height?: string;
  width?: string;
  gap?: string;
}>(), {
  lines: 1,
  height: "14px",
  width: "100%",
  gap: "10px",
});
</script>

<template>
  <div :style="{ display: 'grid', gap }" aria-hidden="true">
    <div
      v-for="line in lines"
      :key="line"
      class="cle-skeleton"
      :style="{ height, width: line === lines && lines > 1 ? '62%' : width }"
    />
  </div>
</template>
