<script setup lang="ts">
import { Dialog, BissButton, BissField, BissInput } from 'biss-ui/vue';
</script>
<template>
  <Dialog.Root>
    <Dialog.Trigger as-child
      ><BissButton variant="secondary">Edit profile</BissButton></Dialog.Trigger
    >
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content size="md">
        <header class="biss-dialog-header">
          <div>
            <Dialog.Title>Edit profile</Dialog.Title
            ><Dialog.Description>Update the name your teammates see.</Dialog.Description>
          </div>
        </header>
        <div class="biss-dialog-body">
          <BissField label="Display name" hint="Use your full name."
            ><BissInput model-value="Ada Lovelace"
          /></BissField>
        </div>
        <footer class="biss-dialog-footer">
          <Dialog.Close as-child><BissButton>Save changes</BissButton></Dialog.Close>
        </footer>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
</template>
