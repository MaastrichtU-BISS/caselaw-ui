<template>
  <section class="biss-card" :class="{ 'biss-card-padded': padded }">
    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  padded?: boolean;
}>(), {
  padded: true,
});
</script>

<style>
.biss-card-padded {
  padding: 24px;
}
</style>
