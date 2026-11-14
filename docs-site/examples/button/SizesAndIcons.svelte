<script lang="ts">
  import { BissButton, BissIcon } from 'biss-ui/svelte';
</script>

<BissButton><BissIcon name="plus" />New project</BissButton>
<BissButton size="sm" variant="secondary"><BissIcon name="filter" />Filter</BissButton>
<BissButton icon variant="secondary" aria-label="Share project">
  <BissIcon name="link" />
</BissButton>
<BissButton icon size="sm" variant="ghost" aria-label="More actions">
  <BissIcon name="more" />
</BissButton>
