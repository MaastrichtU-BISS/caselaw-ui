<script lang="ts">
  import { BissBreadcrumbs } from 'biss-ui/svelte';

  const trail = [
    { label: 'Grants', href: '/grants' },
    { label: 'Horizon Europe', href: '/grants/horizon-europe' },
    { label: 'ERC Starting Grant 2027' },
  ];
</script>

<BissBreadcrumbs items={trail} />
