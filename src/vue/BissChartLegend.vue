<script setup lang="ts">
defineProps<{ items: { label: string; color: string; dashed?: boolean }[]; label: string }>();
</script>
<template>
  <ul class="biss-chart-legend" :aria-label="label">
    <li v-for="item in items" :key="item.label">
      <i
        :style="{
          borderColor: item.color,
          background: item.dashed ? 'transparent' : item.color,
          borderStyle: item.dashed ? 'dashed' : 'solid',
        }"
      />{{ item.label }}
    </li>
  </ul>
</template>
