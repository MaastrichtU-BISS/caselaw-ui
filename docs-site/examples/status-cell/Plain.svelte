<script lang="ts">
  import { BissStatusCell } from 'biss-ui/svelte';
</script>

<BissStatusCell label="On track" color="var(--biss-success)" soft={false} />
<BissStatusCell label="At risk" color="var(--biss-warning)" soft={false} />
<BissStatusCell label="Blocked" color="var(--biss-danger)" soft={false} />
