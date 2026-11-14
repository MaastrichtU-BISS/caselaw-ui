<script setup lang="ts">
import { ref } from 'vue';
import {
  BissAvatar,
  BissHeaderAction,
  BissIcon,
  BissNavItem,
  BissNavSection,
  BissSidebar,
  BissSidebarUser,
  BissWorkspaceSwitcher,
} from 'biss-ui/vue';

const collapsed = ref(false);
const drawer = ref(false);
const workspaces = [
  { id: 'law', name: 'Faculty of Law', detail: 'Research office' },
  { id: 'biss', name: 'BISS Institute', detail: 'Data science' },
];
</script>

<template>
  <div class="example-app">
    <BissSidebar v-model:collapsed="collapsed" v-model:mobile-open="drawer" label="Research office">
      <template #brand="{ collapsed: rail }">
        <BissWorkspaceSwitcher :workspaces="workspaces" current="law" :collapsed="rail" />
      </template>
      <BissNavSection heading="Workspace">
        <BissNavItem label="Home" href="#home"><template #icon><BissIcon name="home" /></template></BissNavItem>
        <BissNavItem label="Projects" href="#projects" meta="12" active aria-current="page"
          ><template #icon><BissIcon name="kanban" /></template
        ></BissNavItem>
        <BissNavItem label="Grants" href="#grants" meta="4"><template #icon><BissIcon name="deals" /></template></BissNavItem>
        <BissNavItem label="People" href="#people"><template #icon><BissIcon name="people" /></template></BissNavItem>
      </BissNavSection>
      <BissNavSection heading="Administration">
        <BissNavItem label="Budgets" href="#budgets"><template #icon><BissIcon name="sigma" /></template></BissNavItem>
        <BissNavItem label="Reports" href="#reports"><template #icon><BissIcon name="chart" /></template></BissNavItem>
      </BissNavSection>
      <template #pinned>
        <BissNavItem label="Open justice" href="#open-justice"><template #icon><BissIcon name="pin" /></template></BissNavItem>
        <BissNavItem label="Horizon proposal" href="#horizon"><template #icon><BissIcon name="file" /></template></BissNavItem>
      </template>
      <template #footer="{ collapsed: rail }">
        <BissAvatar v-if="rail" name="Ada Lovelace" :size="30" />
        <BissSidebarUser v-else name="Ada Lovelace" email="ada@example.org" />
      </template>
    </BissSidebar>
    <main class="example-main">
      <header>
        <BissHeaderAction class="example-menu" label="Open navigation" icon="menu" @click="drawer = true" />
        <strong>Projects</strong>
      </header>
      <p>Twelve research projects across three teams.</p>
    </main>
  </div>
</template>

<style scoped>
.example-app {
  display: flex;
  height: 540px;
  border: 1px solid var(--biss-border);
  border-radius: var(--biss-radius-lg);
  overflow: hidden;
  background: var(--biss-bg);
}
.example-main {
  flex: 1;
  min-width: 0;
  padding: 16px 20px;
}
.example-main header {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
}
.example-main p {
  color: var(--biss-muted);
  font-size: 13.5px;
}
.example-menu {
  display: none;
}
@media (max-width: 760px) {
  .example-menu {
    display: inline-grid;
  }
}
</style>
