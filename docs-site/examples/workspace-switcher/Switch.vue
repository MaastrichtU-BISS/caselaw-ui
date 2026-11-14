<script setup lang="ts">
import { ref } from 'vue';
import { BissWorkspaceSwitcher, type BissWorkspace } from 'biss-ui/vue';

const workspaces: BissWorkspace[] = [
  { id: 'law', name: 'Faculty of Law', detail: 'Research office · Admin' },
  { id: 'biss', name: 'BISS Institute', detail: 'Data science · Editor' },
  { id: 'grants', name: 'Grants support', detail: 'Funding office · Viewer' },
];
const current = ref('law');
const open = ref(true);
const status = ref('');

function select(workspace: BissWorkspace) {
  current.value = workspace.id; // Usually: reload the app in the new workspace.
  status.value = `Switched to ${workspace.name}`;
}
</script>

<template>
  <div class="example-switch">
    <BissWorkspaceSwitcher
      v-model:open="open"
      :workspaces="workspaces"
      :current="current"
      @select="select"
      @create="status = 'Create a workspace requested'"
    />
    <p role="status" class="example-status">{{ status }}</p>
  </div>
</template>

<style scoped>
.example-switch {
  width: 240px;
  align-self: flex-start;
}
.example-status {
  margin: 230px 0 0;
  color: var(--biss-muted);
  font-size: 13px;
}
</style>
