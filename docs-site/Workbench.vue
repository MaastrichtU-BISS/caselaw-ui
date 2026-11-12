<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  BissPageBar,
  BissButton,
  BissIcon,
  BissDataGrid,
  BissDialog,
  BissField,
  BissInput,
  BissTextarea,
  BissSelect,
  BissBadge,
  BissViewTabs,
  BissEmptyState,
} from '../src/vue';
import type { BissColumn } from '../src/core/types';
const query = ref(''),
  view = ref('all'),
  selected = ref<string[]>([]),
  sort = ref({ key: 'name', direction: 'asc' as 'asc' | 'desc' }),
  editor = ref(false),
  error = ref(''),
  notice = ref('');
const columns = ref<BissColumn[]>([
  { key: 'name', label: 'Project', visible: true, pinned: true, width: 240 },
  { key: 'team', label: 'Team', visible: true, width: 170 },
  { key: 'status', label: 'Status', visible: true, width: 150 },
]);
const rows = ref([
  {
    id: 'open',
    name: 'Open justice',
    team: 'Legal research',
    status: 'In progress',
    description: 'Access to public decisions and research data.',
  },
  {
    id: 'access',
    name: 'Public access',
    team: 'Data science',
    status: 'In review',
    description: 'Understanding how people find public information.',
  },
  {
    id: 'archive',
    name: 'Digital archives',
    team: 'Research',
    status: 'Planned',
    description: 'A shared archive for the team.',
  },
]);
const draft = ref({ id: '', name: '', team: 'Research', status: 'Planned', description: '' });
const filtered = computed(() =>
  rows.value.filter(
    (r) =>
      (view.value !== 'review' || r.status === 'In review') &&
      Object.values(r).join(' ').toLowerCase().includes(query.value.toLowerCase()),
  ),
);
function edit(row?: (typeof rows.value)[number]) {
  draft.value = row
    ? { ...row }
    : { id: '', name: '', team: 'Research', status: 'Planned', description: '' };
  error.value = '';
  editor.value = true;
}
function save() {
  if (!draft.value.name.trim()) {
    error.value = 'Enter a project name.';
    return;
  }
  const row = {
    ...draft.value,
    name: draft.value.name.trim(),
    id: draft.value.id || 'project-' + Date.now(),
  };
  rows.value =
    row.id === draft.value.id
      ? rows.value.map((r) => (r.id === row.id ? row : r))
      : [...rows.value, row];
  editor.value = false;
  notice.value = 'Project saved in this example.';
}
</script>
<template>
  <article class="workbench" aria-label="Interactive research workspace">
    <div class="workbench-context">
      <span><BissIcon name="grid" /> Research workspace</span><BissBadge>Local demo</BissBadge>
    </div>
    <BissPageBar
      heading="h2"
      title="Projects"
      description="The team’s ongoing research and shared work."
      ><template #actions
        ><BissButton @click="edit()"><BissIcon name="plus" />New project</BissButton></template
      ><template #tabs
        ><BissViewTabs
          v-model="view"
          label="Project views"
          :items="[
            { key: 'all', label: 'All projects', count: rows.length },
            {
              key: 'review',
              label: 'In review',
              count: rows.filter((r) => r.status === 'In review').length,
            },
          ]" /></template
    ></BissPageBar>
    <div class="workbench-tools">
      <BissInput
        v-model="query"
        type="search"
        placeholder="Search projects"
        aria-label="Search projects"
      /><span>{{ filtered.length }} projects</span>
    </div>
    <BissDataGrid
      :rows="filtered"
      :columns="columns"
      :selected="selected"
      :sort-key="sort.key"
      :sort-direction="sort.direction"
      label="Projects"
      @columns="columns = $event"
      @select="selected = $event"
      @sort="sort = $event"
      ><template #cell="{ row, column, value }"
        ><button
          v-if="column.key === 'name'"
          type="button"
          class="workbench-record"
          @click="edit(row as (typeof rows)[number])"
        >
          {{ value }}</button
        ><BissBadge
          v-else-if="column.key === 'status'"
          :tone="value === 'In review' ? 'warning' : 'neutral'"
          >{{ value }}</BissBadge
        ><span v-else>{{ value }}</span></template
      ></BissDataGrid
    >
    <p v-if="notice" class="workbench-notice" role="status">{{ notice }}</p>
    <BissDialog
      :open="editor"
      :title="draft.id ? 'Edit project' : 'New project'"
      description="This example stores changes in memory."
      @close="editor = false"
      ><form id="workbench-form" class="workbench-form" @submit.prevent="save" novalidate>
        <BissField
          label="Project name"
          hint="Use a name your teammates recognize."
          :error="error"
          required
          ><BissInput v-model="draft.name" data-biss-autofocus /></BissField
        ><BissField label="Team"
          ><BissSelect
            v-model="draft.team"
            :options="[
              { value: 'Research', label: 'Research' },
              { value: 'Legal research', label: 'Legal research' },
              { value: 'Data science', label: 'Data science' },
            ]" /></BissField
        ><BissField label="Description" optional
          ><BissTextarea v-model="draft.description"
        /></BissField>
      </form>
      <template #actions
        ><BissButton variant="secondary" @click="editor = false">Cancel</BissButton
        ><BissButton type="submit" form="workbench-form">Save project</BissButton></template
      ></BissDialog
    >
  </article>
</template>
<style>
.workbench {
  border: 1px solid var(--biss-border);
  border-radius: 10px;
  background: var(--biss-card);
  overflow: hidden;
  color: var(--biss-text);
  font: 14px/1.55 var(--biss-font-family);
}
.workbench-context {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: var(--biss-surface-subtle);
  border-bottom: 1px solid var(--biss-border);
}
.workbench-context > span {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
}
.workbench > .biss-pagebar {
  padding: 24px 20px 0;
}
.workbench-tools {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px 20px;
}
.workbench-tools > .biss-input {
  max-width: 300px;
}
.workbench-tools > span {
  color: var(--biss-muted);
  font-size: 12px;
  margin-inline-start: auto;
}
.workbench > .biss-data-grid {
  padding: 0 20px 24px;
}
.workbench-record {
  border: 0;
  background: transparent;
  color: var(--biss-primary);
  font: 500 13.5px var(--biss-font-family);
  cursor: pointer;
  text-align: start;
  padding: 0;
}
.workbench-record:hover {
  text-decoration: underline;
}
.workbench-form {
  display: grid;
  gap: 18px;
}
.workbench-notice {
  margin: 0;
  padding: 0 20px 16px;
  font-size: 13px;
  color: var(--biss-success);
}
@media (max-width: 640px) {
  .workbench > .biss-pagebar {
    padding: 16px 12px 0;
  }
  .workbench-tools {
    padding: 12px;
  }
  .workbench > .biss-data-grid {
    padding: 0 12px 16px;
  }
  .workbench-tools > span {
    display: none;
  }
}
</style>
