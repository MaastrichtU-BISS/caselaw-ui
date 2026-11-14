<script lang="ts">
  import { BissButton, BissField, BissInput, BissPopover } from 'biss-ui/svelte';

  let reviewers = $state(['Dr. Sanne de Vries']);
  let email = $state('');

  function add(event: SubmitEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    reviewers = [...reviewers, email.trim()];
    email = '';
  }
</script>

<BissPopover label="Add reviewer">
  <form class="biss-stack biss-stack-sm" onsubmit={add}>
    <BissField label="Email address">
      <BissInput bind:value={email} type="email" placeholder="name@maastrichtuniversity.nl" />
    </BissField>
    <BissButton type="submit" size="sm">Add reviewer</BissButton>
  </form>
</BissPopover>
<p role="status">Reviewers: {reviewers.join(', ')}</p>
