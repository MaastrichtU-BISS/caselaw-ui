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
  <div class="cle-field">
    <label v-if="label" class="cle-field-label" :for="id">
      {{ label }}
      <span v-if="optional" class="cle-field-optional">optional</span>
    </label>
    <slot :id="id" :invalid="Boolean(error)" />
    <p v-if="error" class="cle-field-error">{{ error }}</p>
    <p v-else-if="hint" class="cle-field-hint">{{ hint }}</p>
  </div>
</template>
