<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissConfirmDialog } from 'biss-ui/vue';

const open = ref(false);
const revoking = ref(false);

async function revoke() {
  revoking.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Your request goes here.
  revoking.value = false;
  open.value = false;
}
</script>

<template>
  <BissButton variant="secondary" @click="open = true">Revoke access</BissButton>
  <BissConfirmDialog
    v-model="open"
    :busy="revoking"
    title="Revoke access for Tom Peeters?"
    confirm-label="Revoke access"
    @confirm="revoke"
  >
    Tom will lose access to the GDPR enforcement tracker immediately.
  </BissConfirmDialog>
</template>
