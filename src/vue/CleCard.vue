<template>
  <section class="cle-card" :class="{ 'cle-card-padded': padded }">
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
.cle-card-padded {
  padding: 24px;
}
</style>
