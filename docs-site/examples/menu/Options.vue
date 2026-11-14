<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissMenu, type BissMenuItem } from 'biss-ui/vue';

const showArchived = ref(false);
const compact = ref(true);
const groupBy = ref('status');

const groups = [
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
  { key: 'funder', label: 'Funder' },
];

const items = computed<BissMenuItem[]>(() => [
  { key: 'archived', label: 'Show archived projects', checked: showArchived.value },
  { key: 'compact', label: 'Compact rows', checked: compact.value },
  {
    key: 'group',
    label: 'Group by',
    description: groups.find((group) => group.key === groupBy.value)?.label,
    separator: true,
    children: groups.map((group) => ({ ...group, checked: group.key === groupBy.value })),
  },
]);

function pick(item: BissMenuItem) {
  if (item.key === 'archived') showArchived.value = !showArchived.value;
  else if (item.key === 'compact') compact.value = !compact.value;
  else groupBy.value = item.key;
}
</script>

<template>
  <BissMenu label="View options" :items="items" @pick="pick" />
</template>
