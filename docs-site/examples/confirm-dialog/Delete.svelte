<script lang="ts">
  import { BissButton, BissConfirmDialog } from 'biss-ui/svelte';

  let open = $state(false);
  let deleted = $state(false);

  function remove() {
    deleted = true;
    open = false;
  }
</script>

{#if deleted}
  <p role="status">Climate litigation review was deleted.</p>
{:else}
  <BissButton variant="danger-quiet" onclick={() => (open = true)}>Delete project</BissButton>
{/if}
<BissConfirmDialog
  bind:open
  title="Delete Climate litigation review?"
  confirmLabel="Delete project"
  onconfirm={remove}
>
  Its 214 annotated rulings and all comments will be removed for everyone. This cannot be undone.
</BissConfirmDialog>
