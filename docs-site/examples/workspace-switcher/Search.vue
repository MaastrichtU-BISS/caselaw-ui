<script setup lang="ts">
import { ref } from 'vue';
import { BissWorkspaceSwitcher, type BissWorkspace } from 'biss-ui/vue';

const workspaces: BissWorkspace[] = [
  { id: 'law', name: 'Faculty of Law', detail: 'Admin' },
  { id: 'biss', name: 'BISS Institute', detail: 'Editor' },
  { id: 'grants', name: 'Grants support', detail: 'Viewer' },
  { id: 'fhml', name: 'Health, Medicine and Life Sciences', detail: 'Editor' },
  { id: 'fasos', name: 'Arts and Social Sciences', detail: 'Viewer' },
  { id: 'library', name: 'University Library', detail: 'Editor' },
  { id: 'ethics', name: 'Ethics review board', detail: 'Member' },
  { id: 'phd', name: 'Graduate school', detail: 'Viewer' },
];
const current = ref('biss');
const open = ref(true);
</script>

<template>
  <div class="example-search">
    <div class="example-wide">
      <BissWorkspaceSwitcher
        v-model:open="open"
        :workspaces="workspaces"
        :current="current"
        @select="current = $event.id"
      />
    </div>
    <div class="example-rail">
      <BissWorkspaceSwitcher :workspaces="workspaces" :current="current" collapsed @select="current = $event.id" />
      <small>Rail</small>
    </div>
  </div>
</template>

<style scoped>
.example-search {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  align-self: flex-start;
  min-height: 440px;
}
.example-wide {
  width: 240px;
}
.example-rail {
  display: grid;
  justify-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: var(--biss-radius-md);
  background: var(--biss-surface-muted);
  color: var(--biss-muted);
}
</style>
