<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';

const {
  value = '',
  label,
  placeholder = 'Add text…',
  readonly = false,
  multiline = false,
} = defineProps<{
  value?: string;
  label: string;
  placeholder?: string;
  readonly?: boolean;
  multiline?: boolean;
}>();
const emit = defineEmits<{ change: [value: string] }>();
const editing = ref(false);
const draft = ref('');
const input = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);
function save() {
  if (!editing.value) return;
  editing.value = false;
  if (draft.value !== value) emit('change', draft.value);
}
</script>
<template>
  <span class="biss-editable">
    <textarea
      v-if="editing && !readonly && multiline"
      ref="input"
      v-model="draft"
      :aria-label="label"
      @blur="save"
      @keydown.esc.prevent="
        editing = false;
        draft = value;
      "
    /><input
      v-else-if="editing && !readonly"
      ref="input"
      v-model="draft"
      :aria-label="label"
      @blur="save"
      @keydown.enter.prevent="save"
      @keydown.esc.prevent="
        editing = false;
        draft = value;
      "
    /><button
      v-else
      type="button"
      :disabled="readonly"
      :aria-label="label"
      @click="
        draft = value;
        editing = true;
        nextTick(() => input?.focus());
      "
    >
      {{ value || placeholder }}
    </button></span
  >
</template>
