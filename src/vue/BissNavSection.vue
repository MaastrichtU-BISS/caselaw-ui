<script setup lang="ts">
defineProps<{
  heading?: string;
  empty?: string;
}>();
</script>

<template>
  <nav class="biss-nav-section" :aria-label="heading">
    <div v-if="heading" class="biss-nav-heading">
      <span>{{ heading }}</span>
      <slot name="action" />
    </div>
    <slot />
    <p v-if="empty" class="biss-nav-empty">{{ empty }}</p>
  </nav>
</template>
