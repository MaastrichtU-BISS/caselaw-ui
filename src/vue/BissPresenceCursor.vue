<script setup lang="ts">
const {
  name,
  color = '#005CA9',
  x = 0,
  y = 0,
  height = 20,
} = defineProps<{ name: string; color?: string; x?: number; y?: number; height?: number }>();
</script>
<template>
  <span
    class="biss-presence-cursor"
    :style="{ left: x + 'px', top: y + 'px', height: height + 'px', '--cursor-color': color }"
    aria-hidden="true"
    ><span>{{ name }}</span></span
  >
</template>
