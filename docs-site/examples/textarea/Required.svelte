<script lang="ts">
  import { BissButton, BissField, BissTextarea } from 'biss-ui/svelte';

  let reason = $state('');
  let error = $state('');

  function submit(event: SubmitEvent) {
    event.preventDefault();
    if (!reason.trim()) error = 'Tell the finance team why the deadline should move.';
  }
</script>

<form
  novalidate
  class="biss-stack biss-stack-sm"
  style="width: min(100%, 28rem)"
  onsubmit={submit}
>
  <BissField label="Reason for extension" {error} required>
    <BissTextarea
      bind:value={reason}
      oninput={() => (error = '')}
      placeholder="Fieldwork in Lisbon was delayed by…"
    />
  </BissField>
  <div>
    <BissButton type="submit">Request extension</BissButton>
  </div>
</form>
