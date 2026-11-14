<script setup lang="ts">
import { ref } from 'vue';
import { BissFilePicker } from 'biss-ui/vue';

const status = ref('No file chosen');

function pick([file]: File[]) {
  if (!file) return;
  status.value =
    file.type === 'application/pdf' ? `Ready to upload ${file.name}` : 'Choose a PDF file';
}
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 22rem)">
    <BissFilePicker
      label="Upload signed consent form"
      hint="One PDF file."
      accept="application/pdf"
      :multiple="false"
      @pick="pick"
    />
    <p role="status">{{ status }}</p>
  </div>
</template>
