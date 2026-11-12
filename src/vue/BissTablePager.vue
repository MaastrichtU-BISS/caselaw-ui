<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    page: number;
    total: number;
    pageSize?: number;
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
  }>(),
  { pageSize: 25, label: 'Pagination', previousLabel: 'Previous', nextLabel: 'Next' },
);
const emit = defineEmits<{ 'update:page': [number] }>();
const pages = computed(() => Math.max(1, Math.ceil(props.total / Math.max(1, props.pageSize))));
</script>
<template>
  <nav class="biss-pager" :aria-label="label">
    <span aria-live="polite">{{ Math.min(page, pages) }} / {{ pages }}</span
    ><button
      class="biss-button biss-button-ghost"
      type="button"
      :disabled="page <= 1"
      @click="emit('update:page', Math.max(1, page - 1))"
    >
      {{ previousLabel }}</button
    ><button
      class="biss-button biss-button-ghost"
      type="button"
      :disabled="page >= pages"
      @click="emit('update:page', Math.min(pages, page + 1))"
    >
      {{ nextLabel }}</button
    ><slot />
  </nav>
</template>
