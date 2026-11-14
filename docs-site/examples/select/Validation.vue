<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissField, BissSelect } from 'biss-ui/vue';

const licence = ref('');
const error = ref('');
const licences = [
  { value: 'cc-by', label: 'CC BY 4.0' },
  { value: 'cc-by-nc', label: 'CC BY-NC 4.0' },
  { value: 'cc0', label: 'CC0 (public domain)' },
  { value: 'restricted', label: 'Restricted access' },
];

function publish() {
  error.value = licence.value ? '' : 'Choose a licence before publishing the dataset.';
}
</script>

<template>
  <form
    novalidate
    class="biss-stack biss-stack-sm"
    style="width: min(100%, 22rem)"
    @submit.prevent="publish"
  >
    <BissField label="Dataset licence" :error="error" required>
      <BissSelect v-model="licence" :options="licences" placeholder="Choose a licence" />
    </BissField>
    <div>
      <BissButton type="submit">Publish dataset</BissButton>
    </div>
  </form>
</template>
