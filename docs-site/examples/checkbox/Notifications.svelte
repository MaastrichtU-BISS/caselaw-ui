<script lang="ts">
  import { BissCheckbox } from 'biss-ui/svelte';

  let notify = $state({ deadlines: true, comments: true, digest: false });
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 24rem)">
  <BissCheckbox
    label="Upcoming deadlines"
    description="Seven days and one day before a deliverable is due."
    bind:checked={notify.deadlines}
  />
  <BissCheckbox
    label="Comments and mentions"
    description="When someone replies to you or mentions you."
    bind:checked={notify.comments}
  />
  <BissCheckbox
    label="Weekly digest"
    description="A Monday summary of activity across your projects."
    bind:checked={notify.digest}
  />
</div>
