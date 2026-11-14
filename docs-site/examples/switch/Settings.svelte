<script lang="ts">
  import { BissSwitch } from 'biss-ui/svelte';

  let publicPage = $state(true);
  let guestComments = $state(false);
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)">
  <BissSwitch
    bind:modelValue={publicPage}
    label="Public project page"
    hint={publicPage ? 'Visible at biss.example/p/citation-networks' : 'Only members can see the project.'}
  />
  <BissSwitch
    bind:modelValue={guestComments}
    label="Comments from guest reviewers"
    hint="Guests can comment on shared drafts."
  />
</div>
