<script setup lang="ts">
defineProps<{
  title: string;
  copy?: string;
}>();
</script>

<template>
  <div class="biss-section-header">
    <div>
      <h3 class="biss-section-title">{{ title }}</h3>
      <p v-if="copy" class="biss-section-copy">{{ copy }}</p>
    </div>
    <div v-if="$slots.actions" class="biss-section-actions">
      <slot name="actions" />
    </div>
  </div>
</template>
