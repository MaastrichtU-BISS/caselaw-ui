<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  BissAppShell,
  BissButton,
  BissNavItem,
  BissNavSection,
  BissPageHeader,
  BissSidebarUser,
} from 'biss-ui/vue';

const sections = [
  {
    heading: 'Research',
    items: [
      { id: 'projects', label: 'Projects', meta: 12 },
      { id: 'grants', label: 'Grants', meta: 3 },
      { id: 'deadlines', label: 'Deadlines' },
    ],
  },
  {
    heading: 'Administration',
    items: [
      { id: 'team', label: 'Team' },
      { id: 'budget', label: 'Budget' },
    ],
  },
];

const active = ref('projects');
const page = computed(() => sections.flatMap((section) => section.items).find((item) => item.id === active.value)!);
</script>

<template>
  <BissAppShell brand="Law & Tech Lab" mark="L">
    <template #sidebar>
      <BissNavSection v-for="section in sections" :key="section.heading" :heading="section.heading">
        <BissNavItem
          v-for="item in section.items"
          :key="item.id"
          :href="`#${item.id}`"
          :label="item.label"
          :meta="item.meta"
          :active="active === item.id"
          @click.prevent="active = item.id"
        />
      </BissNavSection>
    </template>
    <template #sidebar-footer>
      <BissSidebarUser name="Lena Vos" email="l.vos@maastrichtuniversity.nl" />
    </template>

    <BissPageHeader eyebrow="Research" :title="page.label" subtitle="Everything the lab is working on this term.">
      <template #actions>
        <BissButton>New project</BissButton>
      </template>
    </BissPageHeader>
  </BissAppShell>
</template>
