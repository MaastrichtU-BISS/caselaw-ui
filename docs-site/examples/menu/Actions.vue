<script setup lang="ts">
import { ref } from 'vue';
import { BissMenu, type BissMenuItem } from 'biss-ui/vue';

const items: BissMenuItem[] = [
  { key: 'rename', label: 'Rename', icon: 'edit', hint: 'R' },
  { key: 'duplicate', label: 'Duplicate', icon: 'copy' },
  { key: 'share', label: 'Copy link', icon: 'link' },
  { key: 'export', label: 'Export as CSV', icon: 'down', disabled: true },
  { key: 'delete', label: 'Delete project', icon: 'trash', danger: true, separator: true },
];
const last = ref('');
</script>

<template>
  <BissMenu label="Project actions" :items="items" @pick="last = $event.label" />
  <p role="status">{{ last ? `Chose “${last}”` : 'Nothing chosen yet' }}</p>
</template>
