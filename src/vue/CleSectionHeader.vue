<script setup lang="ts">
defineProps<{
  title: string;
  copy?: string;
}>();
</script>

<template>
  <div class="cle-section-header">
    <div>
      <h3 class="cle-section-title">{{ title }}</h3>
      <p v-if="copy" class="cle-section-copy">{{ copy }}</p>
    </div>
    <div v-if="$slots.actions" class="cle-section-actions">
      <slot name="actions" />
    </div>
  </div>
</template>
