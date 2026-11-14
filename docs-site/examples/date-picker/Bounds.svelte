<script lang="ts">
  import { BissDatePicker } from 'biss-ui/svelte';

  // Claims are only accepted within the grant period.
  let claimDate = $state<string | null>('2026-11-20');
</script>

<div style="width: min(100%, 18rem)">
  <BissDatePicker
    value={claimDate}
    min="2026-11-10"
    max="2026-11-30"
    label="Expense date"
    onchange={(day) => (claimDate = day)}
  />
</div>
