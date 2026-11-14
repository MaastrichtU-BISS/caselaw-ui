<script setup lang="ts">
import { BissButton, BissToastStack, useBissToasts } from 'biss-ui/vue';

const toasts = useBissToasts();

function showAll() {
  toasts.clear();
  toasts.push('Export started', { copy: 'You will get an email when the CSV is ready.' });
  toasts.success('Budget approved', 'WP2 Data infrastructure · €48,000');
  toasts.warning('Report due in 3 days', 'Mid-term review for ERC StG 101076');
  toasts.push('Upload failed', {
    tone: 'danger',
    copy: 'interviews-round-2.zip is larger than 2 GB.',
    timeout: 0,
  });
}
</script>

<template>
  <BissButton variant="secondary" @click="showAll">Show every tone</BissButton>
  <BissToastStack />
</template>
