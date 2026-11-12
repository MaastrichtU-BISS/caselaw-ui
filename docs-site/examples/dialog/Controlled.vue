<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, BissButton, BissField, BissInput } from 'biss-ui/vue';
const open = ref(false),
  name = ref(''),
  error = ref(''),
  saved = ref('');
function save() {
  if (!name.value.trim()) {
    error.value = 'Enter a project name.';
    return;
  }
  saved.value = name.value.trim();
  open.value = false;
}
</script>
<template>
  <div class="dialog-example-stack">
    <Dialog.Root v-model:open="open"
      ><Dialog.Trigger as-child><BissButton>Create project</BissButton></Dialog.Trigger
      ><Dialog.Portal
        ><Dialog.Overlay /><Dialog.Content size="sm"
          ><header class="biss-dialog-header">
            <div>
              <Dialog.Title>New project</Dialog.Title
              ><Dialog.Description>Validate the form before closing.</Dialog.Description>
            </div>
          </header>
          <form id="dialog-project-form" class="biss-dialog-body" novalidate @submit.prevent="save">
            <BissField label="Project name" :error="error" required
              ><BissInput v-model="name"
            /></BissField>
          </form>
          <footer class="biss-dialog-footer">
            <Dialog.Close as-child><BissButton variant="secondary">Cancel</BissButton></Dialog.Close
            ><BissButton type="submit" form="dialog-project-form">Create</BissButton>
          </footer></Dialog.Content
        ></Dialog.Portal
      ></Dialog.Root
    >
    <p v-if="saved" role="status">Created {{ saved }}</p>
  </div>
</template>
