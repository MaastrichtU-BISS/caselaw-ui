<script setup lang="ts">
const { items, label } = defineProps<{
  items: { key: string; label: string; value: string; href?: string }[];
  label: string;
}>();
</script>
<template>
  <dl class="biss-property-list" :aria-label="label">
    <div v-for="item in items" :key="item.key">
      <dt>{{ item.label }}</dt>
      <dd>
        <slot :item="item"
          ><a v-if="item.href" :href="item.href">{{ item.value }}</a
          ><span v-else>{{ item.value }}</span></slot
        >
      </dd>
    </div>
  </dl>
</template>
