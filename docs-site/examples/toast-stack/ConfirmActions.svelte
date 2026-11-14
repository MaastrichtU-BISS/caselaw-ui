<script lang="ts">
  import { BissButton, BissToastStack, createBissToasts } from 'biss-ui/svelte';

  // Create one queue per app (for example in a shared module) and pass it to the stack.
  const toasts = createBissToasts();

  function saveDraft() {
    toasts.push('Draft saved', {
      tone: 'success',
      copy: 'Annual report 2026 · Digital Legal Studies',
    });
  }

  function inviteReviewer() {
    toasts.push('Invitation sent to Mara Jansen', { copy: 'She can review until 2 December.' });
  }
</script>

<BissButton onclick={saveDraft}>Save draft</BissButton>
<BissButton variant="secondary" onclick={inviteReviewer}>Invite reviewer</BissButton>
<BissToastStack queue={toasts} />
