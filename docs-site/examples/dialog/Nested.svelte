<script lang="ts">
  import { Dialog, BissButton } from 'biss-ui/svelte';
</script>

<Dialog.Root
  ><Dialog.Trigger
    >{#snippet child({ props })}<BissButton {...props} variant="secondary">Open settings</BissButton
      >{/snippet}</Dialog.Trigger
  ><Dialog.Portal
    ><Dialog.Overlay /><Dialog.Content
      ><header class="biss-dialog-header">
        <div>
          <Dialog.Title>Workspace settings</Dialog.Title><Dialog.Description
            >A nested task keeps the parent dialog open.</Dialog.Description
          >
        </div>
      </header>
      <div class="biss-dialog-body">
        <Dialog.Root
          ><Dialog.Trigger
            >{#snippet child({ props })}<BissButton {...props} variant="secondary"
                >Review permissions</BissButton
              >{/snippet}</Dialog.Trigger
          ><Dialog.Portal
            ><Dialog.Overlay /><Dialog.Content size="sm"
              ><header class="biss-dialog-header">
                <div>
                  <Dialog.Title>Permissions</Dialog.Title><Dialog.Description
                    >Escape closes this layer first.</Dialog.Description
                  >
                </div>
              </header>
              <footer class="biss-dialog-footer">
                <Dialog.Close
                  >{#snippet child({ props })}<BissButton {...props}>Done</BissButton
                    >{/snippet}</Dialog.Close
                >
              </footer></Dialog.Content
            ></Dialog.Portal
          ></Dialog.Root
        >
      </div>
      <footer class="biss-dialog-footer">
        <Dialog.Close
          >{#snippet child({ props })}<BissButton {...props} variant="secondary"
              >Close settings</BissButton
            >{/snippet}</Dialog.Close
        >
      </footer></Dialog.Content
    ></Dialog.Portal
  ></Dialog.Root
>
