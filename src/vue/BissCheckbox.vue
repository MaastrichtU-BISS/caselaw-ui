<script setup lang="ts">
const {
  checked = false,
  label,
  description = undefined,
  disabled = false,
} = defineProps<{
  checked?: boolean;
  label: string;
  description?: string | undefined;
  disabled?: boolean;
}>();
const emit = defineEmits<{ change: [value: boolean] }>();
</script>
<template>
  <label class="biss-checkbox"
    ><input
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="emit('change', ($event.target as HTMLInputElement).checked)"
    /><span
      >{{ label }}<small v-if="description">{{ description }}</small></span
    ></label
  >
</template>
