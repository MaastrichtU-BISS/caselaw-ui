<script setup lang="ts">
import { ref } from 'vue';
import { BissTemplateGallery, type BissTemplate } from 'biss-ui/vue';

const categories = [
  { value: 'funding', label: 'Funding' },
  { value: 'research', label: 'Research' },
  { value: 'meetings', label: 'Meetings' },
  { value: 'admin', label: 'Administration' },
];
const templates: BissTemplate[] = [
  { id: 'grant', name: 'Grant application', description: 'Track a funding call from intent to submission, with budget and partner tasks.', category: 'funding', icon: 'target', badge: 'Recommended', tags: ['horizon', 'erc', 'proposal'], includes: ['Call details and deadlines', 'Budget table by work package', 'Partner letters checklist', 'Submission review board'] },
  { id: 'reporting', name: 'Grant reporting', description: 'Collect deliverables, spending and outcomes for a periodic report.', category: 'funding', icon: 'chart', includes: ['Deliverables tracker', 'Spending against budget', 'Outcomes summary'] },
  { id: 'study', name: 'Research study', description: 'Plan methods, ethics approval and data management for one study.', category: 'research', icon: 'file', includes: ['Methods and protocol sections', 'Ethics approval steps', 'Data management plan'] },
  { id: 'review', name: 'Literature review', description: 'Screen sources, tag themes and keep extraction notes together.', category: 'research', icon: 'list', tags: ['systematic'], includes: ['Source screening board', 'Theme labels', 'Extraction notes'] },
  { id: 'meeting', name: 'Team meeting', description: 'A recurring agenda with decisions and follow-up actions.', category: 'meetings', icon: 'cal', includes: ['Timed agenda', 'Decisions log', 'Action items with owners'] },
  { id: 'onboarding', name: 'Staff onboarding', description: 'Welcome a new colleague with accounts, introductions and first tasks.', category: 'admin', icon: 'users', badge: 'New', includes: ['First-week checklist', 'Accounts and access', 'Introductions schedule'] },
];

const selected = ref<string | null>('grant');
const busy = ref(false);
const created = ref('');

async function use(template: BissTemplate) {
  busy.value = true;
  await new Promise((resolve) => setTimeout(resolve, 900)); // Create the project here.
  busy.value = false;
  created.value = template.name;
}
</script>

<template>
  <BissTemplateGallery
    v-model:selected="selected"
    :templates="templates"
    :categories="categories"
    :busy="busy"
    blank
    @use="use"
    @blank="created = 'Blank project'"
  />
  <p role="status" class="example-status">
    {{ created ? `Created from “${created}”` : 'Nothing created yet.' }}
  </p>
</template>

<style scoped>
.example-status {
  margin: 12px 0 0;
  color: var(--biss-muted);
  font-size: 13px;
}
</style>
