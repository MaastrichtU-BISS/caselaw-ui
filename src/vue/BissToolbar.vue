<script setup lang="ts">
defineProps<{ label: string }>();
</script>
<template>
  <div class="biss-toolbar" role="group" :aria-label="label">
    <slot />
    <div class="biss-toolbar-end"><slot name="end" /></div>
  </div>
</template>
