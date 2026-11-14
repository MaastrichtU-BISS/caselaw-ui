<script lang="ts">
  import { BissStatusCell } from 'biss-ui/svelte';
</script>

<BissStatusCell label="Drafting" color="var(--biss-muted)" />
<BissStatusCell label="Submitted" />
<BissStatusCell label="Under review" color="var(--biss-warning)" />
<BissStatusCell label="Awarded" color="var(--biss-success)" />
<BissStatusCell label="Declined" color="var(--biss-danger)" />
