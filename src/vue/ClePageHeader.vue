<script setup lang="ts">
defineProps<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <header class="cle-page-header">
    <div class="cle-page-header-row">
      <div>
        <div v-if="eyebrow" class="cle-eyebrow">{{ eyebrow }}</div>
        <h1 class="cle-page-title">{{ title }}</h1>
        <p v-if="subtitle" class="cle-page-subtitle">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </div>
    <slot />
  </header>
</template>
