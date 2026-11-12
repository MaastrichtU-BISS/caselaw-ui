<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'danger' | 'warning' | 'info'; label?: string }>(), {
  tone: 'info',
});
</script>
<template>
  <div class="biss-alert-line" :data-tone="tone" role="status" :aria-label="label">
    <span class="biss-status-dot" aria-hidden="true" /><span class="biss-grow"><slot /></span
    ><slot name="actions" />
  </div>
</template>
