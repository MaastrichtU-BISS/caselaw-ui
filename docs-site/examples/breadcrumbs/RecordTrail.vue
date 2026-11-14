<script setup lang="ts">
import { BissBreadcrumbs } from 'biss-ui/vue';

const trail = [
  { label: 'Grants', href: '/grants' },
  { label: 'Horizon Europe', href: '/grants/horizon-europe' },
  { label: 'ERC Starting Grant 2027' },
];
</script>

<template>
  <BissBreadcrumbs :items="trail" />
</template>
