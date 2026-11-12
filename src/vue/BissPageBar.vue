<script setup lang="ts">
withDefaults(
  defineProps<{
    heading?: 'h1' | 'h2' | 'h3';
    title: string;
    description?: string;
    meta?: string;
  }>(),
  { heading: 'h1' },
);
</script>
<template>
  <header class="biss-pagebar">
    <div class="biss-pagebar-row">
      <slot name="lead" />
      <component :is="heading">{{ title }}</component>
      <span class="biss-muted">{{ meta }}</span>
      <div class="biss-pagebar-actions"><slot name="actions" /></div>
    </div>
    <p v-if="description">{{ description }}</p>
    <slot name="tabs" />
  </header>
</template>
