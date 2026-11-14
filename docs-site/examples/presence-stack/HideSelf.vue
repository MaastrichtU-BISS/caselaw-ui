<script setup lang="ts">
import { BissPresenceStack, type BissPerson } from 'biss-ui/vue';

const viewers: BissPerson[] = [
  { id: 'me', name: 'Amara Okafor' },
  { id: 'lw', name: 'Lukas Weber' },
  { id: 'sr', name: 'Sofia Rossi' },
];
const currentUserId = 'me';
</script>

<template>
  <BissPresenceStack :people="viewers" :self-id="currentUserId" label="Also viewing">
    <span>also viewing</span>
  </BissPresenceStack>
</template>
