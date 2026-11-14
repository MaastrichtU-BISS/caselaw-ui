<script lang="ts">
  import { BissButton, BissConfirmDialog } from 'biss-ui/svelte';

  let open = $state(false);
  let submitted = $state(false);

  function submit() {
    submitted = true;
    open = false;
  }
</script>

<BissButton disabled={submitted} onclick={() => (open = true)}>
  {submitted ? 'Report submitted' : 'Submit final report'}
</BissButton>
<BissConfirmDialog
  bind:open
  tone="primary"
  title="Submit the final report to NWO?"
  confirmLabel="Submit report"
  cancelLabel="Keep editing"
  onconfirm={submit}
>
  After submitting you can no longer edit the report or its attachments.
</BissConfirmDialog>
