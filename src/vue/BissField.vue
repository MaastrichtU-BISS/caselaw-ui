<script setup lang="ts">
import { useId } from "vue";

defineProps<{
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
}>();

const id = useId();
</script>

<template>
  <div class="biss-field">
    <label v-if="label" class="biss-field-label" :for="id">
      {{ label }}
      <span v-if="optional" class="biss-field-optional">optional</span>
    </label>
    <slot :id="id" :invalid="Boolean(error)" />
    <p v-if="error" class="biss-field-error">{{ error }}</p>
    <p v-else-if="hint" class="biss-field-hint">{{ hint }}</p>
  </div>
</template>
