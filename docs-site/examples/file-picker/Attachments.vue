<script setup lang="ts">
import { ref } from 'vue';
import { BissAttachmentList, BissFilePicker, type BissAttachment } from 'biss-ui/vue';

const files = ref<BissAttachment[]>([
  { id: 'budget', name: 'Budget justification.xlsx', size: '48 KB', removable: true },
]);

function add(picked: File[]) {
  files.value = [
    ...files.value,
    ...picked.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: `${Math.ceil(file.size / 1024)} KB`,
      removable: true,
    })),
  ];
}
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)">
    <BissFilePicker
      label="Add supporting documents"
      hint="PDF, Word or Excel, up to 20 MB each."
      @pick="add"
    />
    <BissAttachmentList
      :items="files"
      @remove="files = files.filter((file) => file.id !== $event)"
    />
  </div>
</template>
