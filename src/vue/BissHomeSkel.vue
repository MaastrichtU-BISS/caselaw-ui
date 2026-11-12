<script setup lang="ts">
withDefaults(
  defineProps<{ rows?: number; label?: string; shape?: 'list' | 'figure' | 'chips' }>(),
  { rows: 4, label: 'Loading', shape: 'list' },
);
</script>
<template>
  <div
    class="biss-home-skel"
    :data-shape="shape"
    role="status"
    aria-busy="true"
    :aria-label="label"
  >
    <i v-for="n in Math.max(0, Math.min(50, rows))" :key="n" />
  </div>
</template>
