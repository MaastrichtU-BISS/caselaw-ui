<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissField, BissInput, BissSidePanel, BissTextarea } from 'biss-ui/vue';

const open = ref(false);
const saving = ref(false);
const title = ref('Asylum appeals dataset');
const summary = ref('Decisions of the Dutch Council of State on asylum appeals, 2015–2025.');

async function save() {
  saving.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1200)); // Your request goes here.
  saving.value = false;
  open.value = false;
}
</script>

<template>
  <BissButton @click="open = true">Edit project</BissButton>
  <BissSidePanel
    :open="open"
    :busy="saving"
    title="Edit project"
    :width="480"
    @close="open = false"
  >
    <form id="edit-project" class="biss-stack biss-stack-sm" @submit.prevent="save">
      <BissField label="Title" required>
        <BissInput v-model="title" />
      </BissField>
      <BissField label="Summary" hint="Shown on the public project page.">
        <BissTextarea v-model="summary" :rows="4" />
      </BissField>
    </form>
    <template #actions>
      <BissButton variant="secondary" :disabled="saving" @click="open = false">Cancel</BissButton>
      <BissButton type="submit" form="edit-project" :loading="saving">Save changes</BissButton>
    </template>
  </BissSidePanel>
</template>
