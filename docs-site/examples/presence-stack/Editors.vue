<script setup lang="ts">
import { BissPresenceStack, type BissPerson } from 'biss-ui/vue';

const editors: BissPerson[] = [
  { id: 'mlc', name: 'Mei Lin Chen' },
  { id: 'jvd', name: 'Joost van Dijk' },
  { id: 'ao', name: 'Amara Okafor' },
  { id: 'lw', name: 'Lukas Weber' },
  { id: 'sr', name: 'Sofia Rossi' },
  { id: 'th', name: 'Tomás Herrera' },
];
</script>

<template>
  <BissPresenceStack :people="editors" label="Editing this proposal" />
</template>
