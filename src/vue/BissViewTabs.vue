<script setup lang="ts">
defineProps<{
  items: { key: string; label: string; count?: number; disabled?: boolean }[];
  modelValue: string;
  label: string;
}>();
const emit = defineEmits<{ 'update:modelValue': [string] }>();
</script>
<template>
  <nav class="biss-view-tabs" :aria-label="label">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      :disabled="item.disabled"
      :aria-pressed="modelValue === item.key"
      @click="emit('update:modelValue', item.key)"
    >
      {{ item.label }}<small v-if="item.count !== undefined">{{ item.count }}</small></button
    ><slot name="end" />
  </nav>
</template>
