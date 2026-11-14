<script lang="ts">
  import { BissDateField } from 'biss-ui/svelte';

  let reviewDate = $state<string | null>(null);
</script>

<BissDateField
  label="Ethics review date"
  placeholder="No review scheduled"
  value={reviewDate}
  onchange={(day) => (reviewDate = day)}
/>
