<script setup lang="ts">
const {
  title,
  description = undefined,
  step = undefined,
  steps = undefined,
} = defineProps<{
  title: string;
  description?: string | undefined;
  step?: number | undefined;
  steps?: number | undefined;
}>();
</script>
<template>
  <section class="biss-onboarding">
    <header>
      <small v-if="step !== undefined && steps !== undefined">{{ step }} / {{ steps }}</small>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </header>
    <slot />
    <footer><slot name="actions" /></footer>
  </section>
</template>
