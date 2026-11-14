<script setup lang="ts">
import { BissBadge, BissBreadcrumbs } from 'biss-ui/vue';

const trail = [
  { label: 'Teams', href: '/teams' },
  { label: 'Law and Tech Lab', href: '/teams/law-tech' },
  { label: 'Members' },
];
</script>

<template>
  <header>
    <BissBreadcrumbs :items="trail" label="Team location" />
    <h1 style="margin: 0; font-size: 22px">
      Members <BissBadge>14</BissBadge>
    </h1>
  </header>
</template>
