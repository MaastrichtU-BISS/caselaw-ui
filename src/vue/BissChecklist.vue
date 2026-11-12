<script setup lang="ts">
const { items, label } = defineProps<{
  items: { key: string; label: string; description?: string; done: boolean; disabled?: boolean }[];
  label: string;
}>();
const emit = defineEmits<{ change: [item: { key: string; done: boolean }] }>();
</script>
<template>
  <ul class="biss-checklist" :aria-label="label">
    <li v-for="item in items" :key="item.key">
      <label
        ><input
          type="checkbox"
          :checked="item.done"
          :disabled="item.disabled"
          @change="emit('change', { key: item.key, done: !item.done })"
        /><span
          >{{ item.label }}<small v-if="item.description">{{ item.description }}</small></span
        ></label
      >
    </li>
  </ul>
</template>
