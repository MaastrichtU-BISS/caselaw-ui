<script setup lang="ts">
defineProps<{
  title?: string;
  copy?: string;
}>();
</script>

<template>
  <div class="cle-empty-state">
    <div>
      <p v-if="title" class="cle-empty-title">{{ title }}</p>
      <p v-if="copy" class="cle-empty-copy">{{ copy }}</p>
      <slot />
    </div>
  </div>
</template>
