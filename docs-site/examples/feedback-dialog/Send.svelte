<script lang="ts">
  import { BissButton, BissFeedbackDialog, type BissFeedbackPayload } from 'biss-ui/svelte';

  let open = $state(true);
  let sending = $state(false);
  let sent = $state(false);

  async function submit(feedback: BissFeedbackPayload) {
    sending = true;
    await new Promise((resolve) => setTimeout(resolve, 900)); // Send `feedback` here.
    console.log(feedback);
    sending = false;
    sent = true;
  }
  function reopen() {
    sent = false;
    open = true;
  }
</script>

<BissButton variant="secondary" onclick={reopen}>Send feedback</BissButton>
<BissFeedbackDialog
  bind:open
  {sending}
  {sent}
  context="Page: Projects › Open justice · Firefox on macOS"
  askEmail
  onsubmit={submit}
/>
