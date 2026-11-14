<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissFilterBuilder, type BissFilterField, type BissFilterRule } from 'biss-ui/vue';

type Project = { id: string; title: string; status: string; funder: string };

const projects: Project[] = [
  { id: 'p1', title: 'Court reasoning at scale', status: 'Active', funder: 'NWO' },
  { id: 'p2', title: 'Precedent networks in EU law', status: 'Active', funder: 'ERC' },
  { id: 'p3', title: 'Open data for legal research', status: 'Proposal', funder: 'UM Fund' },
  { id: 'p4', title: 'Citizen access to case law', status: 'Closed', funder: 'Horizon Europe' },
  { id: 'p5', title: 'Annotation tools for jurists', status: 'Active', funder: 'NWO' },
];

const fields: BissFilterField[] = [
  { key: 'status', label: 'Status', operators: [{ value: 'is', label: 'is' }, { value: 'is-not', label: 'is not' }] },
  { key: 'funder', label: 'Funder', operators: [{ value: 'is', label: 'is' }] },
  { key: 'title', label: 'Title', operators: [{ value: 'contains', label: 'contains' }] },
];

const rules = ref<BissFilterRule[]>([
  { id: 'r1', field: 'status', operator: 'is', value: 'Active' },
  { id: 'r2', field: 'funder', operator: 'is', value: 'NWO' },
]);
const match = ref<'all' | 'any'>('all');

function test(rule: BissFilterRule, project: Project) {
  const actual = project[rule.field as keyof Project].toLowerCase();
  const wanted = rule.value.trim().toLowerCase();
  if (!wanted) return true;
  if (rule.operator === 'contains') return actual.includes(wanted);
  if (rule.operator === 'is-not') return actual !== wanted;
  return actual === wanted;
}

const results = computed(() =>
  projects.filter((project) =>
    !rules.value.length || match.value === 'all'
      ? rules.value.every((rule) => test(rule, project))
      : rules.value.some((rule) => test(rule, project)),
  ),
);
</script>

<template>
  <div class="biss-stack">
    <BissFilterBuilder
      label="Project filters"
      :fields="fields"
      :rules="rules"
      :match="match"
      @change="rules = $event"
      @match="match = $event"
    />
    <div>
      <p role="status">{{ results.length }} of {{ projects.length }} projects match</p>
      <ul>
        <li v-for="project in results" :key="project.id">{{ project.title }}</li>
      </ul>
    </div>
  </div>
</template>
