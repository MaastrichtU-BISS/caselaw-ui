<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissFeedbackDialog } from 'biss-ui/vue';

const open = ref(true);
const sending = ref(false);
const message = ref('The export of the Horizon budget table stops at row 200.');
const error = ref('Feedback could not be sent. Check your connection and try again.');
const categories = [
  { value: 'problem', label: 'Something is broken' },
  { value: 'idea', label: 'Suggestion' },
  { value: 'data', label: 'Wrong data' },
];

async function submit() {
  error.value = '';
  sending.value = true;
  await new Promise((resolve) => setTimeout(resolve, 900)); // The request fails here.
  sending.value = false;
  error.value = 'Feedback could not be sent. Check your connection and try again.';
}
</script>

<template>
  <BissButton variant="secondary" @click="open = true">Report a problem</BissButton>
  <BissFeedbackDialog
    v-model:open="open"
    v-model:message="message"
    title="Report a problem"
    description="Describe what went wrong. The research office replies within two working days."
    :ratings="[]"
    :categories="categories"
    :sending="sending"
    :error="error"
    @submit="submit"
  />
</template>
