<script lang="ts">
  import { BissLineChart } from 'biss-ui/svelte';

  // Researchers who signed in at least once, per month from December 2025.
  const activeResearchers = [118, 124, 131, 129, 142, 156, 149, 163, 171, 168, 184, 197];
</script>

<BissLineChart
  values={activeResearchers}
  label="Monthly active researchers, December 2025 to November 2026"
/>
