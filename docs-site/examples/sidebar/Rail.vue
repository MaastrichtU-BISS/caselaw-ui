<script setup lang="ts">
import { ref } from 'vue';
import { BissAvatar, BissIcon, BissNavItem, BissNavSection, BissSidebar } from 'biss-ui/vue';

const collapsed = ref(true);
</script>

<template>
  <div class="example-app">
    <BissSidebar v-model:collapsed="collapsed" label="Grants office">
      <template #brand="{ collapsed: rail }">
        <span class="example-brand"><span aria-hidden="true">G</span><b v-if="!rail">Grants office</b></span>
      </template>
      <BissNavSection heading="Funding">
        <BissNavItem label="Calls" href="#calls" active aria-current="page"><template #icon><BissIcon name="target" /></template></BissNavItem>
        <BissNavItem label="Applications" href="#applications" meta="7"><template #icon><BissIcon name="file" /></template></BissNavItem>
        <BissNavItem label="Awards" href="#awards"><template #icon><BissIcon name="star" /></template></BissNavItem>
        <BissNavItem label="Deadlines" href="#deadlines"><template #icon><BissIcon name="cal" /></template></BissNavItem>
      </BissNavSection>
      <template #footer>
        <BissAvatar name="Grace Hopper" :size="30" />
      </template>
    </BissSidebar>
    <main class="example-main">
      <strong>Calls</strong>
      <p>{{ collapsed ? 'Collapsed to the rail. Use the toggle to expand it.' : 'Expanded.' }}</p>
    </main>
  </div>
</template>

<style scoped>
.example-app {
  display: flex;
  height: 460px;
  border: 1px solid var(--biss-border);
  border-radius: var(--biss-radius-lg);
  overflow: hidden;
  background: var(--biss-bg);
}
.example-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  white-space: nowrap;
}
.example-brand > span {
  display: grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: var(--biss-success);
  color: var(--biss-on-primary);
  font-weight: 700;
  font-size: 13px;
}
.example-main {
  flex: 1;
  min-width: 0;
  padding: 16px 20px;
}
.example-main p {
  color: var(--biss-muted);
  font-size: 13.5px;
}
</style>
