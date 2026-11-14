<script setup lang="ts">
import { BissAppShell, BissPageHeader } from 'biss-ui/vue';

const topLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Help', href: '#help' },
];
</script>

<template>
  <BissAppShell brand="Research Portal" mark="R" :top-links="topLinks">
    <BissPageHeader title="Your account" subtitle="Name, email and notification settings for the research portal." />
  </BissAppShell>
</template>
