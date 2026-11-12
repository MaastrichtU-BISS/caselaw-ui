<script setup lang="ts">
defineProps<{
  label: string;
  hint?: string;
  disabled?: boolean;
}>();

const model = defineModel<boolean>();
</script>

<template>
  <label class="biss-switch">
    <input v-model="model" type="checkbox" :disabled="disabled">
    <span class="biss-switch-track"><span class="biss-switch-thumb" /></span>
    <span class="biss-switch-text">
      <span class="biss-switch-label">{{ label }}</span>
      <span v-if="hint" class="biss-switch-hint">{{ hint }}</span>
    </span>
  </label>
</template>
