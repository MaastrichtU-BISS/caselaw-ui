<script setup lang="ts">
import BissPopover from './BissPopover.vue';
const {
  title,
  paragraphs,
  href = undefined,
  linkLabel = 'View records',
} = defineProps<{
  title: string;
  paragraphs: string[];
  href?: string | undefined;
  linkLabel?: string;
}>();
</script>
<template>
  <BissPopover :label="title" :width="300"
    ><div class="biss-figure-help">
      <b>{{ title }}</b>
      <p v-for="(paragraph, i) in paragraphs" :key="i">{{ paragraph }}</p>
      <a v-if="href" :href="href">{{ linkLabel }}</a>
    </div></BissPopover
  >
</template>
