<script setup lang="ts">
import { ref, watch } from 'vue';
import { BissButton, BissField, BissTextarea } from 'biss-ui/vue';

const reason = ref('');
const error = ref('');
watch(reason, () => (error.value = ''));

function submit() {
  if (!reason.value.trim()) error.value = 'Tell the finance team why the deadline should move.';
}
</script>

<template>
  <form
    novalidate
    class="biss-stack biss-stack-sm"
    style="width: min(100%, 28rem)"
    @submit.prevent="submit"
  >
    <BissField label="Reason for extension" :error="error" required>
      <BissTextarea v-model="reason" placeholder="Fieldwork in Lisbon was delayed by…" />
    </BissField>
    <div>
      <BissButton type="submit">Request extension</BissButton>
    </div>
  </form>
</template>
