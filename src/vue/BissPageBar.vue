<script setup lang="ts">
defineProps<{ title: string; description?: string; meta?: string }>();
</script>
<template>
  <header class="biss-pagebar">
    <div class="biss-pagebar-row">
      <slot name="lead" />
      <h1>{{ title }}</h1>
      <span class="biss-muted">{{ meta }}</span>
      <div class="biss-pagebar-actions"><slot name="actions" /></div>
    </div>
    <p v-if="description">{{ description }}</p>
    <slot name="tabs" />
  </header>
</template>
