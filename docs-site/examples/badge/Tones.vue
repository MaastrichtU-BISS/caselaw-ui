<script setup lang="ts">
import { BissBadge } from 'biss-ui/vue';
</script>

<template>
  <BissBadge>Draft</BissBadge>
  <BissBadge tone="info">Submitted</BissBadge>
  <BissBadge tone="warning">Revisions requested</BissBadge>
  <BissBadge tone="success">Funded</BissBadge>
  <BissBadge tone="danger">Report overdue</BissBadge>
</template>
