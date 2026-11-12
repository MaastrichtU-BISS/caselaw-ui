<script setup lang="ts">
const { items, label = 'On this page' } = defineProps<{
  items: { id: string; title: string; level?: number; disabled?: boolean }[];
  label?: string;
}>();
</script>
<template>
  <nav class="biss-document-toc" :aria-label="label">
    <a
      v-for="item in items"
      :key="item.id"
      :href="item.disabled ? undefined : '#' + item.id"
      :aria-disabled="item.disabled"
      :style="{ paddingInlineStart: Math.max(0, (item.level ?? 1) - 1) * 14 + 10 + 'px' }"
      >{{ item.title }}</a
    >
  </nav>
</template>
