<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissFeedbackDialog, type BissFeedbackPayload } from 'biss-ui/vue';

const open = ref(true);
const sending = ref(false);
const sent = ref(false);

async function submit(feedback: BissFeedbackPayload) {
  sending.value = true;
  await new Promise((resolve) => setTimeout(resolve, 900)); // Send `feedback` here.
  console.log(feedback);
  sending.value = false;
  sent.value = true;
}
function reopen() {
  sent.value = false;
  open.value = true;
}
</script>

<template>
  <BissButton variant="secondary" @click="reopen">Send feedback</BissButton>
  <BissFeedbackDialog
    v-model:open="open"
    :sending="sending"
    :sent="sent"
    context="Page: Projects › Open justice · Firefox on macOS"
    ask-email
    @submit="submit"
  />
</template>
