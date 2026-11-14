<script lang="ts">
  import { BissButton, BissField, BissInput } from 'biss-ui/svelte';

  let grantNumber = $state('');
  let error = $state('');

  function submit(event: SubmitEvent) {
    event.preventDefault();
    error = /^\d{9}$/.test(grantNumber)
      ? ''
      : 'Enter the 9-digit grant agreement number, for example 101094521.';
  }
</script>

<form
  novalidate
  class="biss-stack biss-stack-sm"
  style="width: min(100%, 24rem)"
  onsubmit={submit}
>
  <BissField
    label="Grant agreement number"
    hint="You can find it on the first page of the agreement."
    {error}
    required
  >
    <BissInput bind:value={grantNumber} inputmode="numeric" mono />
  </BissField>
  <div>
    <BissButton type="submit">Link grant</BissButton>
  </div>
</form>
