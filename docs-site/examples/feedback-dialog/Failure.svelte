<script lang="ts">
  import { BissButton, BissFeedbackDialog } from 'biss-ui/svelte';

  let open = $state(true);
  let sending = $state(false);
  let message = $state('The export of the Horizon budget table stops at row 200.');
  let error = $state('Feedback could not be sent. Check your connection and try again.');
  const categories = [
    { value: 'problem', label: 'Something is broken' },
    { value: 'idea', label: 'Suggestion' },
    { value: 'data', label: 'Wrong data' },
  ];

  async function submit() {
    error = '';
    sending = true;
    await new Promise((resolve) => setTimeout(resolve, 900)); // The request fails here.
    sending = false;
    error = 'Feedback could not be sent. Check your connection and try again.';
  }
</script>

<BissButton variant="secondary" onclick={() => (open = true)}>Report a problem</BissButton>
<BissFeedbackDialog
  bind:open
  bind:message
  title="Report a problem"
  description="Describe what went wrong. The research office replies within two working days."
  ratings={[]}
  {categories}
  {sending}
  {error}
  onsubmit={submit}
/>
