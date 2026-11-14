<script setup lang="ts">
import { BissButton, BissToastStack, useBissToasts } from 'biss-ui/vue';

// Shared by every component in the app; install createBissUI() once to own the queue.
const toasts = useBissToasts();

function saveDraft() {
  toasts.success('Draft saved', 'Annual report 2026 · Digital Legal Studies');
}

function inviteReviewer() {
  toasts.push('Invitation sent to Mara Jansen', { copy: 'She can review until 2 December.' });
}
</script>

<template>
  <BissButton @click="saveDraft">Save draft</BissButton>
  <BissButton variant="secondary" @click="inviteReviewer">Invite reviewer</BissButton>
  <BissToastStack />
</template>
