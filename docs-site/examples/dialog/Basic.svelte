<script lang="ts">
  import { Dialog, BissButton, BissField, BissInput } from 'biss-ui/svelte';
</script>

<Dialog.Root>
  <Dialog.Trigger
    >{#snippet child({ props })}<BissButton {...props} variant="secondary">Edit profile</BissButton
      >{/snippet}</Dialog.Trigger
  >
  <Dialog.Portal
    ><Dialog.Overlay /><Dialog.Content size="md">
      <header class="biss-dialog-header">
        <div>
          <Dialog.Title>Edit profile</Dialog.Title><Dialog.Description
            >Update the name your teammates see.</Dialog.Description
          >
        </div>
      </header>
      <div class="biss-dialog-body">
        <BissField label="Display name" hint="Use your full name."
          ><BissInput value="Ada Lovelace" /></BissField
        >
      </div>
      <footer class="biss-dialog-footer">
        <Dialog.Close
          >{#snippet child({ props })}<BissButton {...props}>Save changes</BissButton
            >{/snippet}</Dialog.Close
        >
      </footer>
    </Dialog.Content></Dialog.Portal
  >
</Dialog.Root>
