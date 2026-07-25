<script setup lang="ts">
defineProps<{
  heading?: string;
  empty?: string;
}>();
</script>

<template>
  <nav class="cle-nav-section" :aria-label="heading">
    <div v-if="heading" class="cle-nav-heading">
      <span>{{ heading }}</span>
      <slot name="action" />
    </div>
    <slot />
    <p v-if="empty" class="cle-nav-empty">{{ empty }}</p>
  </nav>
</template>
