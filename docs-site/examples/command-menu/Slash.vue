<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissCommandMenu, type BissCommand } from 'biss-ui/vue';

const commands: BissCommand[] = [
  { key: 'heading', label: 'Heading', description: 'A section title', group: 'Text', icon: 'heading', shortcut: '#' },
  { key: 'list', label: 'Bulleted list', description: 'A simple list', group: 'Text', icon: 'list', shortcut: '-' },
  { key: 'quote', label: 'Quote', description: 'Cite a source or decision', group: 'Text', icon: 'quote' },
  { key: 'tasks', label: 'Task list', description: 'Track actions with owners', group: 'Planning', icon: 'checkbox', keywords: ['todo'] },
  { key: 'deadline', label: 'Deadline', description: 'A dated milestone', group: 'Planning', icon: 'cal' },
  { key: 'budget', label: 'Budget table', description: 'Grant costs by line', group: 'Data', icon: 'sigma', disabled: true },
  { key: 'chart', label: 'Chart', description: 'Publications per year', group: 'Data', icon: 'chart' },
];

const text = ref('/');
const inserted = ref('');
const menu = ref<InstanceType<typeof BissCommandMenu> | null>(null);
const open = computed(() => text.value.startsWith('/'));

function keydown(event: KeyboardEvent) {
  if (open.value) menu.value?.handleKey(event);
}
function pick(item: BissCommand) {
  inserted.value = item.label; // Insert the block in your editor here.
  text.value = '';
}
</script>

<template>
  <div class="example-slash">
    <input
      v-model="text"
      class="biss-input"
      aria-label="Meeting notes"
      placeholder="Type / for commands"
      role="combobox"
      :aria-expanded="open"
      :aria-controls="open ? menu?.listId : undefined"
      :aria-activedescendant="open ? menu?.activeId : undefined"
      @keydown="keydown"
    />
    <BissCommandMenu
      v-if="open"
      ref="menu"
      :items="commands"
      :query="text.slice(1)"
      label="Insert a block"
      @pick="pick"
      @close="text = ''"
    />
    <p role="status" class="example-status">{{ inserted ? `Inserted ${inserted}` : 'Nothing inserted yet.' }}</p>
  </div>
</template>

<style scoped>
.example-slash {
  display: grid;
  gap: 8px;
  width: min(100%, 360px);
  align-self: flex-start;
}
.example-status {
  margin: 0;
  color: var(--biss-muted);
  font-size: 13px;
}
</style>
