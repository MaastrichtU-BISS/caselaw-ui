<script setup lang="ts">
defineProps<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <header class="biss-page-header">
    <div class="biss-page-header-row">
      <div>
        <div v-if="eyebrow" class="biss-eyebrow">{{ eyebrow }}</div>
        <h1 class="biss-page-title">{{ title }}</h1>
        <p v-if="subtitle" class="biss-page-subtitle">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </div>
    <slot />
  </header>
</template>
