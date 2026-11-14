<script lang="ts">
  import { BissPagination } from 'biss-ui/svelte';

  let page = $state(3);
  let pageSize = $state(25);
</script>

<BissPagination
  bind:page
  bind:pageSize
  total={482}
  pageSizes={[25, 50, 100]}
  onpagesize={() => (page = 1)}
/>
