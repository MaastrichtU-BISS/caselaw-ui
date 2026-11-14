<script lang="ts">
  import { BissTagInput } from 'biss-ui/svelte';

  let keywords = $state(['case-law', 'GDPR']);
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)">
  <BissTagInput
    bind:modelValue={keywords}
    placeholder="Add keyword"
    suggestions={['competition', 'human-rights', 'migration']}
  />
  <p style="color: var(--biss-muted)">{keywords.length} keywords on this project</p>
</div>
