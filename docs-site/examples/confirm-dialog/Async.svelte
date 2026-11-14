<script lang="ts">
  import { BissButton, BissConfirmDialog } from 'biss-ui/svelte';

  let open = $state(false);
  let revoking = $state(false);

  async function revoke() {
    revoking = true;
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Your request goes here.
    revoking = false;
    open = false;
  }
</script>

<BissButton variant="secondary" onclick={() => (open = true)}>Revoke access</BissButton>
<BissConfirmDialog
  bind:open
  busy={revoking}
  title="Revoke access for Tom Peeters?"
  confirmLabel="Revoke access"
  onconfirm={revoke}
>
  Tom will lose access to the GDPR enforcement tracker immediately.
</BissConfirmDialog>
