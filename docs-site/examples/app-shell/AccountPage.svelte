<script lang="ts">
  import { BissAppShell, BissPageHeader } from 'biss-ui/svelte';

  const topLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Help', href: '#help' },
  ];
</script>

<BissAppShell brand="Research Portal" mark="R" {topLinks}>
  <BissPageHeader title="Your account" subtitle="Name, email and notification settings for the research portal." />
</BissAppShell>
