<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissIcon, BissSearchPalette, type BissSearchItem } from 'biss-ui/vue';

const items: BissSearchItem[] = [
  { key: 'p-ecli', group: 'Projects', icon: 'folder', label: 'ECLI citation network', description: 'Law and Tech Lab' },
  { key: 'p-gdpr', group: 'Projects', icon: 'folder', label: 'GDPR enforcement tracker', description: 'Privacy group' },
  { key: 'u-lena', group: 'People', icon: 'user', label: 'Lena Janssen', description: 'Principal investigator' },
  { key: 'u-tom', group: 'People', icon: 'user', label: 'Tom Peeters', description: 'Research assistant' },
  { key: 'a-new', group: 'Actions', icon: 'plus', label: 'New project' },
  { key: 'a-invite', group: 'Actions', icon: 'mail', label: 'Invite a colleague' },
];
const open = ref(false);
const chosen = ref('');

function pick(item: BissSearchItem) {
  chosen.value = item.label;
  open.value = false;
}
</script>

<template>
  <BissButton variant="secondary" @click="open = true">
    <BissIcon name="search" />Search
  </BissButton>
  <p v-if="chosen" role="status">Opened {{ chosen }}</p>
  <BissSearchPalette
    :open="open"
    :items="items"
    label="Search the workspace"
    placeholder="Projects, people, actions…"
    @pick="pick"
    @close="open = false"
  />
</template>
