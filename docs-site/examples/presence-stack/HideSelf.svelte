<script lang="ts">
  import { BissPresenceStack, type BissPerson } from 'biss-ui/svelte';

  const viewers: BissPerson[] = [
    { id: 'me', name: 'Amara Okafor' },
    { id: 'lw', name: 'Lukas Weber' },
    { id: 'sr', name: 'Sofia Rossi' },
  ];
  const currentUserId = 'me';
</script>

<BissPresenceStack people={viewers} selfId={currentUserId} label="Also viewing">
  <span>also viewing</span>
</BissPresenceStack>
