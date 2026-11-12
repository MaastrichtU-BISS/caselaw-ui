<script setup lang="ts">
const { items, label = 'Breadcrumbs' } = defineProps<{
  items: { label: string; href?: string }[];
  label?: string;
}>();
</script>
<template>
  <nav :aria-label="label">
    <ol class="biss-breadcrumbs">
      <li v-for="(item, i) in items" :key="i">
        <span v-if="i" class="biss-breadcrumb-sep" aria-hidden="true">/</span
        ><a v-if="item.href && i < items.length - 1" :href="item.href">{{ item.label }}</a
        ><span v-else :aria-current="i === items.length - 1 ? 'page' : undefined">{{
          item.label
        }}</span>
      </li>
    </ol>
  </nav>
</template>
