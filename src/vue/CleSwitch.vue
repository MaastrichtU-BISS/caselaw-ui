<script setup lang="ts">
defineProps<{
  label: string;
  hint?: string;
  disabled?: boolean;
}>();

const model = defineModel<boolean>();
</script>

<template>
  <label class="cle-switch">
    <input v-model="model" type="checkbox" :disabled="disabled">
    <span class="cle-switch-track"><span class="cle-switch-thumb" /></span>
    <span class="cle-switch-text">
      <span class="cle-switch-label">{{ label }}</span>
      <span v-if="hint" class="cle-switch-hint">{{ hint }}</span>
    </span>
  </label>
</template>
