<script setup lang="ts">
import { ref } from 'vue';
import { BissCommandMenu, type BissCommand } from 'biss-ui/vue';

const people: BissCommand[] = [
  { key: 'ada', label: 'Ada Lovelace', description: 'Principal investigator', group: 'People', icon: 'user', keywords: ['pi'] },
  { key: 'grace', label: 'Grace Hopper', description: 'Data steward', group: 'People', icon: 'user' },
  { key: 'alan', label: 'Alan Turing', description: 'On leave until March', group: 'People', icon: 'user', disabled: true },
  { key: 'katherine', label: 'Katherine Johnson', description: 'Grants officer', group: 'People', icon: 'user' },
  { key: 'methods', label: 'Methods team', description: '6 members', group: 'Teams', icon: 'users' },
  { key: 'office', label: 'Research office', description: '4 members', group: 'Teams', icon: 'users' },
];
const query = ref('');
const mentioned = ref<string[]>([]);

function pick(item: BissCommand) {
  if (!mentioned.value.includes(item.label)) mentioned.value = [...mentioned.value, item.label];
  query.value = '';
}
</script>

<template>
  <div class="example-mentions">
    <BissCommandMenu
      v-model:query="query"
      :items="people"
      searchable
      label="Mention someone"
      search-label="Find a person or team"
      @pick="pick"
      @close="query = ''"
    />
    <p role="status" class="example-status">
      {{ mentioned.length ? `Mentioned: ${mentioned.join(', ')}` : 'No one mentioned yet.' }}
    </p>
  </div>
</template>

<style scoped>
.example-mentions {
  display: grid;
  gap: 8px;
  width: min(100%, 340px);
  align-self: flex-start;
}
.example-status {
  margin: 0;
  color: var(--biss-muted);
  font-size: 13px;
}
</style>
