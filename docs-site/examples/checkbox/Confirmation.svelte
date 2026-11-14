<script lang="ts">
  import { BissButton, BissCheckbox } from 'biss-ui/svelte';

  let confirmed = $state(false);
</script>

<form
  class="biss-stack biss-stack-sm"
  style="width: min(100%, 26rem)"
  onsubmit={(event) => event.preventDefault()}
>
  <BissCheckbox
    label="The data management plan is final"
    description="After submission the plan is locked and sent to the funder."
    bind:checked={confirmed}
  />
  <div>
    <BissButton type="submit" disabled={!confirmed}>Submit plan</BissButton>
  </div>
</form>
