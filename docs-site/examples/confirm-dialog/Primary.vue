<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissConfirmDialog } from 'biss-ui/vue';

const open = ref(false);
const submitted = ref(false);

function submit() {
  submitted.value = true;
  open.value = false;
}
</script>

<template>
  <BissButton :disabled="submitted" @click="open = true">
    {{ submitted ? 'Report submitted' : 'Submit final report' }}
  </BissButton>
  <BissConfirmDialog
    v-model="open"
    tone="primary"
    title="Submit the final report to NWO?"
    confirm-label="Submit report"
    cancel-label="Keep editing"
    @confirm="submit"
  >
    After submitting you can no longer edit the report or its attachments.
  </BissConfirmDialog>
</template>
