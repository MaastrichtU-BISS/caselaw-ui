<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  rows?: number;
  mono?: boolean;
}>(), {
  disabled: false,
  required: false,
  invalid: false,
  rows: 3,
  mono: false,
});

const model = defineModel<string>();

const classes = computed(() => [
  "cle-textarea",
  props.invalid ? "cle-input-invalid" : "",
  props.mono ? "cle-input-mono" : "",
].filter(Boolean));
</script>

<template>
  <textarea
    v-model="model"
    :class="classes"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :rows="rows"
    :aria-invalid="invalid || undefined"
  />
</template>
