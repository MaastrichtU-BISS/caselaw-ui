<script lang="ts">
  import { BissPresenceStack, type BissPerson } from 'biss-ui/svelte';

  const team: BissPerson[] = [
    { id: 'mlc', name: 'Mei Lin Chen' },
    { id: 'jvd', name: 'Joost van Dijk' },
    { id: 'ao', name: 'Amara Okafor' },
    { id: 'lw', name: 'Lukas Weber' },
    { id: 'sr', name: 'Sofia Rossi' },
  ];
</script>

<BissPresenceStack people={team} limit={2} label="Reviewers" />
<BissPresenceStack people={team} size={32} limit={3} label="Data Science Group" />
