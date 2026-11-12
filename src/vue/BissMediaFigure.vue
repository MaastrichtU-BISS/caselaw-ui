<script setup lang="ts">
const {
  src,
  alt,
  caption = undefined,
  width = undefined,
  height = undefined,
} = defineProps<{
  src: string;
  alt: string;
  caption?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
}>();
</script>
<template>
  <figure class="biss-media-figure">
    <img :src="src" :alt="alt" :width="width" :height="height" loading="lazy" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
