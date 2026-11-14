<script lang="ts">
  import { BissPagination } from 'biss-ui/svelte';

  let page = $state(8);
</script>

<BissPagination bind:page pages={20} siblings={2} label="Search results" />
