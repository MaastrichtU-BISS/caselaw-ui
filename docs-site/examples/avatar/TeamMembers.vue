<script setup lang="ts">
import { BissAvatar } from 'biss-ui/vue';

const members = [
  { name: 'Mei Lin Chen', role: 'Principal investigator' },
  { name: 'Joost van Dijk', role: 'Postdoctoral researcher' },
  { name: 'Amara Okafor', role: 'Data steward' },
];
</script>

<template>
  <ul class="biss-stack biss-stack-sm" style="margin: 0; padding: 0; list-style: none">
    <li v-for="member in members" :key="member.name" style="display: flex; gap: 10px; align-items: center">
      <BissAvatar :name="member.name" />
      <span>
        <strong>{{ member.name }}</strong><br />
        <small style="color: var(--biss-muted)">{{ member.role }}</small>
      </span>
    </li>
  </ul>
</template>
