<script setup lang="ts">
withDefaults(defineProps<{
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}>(), {
  placeholder: "Search",
  disabled: false,
  label: "Search",
});

const model = defineModel<string>({ default: "" });
</script>

<template>
  <div class="cle-search">
    <svg class="cle-search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="2" />
      <path d="m13.5 13.5 3.5 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <input
      v-model="model"
      class="cle-input"
      type="search"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="label"
    >
  </div>
</template>
