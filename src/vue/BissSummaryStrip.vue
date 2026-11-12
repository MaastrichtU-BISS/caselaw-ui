<script setup lang="ts">
defineProps<{
  items: { label: string; value: string; sub?: string; color?: string }[];
  label: string;
}>();
</script>
<template>
  <dl class="biss-summary-strip" :aria-label="label">
    <div v-for="item in items" :key="item.label">
      <dt><i v-if="item.color" :style="{ background: item.color }" />{{ item.label }}</dt>
      <dd>
        {{ item.value }}<small v-if="item.sub">{{ item.sub }}</small>
      </dd>
    </div>
  </dl>
</template>
