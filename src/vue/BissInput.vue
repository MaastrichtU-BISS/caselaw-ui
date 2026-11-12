<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  mono?: boolean;
  min?: number | string;
  max?: number | string;
  autocomplete?: string;
}>(), {
  type: "text",
  disabled: false,
  required: false,
  invalid: false,
  mono: false,
});

const model = defineModel<string | number | null>();

const classes = computed(() => [
  "biss-input",
  props.invalid ? "biss-input-invalid" : "",
  props.mono ? "biss-input-mono" : "",
].filter(Boolean));
</script>

<template>
  <input
    v-model="model"
    :class="classes"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :min="min"
    :max="max"
    :autocomplete="autocomplete"
    :aria-invalid="invalid || undefined"
  >
</template>
