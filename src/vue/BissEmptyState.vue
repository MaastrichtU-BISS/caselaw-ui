<script setup lang="ts">
defineProps<{
  title?: string;
  copy?: string;
}>();
</script>

<template>
  <div class="biss-empty-state">
    <div>
      <p v-if="title" class="biss-empty-title">{{ title }}</p>
      <p v-if="copy" class="biss-empty-copy">{{ copy }}</p>
      <slot />
    </div>
  </div>
</template>
