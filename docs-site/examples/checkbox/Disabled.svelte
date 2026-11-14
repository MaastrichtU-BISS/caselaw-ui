<script lang="ts">
  import { BissCheckbox } from 'biss-ui/svelte';
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 24rem)">
  <BissCheckbox
    label="Require two-factor sign-in"
    description="Enforced for every member by your workspace administrator."
    checked
    disabled
  />
  <BissCheckbox
    label="Allow guest reviewers"
    description="Only workspace owners can change this."
    disabled
  />
</div>
