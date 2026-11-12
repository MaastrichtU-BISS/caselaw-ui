<script setup lang="ts">
import { Dialog, BissButton } from 'biss-ui/vue';
</script>
<template>
  <Dialog.Root
    ><Dialog.Trigger as-child
      ><BissButton variant="secondary">Open settings</BissButton></Dialog.Trigger
    ><Dialog.Portal
      ><Dialog.Overlay /><Dialog.Content
        ><header class="biss-dialog-header">
          <div>
            <Dialog.Title>Workspace settings</Dialog.Title
            ><Dialog.Description>A nested task keeps the parent dialog open.</Dialog.Description>
          </div>
        </header>
        <div class="biss-dialog-body">
          <Dialog.Root
            ><Dialog.Trigger as-child
              ><BissButton variant="secondary">Review permissions</BissButton></Dialog.Trigger
            ><Dialog.Portal
              ><Dialog.Overlay /><Dialog.Content size="sm"
                ><header class="biss-dialog-header">
                  <div>
                    <Dialog.Title>Permissions</Dialog.Title
                    ><Dialog.Description>Escape closes this layer first.</Dialog.Description>
                  </div>
                </header>
                <footer class="biss-dialog-footer">
                  <Dialog.Close as-child><BissButton>Done</BissButton></Dialog.Close>
                </footer></Dialog.Content
              ></Dialog.Portal
            ></Dialog.Root
          >
        </div>
        <footer class="biss-dialog-footer">
          <Dialog.Close as-child
            ><BissButton variant="secondary">Close settings</BissButton></Dialog.Close
          >
        </footer></Dialog.Content
      ></Dialog.Portal
    ></Dialog.Root
  >
</template>
