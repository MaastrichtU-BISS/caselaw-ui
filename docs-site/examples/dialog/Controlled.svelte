<script lang="ts">
  import { Dialog, BissButton, BissField, BissInput } from 'biss-ui/svelte';
  let open = $state(false),
    name = $state(''),
    error = $state(''),
    saved = $state('');
  function save() {
    if (!name.trim()) {
      error = 'Enter a project name.';
      return;
    }
    saved = name.trim();
    open = false;
  }
</script>

<div class="dialog-example-stack">
  <Dialog.Root bind:open
    ><Dialog.Trigger
      >{#snippet child({ props })}<BissButton {...props}>Create project</BissButton
        >{/snippet}</Dialog.Trigger
    ><Dialog.Portal
      ><Dialog.Overlay /><Dialog.Content size="sm"
        ><header class="biss-dialog-header">
          <div>
            <Dialog.Title>New project</Dialog.Title><Dialog.Description
              >Validate the form before closing.</Dialog.Description
            >
          </div>
        </header>
        <form
          id="dialog-project-form"
          class="biss-dialog-body"
          novalidate
          onsubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <BissField label="Project name" {error} required
            ><BissInput bind:value={name} /></BissField
          >
        </form>
        <footer class="biss-dialog-footer">
          <Dialog.Close
            >{#snippet child({ props })}<BissButton {...props} variant="secondary"
                >Cancel</BissButton
              >{/snippet}</Dialog.Close
          ><BissButton type="submit" form="dialog-project-form">Create</BissButton>
        </footer></Dialog.Content
      ></Dialog.Portal
    ></Dialog.Root
  >{#if saved}<p role="status">Created {saved}</p>{/if}
</div>
