<script setup lang="ts">
import { ref } from 'vue';

const {
  label = 'Write a comment',
  submitLabel = 'Post comment',
  busy = false,
  error = undefined,
} = defineProps<{
  label?: string;
  submitLabel?: string;
  busy?: boolean;
  error?: string | undefined;
}>();
const emit = defineEmits<{ submit: [body: string] }>();
const draft = ref('');
function send() {
  if (busy || !draft.value.trim()) return;
  emit('submit', draft.value.trim());
}
</script>
<template>
  <form class="biss-comment-composer" @submit.prevent="send">
    <textarea
      class="biss-textarea"
      v-model="draft"
      :aria-label="label"
      :placeholder="label"
      :disabled="busy"
      @keydown="($event.metaKey || $event.ctrlKey) && $event.key === 'Enter' && send()"
    />
    <div>
      <p v-if="error" role="alert">{{ error }}</p>
      <button type="submit" class="biss-button" :disabled="busy || !draft.trim()">
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>
