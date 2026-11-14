<script lang="ts">
  import { BissDatePicker } from 'biss-ui/svelte';

  let deadline = $state<string | null>('2026-12-15');
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 18rem)">
  <BissDatePicker
    value={deadline}
    label="Submission deadline"
    onchange={(day) => (deadline = day)}
  />
  <p role="status">Deadline: {deadline ?? 'not set'}</p>
</div>
