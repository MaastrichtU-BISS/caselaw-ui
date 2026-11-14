<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  BissBadge,
  BissButton,
  BissCheckbox,
  BissDataGrid,
  BissDatePicker,
  BissField,
  BissFilterBuilder,
  BissGoalBar,
  BissIcon,
  BissInput,
  BissKanban,
  BissKpiCard,
  BissLineChart,
  BissMenu,
  BissPageBar,
  BissPresenceStack,
  BissSegmentedControl,
  BissSharePanel,
  BissSwitch,
  BissTaskList,
  BissViewTabs,
} from '../src/vue';
import { highlight, type BissCodeToken } from '../src/core/highlight';
import type {
  BissAccessEntry,
  BissBoardCard,
  BissColumn,
  BissFilterRule,
  BissMenuItem,
} from '../src/core/types';
import catalog from './generated/components.json';
import './landing.css';

const VERSION = 'v0.1.0-next.0';
const INSTALL = 'npm install biss-ui@next';
const total = catalog.components.length;
const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const label = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
const byShort = new Map(catalog.components.map((c) => [c.short, c]));
const docHref = (short: string) => {
  const c = byShort.get(short);
  return c ? `#/components/${c.slug}` : '#/components';
};
const bothFrameworks = catalog.components.filter((c) => c.vue && c.svelte).length;

/* ---------- Copy to clipboard ---------- */
const copiedKey = ref('');
let copyTimer: ReturnType<typeof setTimeout> | undefined;
async function copy(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text);
    copiedKey.value = key;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copiedKey.value = ''), 1600);
  } catch {
    copiedKey.value = '';
  }
}

/* ---------- Hero workspace (live components, local state) ---------- */
const view = ref('all');
const people = [
  { id: 'ada', name: 'Ada Lovelace' },
  { id: 'grace', name: 'Grace Hopper' },
  { id: 'alan', name: 'Alan Turing' },
  { id: 'mary', name: 'Mary Jackson' },
];
const columns = ref<BissColumn[]>([
  { key: 'name', label: 'Project', visible: true, pinned: true, width: 200 },
  { key: 'team', label: 'Team', visible: true, width: 140 },
  { key: 'due', label: 'Due', visible: true, width: 110 },
  { key: 'status', label: 'Status', visible: true, width: 130 },
]);
const projects = [
  { id: 'open', name: 'Open justice', team: 'Legal research', due: '16 Nov', status: 'On track' },
  { id: 'access', name: 'Public access', team: 'Data science', due: '20 Nov', status: 'In review' },
  { id: 'archive', name: 'Digital archives', team: 'Research', due: '2 Dec', status: 'Planned' },
  { id: 'courts', name: 'Court citations', team: 'Legal research', due: '9 Dec', status: 'On track' },
  { id: 'rulings', name: 'Ruling summaries', team: 'Legal research', due: '28 Nov', status: 'In review' },
  { id: 'treaties', name: 'Treaty index', team: 'Legal research', due: '15 Jan', status: 'Planned' },
  { id: 'survey', name: 'Reader survey', team: 'Data science', due: '4 Dec', status: 'On track' },
];
const selected = ref<string[]>(['open']);
const sort = ref({ key: 'name', direction: 'asc' as 'asc' | 'desc' });
const rules = ref<BissFilterRule[]>([
  { id: 'r1', field: 'team', operator: 'eq', value: 'Legal research' },
  { id: 'r2', field: 'status', operator: 'eq', value: 'In review' },
]);
const match = ref<'all' | 'any'>('any');
const filterFields = [
  {
    key: 'name',
    label: 'Project',
    operators: [
      { value: 'contains', label: 'contains' },
      { value: 'eq', label: 'is' },
    ],
  },
  { key: 'team', label: 'Team', operators: [{ value: 'eq', label: 'is' }] },
  { key: 'status', label: 'Status', operators: [{ value: 'eq', label: 'is' }] },
];
const visibleProjects = computed(() => {
  let rows = projects.filter((p) => view.value === 'all' || p.status === 'In review');
  const active = rules.value.filter((r) => r.value);
  if (active.length) {
    const test = (p: (typeof projects)[number], r: BissFilterRule) => {
      const v = String(p[r.field as keyof typeof p] ?? '').toLowerCase();
      const q = String(r.value).toLowerCase();
      return r.operator === 'contains' ? v.includes(q) : v === q;
    };
    rows = rows.filter((p) =>
      match.value === 'all' ? active.every((r) => test(p, r)) : active.some((r) => test(p, r)),
    );
  }
  const dir = sort.value.direction === 'asc' ? 1 : -1;
  return [...rows].sort(
    (a, b) =>
      String(a[sort.value.key as keyof typeof a]).localeCompare(
        String(b[sort.value.key as keyof typeof b]),
      ) * dir,
  );
});
const menuItems: BissMenuItem[] = [
  {
    key: 'export',
    label: 'Export',
    icon: 'send',
    children: [
      { key: 'csv', label: 'CSV file', description: 'The visible rows' },
      { key: 'pdf', label: 'PDF document' },
    ],
  },
  { key: 'columns', label: 'Edit columns', icon: 'columns' },
  { key: 'share', label: 'Share view', icon: 'link', hint: '⌘ L' },
  { key: 'archive', label: 'Archive', icon: 'trash', danger: true, separator: true },
];
const lastAction = ref('');
const lanes = [
  { id: 'todo', label: 'Planned', color: '#005CA9' },
  { id: 'doing', label: 'In progress', color: '#E8A900' },
  { id: 'done', label: 'Complete', color: '#0F7A4E' },
];
const cards = ref<BissBoardCard[]>([
  {
    id: 'policy',
    title: 'Review access policy',
    lane: 'todo',
    owner: 'Ada Lovelace',
    due: '2026-11-16',
  },
  { id: 'dataset', title: 'Publish dataset', lane: 'doing', owner: 'Grace Hopper', due: '2026-11-20' },
  { id: 'ethics', title: 'Ethics approval', lane: 'done', owner: 'Alan Turing' },
]);
function moveCard(e: { id: string; lane: string }) {
  cards.value = cards.value.map((c) => (c.id === e.id ? { ...c, lane: e.lane } : c));
}
const day = ref<string | null>('2026-11-20');
const tasks = ref([
  { id: 'methods', title: 'Review the methods section', done: false, owner: 'Ada Lovelace', due: '2026-11-18' },
  { id: 'upload', title: 'Upload source data', done: true, owner: 'Grace Hopper' },
  { id: 'consent', title: 'Collect consent forms', done: false, owner: 'Mary Jackson', due: '2026-11-24' },
]);
function completeTask(e: { id: string; done: boolean }) {
  tasks.value = tasks.value.map((t) => (t.id === e.id ? { ...t, done: e.done } : t));
}

/* ---------- Theming playground ---------- */
const accents = [
  { name: 'BISS blue', value: '#005CA9' },
  { name: 'Teal', value: '#0B7285' },
  { name: 'Forest', value: '#0F7A4E' },
  { name: 'Ochre', value: '#8A6100' },
  { name: 'Clay', value: '#B4502F' },
  { name: 'Slate', value: '#4A5560' },
];
const radii: Record<string, [number, number, number]> = {
  sharp: [2, 3, 4],
  subtle: [4, 6, 8],
  default: [7, 10, 12],
  round: [11, 15, 18],
};
const accent = ref('#005CA9');
const radius = ref('default');
const density = ref('standard');
const mode = ref('light');
const themeEmail = ref('');
const themeNotify = ref(true);
const themeWeekly = ref(false);
const themeScope = ref('team');
const themeRows = [
  { id: 'a', name: 'Open justice', owner: 'Ada Lovelace', status: 'On track' },
  { id: 'b', name: 'Public access', owner: 'Grace Hopper', status: 'In review' },
  { id: 'c', name: 'Digital archives', owner: 'Alan Turing', status: 'Planned' },
];
const themeColumns = ref<BissColumn[]>([
  { key: 'name', label: 'Project', visible: true, width: 132 },
  { key: 'owner', label: 'Owner', visible: true, width: 112 },
  { key: 'status', label: 'Status', visible: true, width: 104 },
]);
const themeSelected = ref<string[]>(['a']);

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
}
function rgbToHex(rgb: readonly number[]) {
  return (
    '#' +
    rgb
      .map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}
const mix = (hex: string, target: number, amount: number) =>
  rgbToHex(hexToRgb(hex).map((v) => v + (target - v) * amount));
const tokens = computed(() => {
  const dark = mode.value === 'dark';
  const primary = dark ? mix(accent.value, 255, 0.14) : accent.value;
  const hover = dark ? mix(accent.value, 255, 0.26) : mix(accent.value, 0, 0.18);
  const [sm, md, lg] = radii[radius.value] ?? radii.default!;
  return { primary, hover, sm, md, lg };
});
const themeStyle = computed(() => {
  const t = tokens.value;
  const [r, g, b] = hexToRgb(t.primary);
  return {
    '--biss-primary': t.primary,
    '--biss-primary-hover': t.hover,
    '--biss-info': t.primary,
    '--biss-focus': `rgba(${r}, ${g}, ${b}, 0.28)`,
    '--biss-radius-sm': t.sm + 'px',
    '--biss-radius-md': t.md + 'px',
    '--biss-radius-lg': t.lg + 'px',
  };
});
const themeCss = computed(() => {
  const t = tokens.value;
  const attrs = [
    density.value !== 'standard' ? `\n     data-biss-density="${density.value}"` : '',
    mode.value === 'dark' ? '\n     data-biss-theme="dark"' : '',
  ].join('');
  return `/* Any wrapper, or :root */
.research-tool {
  --biss-primary: ${t.primary};
  --biss-primary-hover: ${t.hover};
  --biss-radius-sm: ${t.sm}px;
  --biss-radius-md: ${t.md}px;
  --biss-radius-lg: ${t.lg}px;
}

<div class="research-tool"${attrs}>`;
});
const cssTokens = computed<BissCodeToken[]>(() => {
  const out: BissCodeToken[] = [];
  for (const line of themeCss.value.split('\n')) {
    const prop = /^(\s*)(--[\w-]+)(:\s*)([^;]+)(;)$/.exec(line);
    if (line.startsWith('/*')) out.push({ text: line, kind: 'comment' });
    else if (prop) {
      out.push({ text: prop[1]! , kind: 'plain' });
      out.push({ text: prop[2]!, kind: 'key' });
      out.push({ text: prop[3]!, kind: 'plain' });
      out.push({ text: prop[4]!, kind: /^\d/.test(prop[4]!) ? 'number' : 'string' });
      out.push({ text: prop[5]!, kind: 'plain' });
    } else if (line.startsWith('<') || /^\s+data-/.test(line)) {
      for (const part of line.split(/("[^"]*")/)) {
        out.push({ text: part, kind: part.startsWith('"') ? 'string' : 'builtin' });
      }
    } else if (line.startsWith('.')) out.push({ text: line, kind: 'builtin' });
    else out.push({ text: line, kind: 'plain' });
    out.push({ text: '\n', kind: 'plain' });
  }
  out.pop();
  return out;
});

/* ---------- Library overview ---------- */
const groupIcons: Record<string, string> = {
  'Getting things done': 'check',
  'Forms and selection': 'checkbox',
  'Overlays and search': 'search',
  'Pages and navigation': 'layout',
  'People and records': 'users',
  'Tables and boards': 'grid',
  'Widgets and charts': 'chart',
  'Content and feedback': 'text',
  Onboarding: 'flag',
};
const groups = computed(() =>
  catalog.groups.map((group) => {
    const members = catalog.components.filter((c) => c.category === group);
    return {
      group,
      count: members.length,
      examples: members.slice(0, 4).map((c) => label(c.short)),
      icon: (groupIcons[group] ?? 'grid') as never,
    };
  }),
);
const blockDefs = [
  {
    title: 'Sharing and permissions',
    body: 'Invite people, change roles and copy a link. Your server decides who may do what.',
    parts: ['SharePanel', 'AccessList', 'RoleEditor', 'CopyField'],
  },
  {
    title: 'Filtering and data',
    body: 'Rule-based filters, column management and a grid with pinned columns and selection.',
    parts: ['FilterBuilder', 'ColumnManager', 'DataGrid', 'LabelEditor', 'TablePager'],
  },
  {
    title: 'Dashboards',
    body: 'KPI cards, goals, charts and a widget grid for overview pages.',
    parts: ['KpiCard', 'GoalCard', 'LineChart', 'StackedBar', 'WidgetGrid'],
  },
  {
    title: 'Planning',
    body: 'Boards, calendars, agendas and timelines over the records you already have.',
    parts: ['Kanban', 'Calendar', 'Agenda', 'Timeline', 'TaskList'],
  },
  {
    title: 'Editors and discussion',
    body: 'Comment threads, composers, inline editing and document navigation.',
    parts: ['CommentThread', 'CommentComposer', 'EditableText', 'DocumentToc', 'AttachmentList'],
  },
  {
    title: 'Onboarding',
    body: 'Step-by-step setup with progress, checklists and choice chips.',
    parts: ['OnboardingFrame', 'Steps', 'Checklist', 'OnboardingChips'],
  },
];
const blocks = computed(() =>
  blockDefs.map((b) => ({ ...b, parts: b.parts.filter((p) => byShort.has(p)) })),
);

/* ---------- Framework parity ---------- */
const parityTab = ref<'vue' | 'svelte'>('vue');
const vueSource = `<script setup lang="ts">
import { ref } from 'vue';
import { BissSharePanel } from 'biss-ui/vue';
import 'biss-ui/styles.css';

const people = ref([
  { id: 'ada', name: 'Ada Lovelace', role: 'editor' },
]);
const roles = [
  { value: 'viewer', label: 'Can view' },
  { value: 'editor', label: 'Can edit' },
];
async function invite(next: { email: string; role: string }) {
  people.value.push(await api.invite(next));
}
</scr` + `ipt>

<template>
  <BissSharePanel
    :entries="people"
    :roles="roles"
    link="https://example.org/p/42"
    @invite="invite"
  />
</template>`;
const svelteSource = `<script lang="ts">
  import { BissSharePanel } from 'biss-ui/svelte';
  import 'biss-ui/styles.css';

  let people = $state([
    { id: 'ada', name: 'Ada Lovelace', role: 'editor' },
  ]);
  const roles = [
    { value: 'viewer', label: 'Can view' },
    { value: 'editor', label: 'Can edit' },
  ];
  async function invite(next: { email: string; role: string }) {
    people.push(await api.invite(next));
  }
</scr` + `ipt>

<BissSharePanel
  entries={people}
  {roles}
  link="https://example.org/p/42"
  oninvite={invite}
/>`;
const vueTokens = highlight(vueSource, 'ts');
const svelteTokens = highlight(svelteSource, 'ts');
const shareRoles = [
  { value: 'viewer', label: 'Can view' },
  { value: 'editor', label: 'Can edit' },
];
const shareEntries = ref<BissAccessEntry[]>([
  { id: 'ada', name: 'Ada Lovelace', email: 'ada@example.org', role: 'editor' },
  { id: 'grace', name: 'Grace Hopper', email: 'grace@example.org', role: 'viewer', editable: true },
]);
function invite(e: { email: string; role: string }) {
  const name = e.email.split('@')[0] ?? e.email;
  shareEntries.value = [
    ...shareEntries.value,
    { id: e.email, name: name.charAt(0).toUpperCase() + name.slice(1), email: e.email, role: e.role, editable: true },
  ];
}
function changeRole(e: { id: string; role: string }) {
  shareEntries.value = shareEntries.value.map((p) => (p.id === e.id ? { ...p, role: e.role } : p));
}
function removePerson(id: string) {
  shareEntries.value = shareEntries.value.filter((p) => p.id !== id);
}
const mapping = [
  { topic: 'Props', vue: ':entries="people"', svelte: 'entries={people}' },
  { topic: 'Events', vue: '@invite="invite"', svelte: 'oninvite={invite}' },
  { topic: 'Two-way values', vue: 'v-model="name"', svelte: 'bind:value={name}' },
  { topic: 'Composition', vue: '<template #actions>', svelte: '{#snippet actions()}' },
];

/* ---------- Principles ---------- */
const principles = [
  {
    icon: 'eye',
    title: 'Accessible by default',
    body: 'Fields connect labels, hints and errors to their control. Menus, dialogs and pickers manage focus and close on Escape.',
    detail: 'aria-describedby · role="menu"',
  },
  {
    icon: 'plug',
    title: 'Your app owns the data',
    body: 'Components render what you pass and emit intent, like invite, move or sort. Persistence, permissions and translations stay with you.',
    detail: '@move → your API',
  },
  {
    icon: 'palette',
    title: 'Layers and tokens',
    body: 'Library styles sit in cascade layers, so your CSS wins without !important. Every color, radius and size is a custom property.',
    detail: '@layer biss.tokens, biss.components',
  },
  {
    icon: 'code',
    title: 'Typed in both frameworks',
    body: 'Props, events, slots and snippets are typed. The API tables in these docs are generated from the shipped source.',
    detail: 'BissSharePanelProps',
  },
  {
    icon: 'globe',
    title: 'Renders on the server',
    body: 'The package test renders every Vue and Svelte component on the server before a release. No router, store or Nuxt globals.',
    detail: 'renderToString · Svelte SSR',
  },
  {
    icon: 'sliders',
    title: 'Three densities',
    body: 'Compact, standard and comfortable spacing from one attribute. Controls, rows and cells follow the same rhythm.',
    detail: 'data-biss-density="compact"',
  },
];
</script>

<template>
  <div class="lp">
    <main id="main-content" tabindex="-1" class="lp-main">
      <!-- Hero -->
      <section class="lp-hero" aria-labelledby="lp-hero-title">
        <div class="lp-wrap lp-hero-grid">
          <div class="lp-hero-copy">
            <a class="lp-pill lp-rise" href="#/getting-started" style="--d: 0ms">
              <span class="lp-pill-tag">Prerelease</span>
              <span>{{ VERSION }} is ready for review</span>
              <BissIcon name="chev" />
            </a>
            <h1 id="lp-hero-title" class="lp-rise" style="--d: 60ms">
              Components for quiet, <span>legible tools.</span>
            </h1>
            <p class="lp-lead lp-rise" style="--d: 120ms">
              {{ total }} Vue and Svelte components in Bizzy’s design language. The everyday
              controls, plus the larger pieces research and admin apps need: data grids, filter
              builders, sharing, boards and calendars.
            </p>
          </div>
          <div class="lp-hero-side lp-rise" style="--d: 160ms">
            <div class="lp-actions">
              <a class="lp-btn lp-btn-primary" href="#/getting-started"
                >Get started <BissIcon name="chev"
              /></a>
              <a class="lp-btn lp-btn-quiet" href="#/components">Browse components</a>
            </div>
            <div class="lp-install">
              <code><span aria-hidden="true">$</span> {{ INSTALL }}</code>
              <button
                type="button"
                :aria-label="copiedKey === 'install' ? 'Copied' : 'Copy install command'"
                @click="copy(INSTALL, 'install')"
              >
                <BissIcon :name="copiedKey === 'install' ? 'check' : 'copy'" />
              </button>
            </div>
            <p class="lp-install-note">
              Planned command. The package is not on npm yet;
              <a href="#/getting-started">install from the repository</a> until the first preview.
            </p>
          </div>
        </div>
        <div class="lp-wrap lp-hero-meta lp-rise" style="--d: 180ms">
          <span class="lp-fw"><i class="lp-fw-vue" aria-hidden="true" />Vue 3.5</span>
          <span class="lp-fw"><i class="lp-fw-svelte" aria-hidden="true" />Svelte 5</span>
          <span>{{ bothFrameworks }} components in both</span>
          <span>TypeScript</span>
          <span>MIT licence</span>
        </div>

        <div class="lp-stage" aria-label="Live component examples" role="region">
          <div class="lp-wrap">
            <div class="lp-bento">
              <article class="lp-tile lp-tile-workspace lp-rise" style="--d: 220ms">
                <header class="lp-tile-bar">
                  <span class="lp-window-dots" aria-hidden="true"><i /><i /><i /></span>
                  <span class="lp-tile-title">Research workspace</span>
                  <BissPresenceStack :people="people" :limit="3" :size="22" label="People on this page" />
                </header>
                <div class="lp-workspace">
                  <BissPageBar heading="h2" title="Projects" description="Shared research across three teams.">
                    <template #actions>
                      <BissMenu
                        label="Actions"
                        :items="menuItems"
                        @pick="lastAction = $event.label"
                      /><BissButton><BissIcon name="plus" />New project</BissButton>
                    </template>
                    <template #tabs>
                      <BissViewTabs
                        v-model="view"
                        label="Project views"
                        :items="[
                          { key: 'all', label: 'All projects', count: projects.length },
                          {
                            key: 'review',
                            label: 'In review',
                            count: projects.filter((p) => p.status === 'In review').length,
                          },
                        ]"
                      />
                    </template>
                  </BissPageBar>
                  <div class="lp-filter">
                    <BissFilterBuilder
                      :fields="filterFields"
                      :rules="rules"
                      :match="match"
                      label="Filter projects"
                      @change="rules = $event"
                      @match="match = $event"
                    />
                  </div>
                  <BissDataGrid
                    :rows="visibleProjects"
                    :columns="columns"
                    :selected="selected"
                    :sort-key="sort.key"
                    :sort-direction="sort.direction"
                    label="Projects"
                    empty-label="No projects match these filters."
                    @columns="columns = $event"
                    @select="selected = $event"
                    @sort="sort = $event"
                  >
                    <template #cell="{ column, value }">
                      <BissBadge
                        v-if="column.key === 'status'"
                        dot
                        :tone="value === 'In review' ? 'warning' : value === 'On track' ? 'success' : 'neutral'"
                        >{{ value }}</BissBadge
                      ><strong v-else-if="column.key === 'name'" class="lp-cell-strong">{{ value }}</strong
                      ><span v-else>{{ value }}</span>
                    </template>
                  </BissDataGrid>
                  <p class="lp-status" role="status">
                    <template v-if="lastAction">Menu: “{{ lastAction }}” picked.</template>
                    <template v-else
                      >{{ visibleProjects.length }} of {{ projects.length }} projects ·
                      {{ selected.length }} selected</template
                    >
                  </p>
                </div>
                <a class="lp-tag" :href="docHref('DataGrid')">DataGrid · FilterBuilder · Menu</a>
              </article>

              <article class="lp-tile lp-tile-date lp-rise" style="--d: 280ms">
                <BissDatePicker
                  :value="day"
                  today="2026-11-14"
                  label="Review date"
                  @change="day = $event"
                />
                <a class="lp-tag" :href="docHref('DatePicker')">DatePicker</a>
              </article>

              <article class="lp-tile lp-tile-kpi lp-rise" style="--d: 320ms">
                <div class="lp-kpi-row">
                  <BissKpiCard label="Publications" value="128" note="+14 this quarter" />
                  <BissBadge tone="success">On track</BissBadge>
                </div>
                <BissLineChart :values="[12, 18, 14, 25, 22, 32, 29, 38]" label="Publications per month" />
                <div class="lp-goal">
                  <div class="lp-goal-text"><span>Funding</span><span>62% of €240k</span></div>
                  <BissGoalBar :value="0.62" :expected="0.75" label="Funding: 62 percent of target" />
                </div>
                <a class="lp-tag" :href="docHref('KpiCard')">KpiCard · LineChart · GoalBar</a>
              </article>

              <article class="lp-tile lp-tile-board lp-rise" style="--d: 360ms">
                <div class="lp-scroll-x">
                  <BissKanban :lanes="lanes" :cards="cards" label="Project board" @move="moveCard" />
                </div>
                <a class="lp-tag" :href="docHref('Kanban')">Kanban</a>
              </article>

              <article class="lp-tile lp-tile-tasks lp-rise" style="--d: 400ms">
                <h3 class="lp-tile-heading">This week</h3>
                <BissTaskList :items="tasks" label="Tasks this week" @complete="completeTask" />
                <a class="lp-tag" :href="docHref('TaskList')">TaskList</a>
              </article>
            </div>
            <p class="lp-stage-note">
              Every panel above is a live Vue component from the library. Sort, filter, drag and
              pick a date.
            </p>
          </div>
        </div>
      </section>

      <!-- Theming -->
      <section class="lp-section lp-theming" aria-labelledby="lp-theme-title">
        <div class="lp-wrap">
          <header class="lp-section-head">
            <p class="lp-kicker">Theming</p>
            <h2 id="lp-theme-title">Make it yours</h2>
            <p>
              Colors, corners and spacing are CSS custom properties. Set them on any wrapper to
              theme a single panel or the whole application. Nothing to rebuild.
            </p>
          </header>

          <div class="lp-theme-grid">
            <div class="lp-controls" role="group" aria-label="Theme settings">
              <fieldset class="lp-control">
                <legend>Accent</legend>
                <div class="lp-swatches">
                  <label v-for="a in accents" :key="a.value" class="lp-swatch" :title="a.name">
                    <input v-model="accent" type="radio" name="lp-accent" :value="a.value" />
                    <span :style="{ background: a.value }" aria-hidden="true" />
                    <span class="lp-sr">{{ a.name }}</span>
                  </label>
                </div>
              </fieldset>
              <div class="lp-control">
                <span class="lp-control-label" id="lp-radius-label">Corners</span>
                <BissSegmentedControl
                  label="Corner radius"
                  :value="radius"
                  :options="[
                    { value: 'sharp', label: 'Sharp' },
                    { value: 'subtle', label: 'Subtle' },
                    { value: 'default', label: 'Default' },
                    { value: 'round', label: 'Round' },
                  ]"
                  @change="radius = $event"
                />
              </div>
              <div class="lp-control">
                <span class="lp-control-label">Density</span>
                <BissSegmentedControl
                  label="Density"
                  :value="density"
                  :options="[
                    { value: 'compact', label: 'Compact' },
                    { value: 'standard', label: 'Standard' },
                    { value: 'comfortable', label: 'Comfortable' },
                  ]"
                  @change="density = $event"
                />
              </div>
              <div class="lp-control">
                <span class="lp-control-label">Appearance</span>
                <BissSegmentedControl
                  label="Appearance"
                  :value="mode"
                  :options="[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                  ]"
                  @change="mode = $event"
                />
              </div>
            </div>
            <div class="lp-code lp-code-css">
                <div class="lp-code-bar">
                  <span>theme.css</span>
                  <button type="button" @click="copy(themeCss, 'css')">
                    <BissIcon :name="copiedKey === 'css' ? 'check' : 'copy'" />{{
                      copiedKey === 'css' ? 'Copied' : 'Copy'
                    }}
                  </button>
                </div>
                <pre
                  tabindex="0"
                  aria-label="Generated theme CSS"
                ><code><span v-for="(t, i) in cssTokens" :key="i" :class="'biss-tok-' + t.kind">{{ t.text }}</span></code></pre>
            </div>

            <div
              class="lp-tp"
              :data-biss-density="density"
              :data-biss-theme="mode === 'dark' ? 'dark' : undefined"
              :style="themeStyle"
              aria-label="Theme preview"
              role="region"
            >
              <div class="lp-tp-card lp-tp-form">
                <div class="lp-tp-head">
                  <h3>Notifications</h3>
                  <BissBadge tone="info">Team plan</BissBadge>
                </div>
                <BissField label="Email address" hint="Updates go to this address.">
                  <BissInput v-model="themeEmail" type="email" placeholder="ada@example.org" />
                </BissField>
                <div class="lp-tp-field">
                  <span class="lp-tp-label">Visible to</span>
                  <BissSegmentedControl
                    label="Visible to"
                    :value="themeScope"
                    :options="[
                      { value: 'me', label: 'Only me' },
                      { value: 'team', label: 'Team' },
                      { value: 'all', label: 'Everyone' },
                    ]"
                    @change="themeScope = $event"
                  />
                </div>
                <BissSwitch v-model="themeNotify" label="Email notifications" hint="When someone mentions you." />
                <BissCheckbox
                  :checked="themeWeekly"
                  label="Weekly summary"
                  description="A digest every Monday morning."
                  @change="themeWeekly = $event"
                />
                <div class="lp-tp-actions">
                  <BissButton variant="secondary">Cancel</BissButton><BissButton>Save changes</BissButton>
                </div>
              </div>
              <div class="lp-tp-card lp-tp-table">
                <div class="lp-tp-head">
                  <h3>Projects</h3>
                  <BissButton variant="ghost" size="sm"><BissIcon name="filter" />Filter</BissButton>
                </div>
                <BissDataGrid
                  :rows="themeRows"
                  :columns="themeColumns"
                  :selected="themeSelected"
                  label="Themed projects"
                  @columns="themeColumns = $event"
                  @select="themeSelected = $event"
                >
                  <template #cell="{ column, value }">
                    <BissBadge
                      v-if="column.key === 'status'"
                      :tone="value === 'In review' ? 'warning' : value === 'On track' ? 'success' : 'neutral'"
                      >{{ value }}</BissBadge
                    ><span v-else>{{ value }}</span>
                  </template>
                </BissDataGrid>
                <div class="lp-tp-goal">
                  <div class="lp-goal-text"><span>Budget used</span><span>68% · ahead of plan</span></div>
                  <BissGoalBar :value="0.68" :expected="0.6" label="Budget used: 68 percent" />
                </div>
              </div>
              <div class="lp-tp-card lp-tp-wide">
                <div class="lp-tp-row">
                  <BissButton>Publish</BissButton>
                  <BissButton variant="secondary">Preview</BissButton>
                  <BissButton variant="ghost"><BissIcon name="link" />Copy link</BissButton>
                  <BissButton variant="danger">Delete</BissButton>
                  <BissMenu label="More actions" :items="menuItems" />
                </div>
                <div class="lp-tp-row">
                  <BissBadge tone="info" dot>Draft</BissBadge>
                  <BissBadge tone="success" dot>Published</BissBadge>
                  <BissBadge tone="warning" dot>Needs review</BissBadge>
                  <BissBadge tone="danger" dot>Blocked</BissBadge>
                  <BissBadge>Archived</BissBadge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Library overview -->
      <section class="lp-section lp-library" aria-labelledby="lp-library-title">
        <div class="lp-wrap">
          <header class="lp-section-head">
            <p class="lp-kicker">The library</p>
            <h2 id="lp-library-title">Components, and the blocks they make</h2>
            <p>
              {{ total }} components grouped by task, and application patterns that combine them
              into the screens research and administration tools are made of.
            </p>
          </header>

          <div class="lp-split-head">
            <h3>Components</h3>
            <span>{{ groups.length }} groups · {{ total }} components</span>
          </div>
          <ul class="lp-groups">
            <li v-for="g in groups" :key="g.group">
              <a class="lp-group" :href="'#/components?section=' + anchor(g.group)">
                <span class="lp-group-icon"><BissIcon :name="g.icon" /></span>
                <span class="lp-group-name">{{ g.group }}</span>
                <span class="lp-group-count">{{ g.count }}</span>
                <span class="lp-group-list">{{ g.examples.join(', ') }}<template v-if="g.count > 4">, …</template></span>
              </a>
            </li>
          </ul>

          <div class="lp-split-head">
            <h3>Blocks</h3>
            <span>Application patterns</span>
          </div>
          <ul class="lp-blocks">
            <li v-for="b in blocks" :key="b.title" class="lp-block">
              <h4>{{ b.title }}</h4>
              <p>{{ b.body }}</p>
              <div class="lp-chips">
                <a v-for="p in b.parts" :key="p" :href="docHref(p)">{{ label(p) }}</a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Framework parity -->
      <section class="lp-section lp-parity" aria-labelledby="lp-parity-title">
        <div class="lp-wrap">
          <header class="lp-section-head">
            <p class="lp-kicker">Vue and Svelte</p>
            <h2 id="lp-parity-title">One component, written the way each framework expects</h2>
            <p>
              The same props, labels and styles in both. Vue gets emits, slots and
              <code>v-model</code>; Svelte 5 gets callback props, snippets and runes.
            </p>
          </header>

          <div class="lp-parity-tabs" role="tablist" aria-label="Framework">
            <button
              id="lp-tab-vue"
              type="button"
              role="tab"
              :aria-selected="parityTab === 'vue'"
              aria-controls="lp-pane-vue"
              @click="parityTab = 'vue'"
            >
              <i class="lp-fw-vue" aria-hidden="true" />Vue</button
            ><button
              id="lp-tab-svelte"
              type="button"
              role="tab"
              :aria-selected="parityTab === 'svelte'"
              aria-controls="lp-pane-svelte"
              @click="parityTab = 'svelte'"
            >
              <i class="lp-fw-svelte" aria-hidden="true" />Svelte
            </button>
          </div>
          <div class="lp-parity-code">
            <div
              id="lp-pane-vue"
              class="lp-code"
              :class="{ 'is-hidden-narrow': parityTab !== 'vue' }"
              role="tabpanel"
              aria-labelledby="lp-tab-vue"
            >
              <div class="lp-code-bar">
                <span><i class="lp-fw-vue" aria-hidden="true" />Vue 3.5 · Share.vue</span>
                <button type="button" @click="copy(vueSource, 'vue')">
                  <BissIcon :name="copiedKey === 'vue' ? 'check' : 'copy'" />{{
                    copiedKey === 'vue' ? 'Copied' : 'Copy'
                  }}
                </button>
              </div>
              <pre
                tabindex="0"
                aria-label="Vue example"
              ><code><span v-for="(t, i) in vueTokens" :key="i" :class="'biss-tok-' + t.kind">{{ t.text }}</span></code></pre>
            </div>
            <div
              id="lp-pane-svelte"
              class="lp-code"
              :class="{ 'is-hidden-narrow': parityTab !== 'svelte' }"
              role="tabpanel"
              aria-labelledby="lp-tab-svelte"
            >
              <div class="lp-code-bar">
                <span><i class="lp-fw-svelte" aria-hidden="true" />Svelte 5 · Share.svelte</span>
                <button type="button" @click="copy(svelteSource, 'svelte')">
                  <BissIcon :name="copiedKey === 'svelte' ? 'check' : 'copy'" />{{
                    copiedKey === 'svelte' ? 'Copied' : 'Copy'
                  }}
                </button>
              </div>
              <pre
                tabindex="0"
                aria-label="Svelte example"
              ><code><span v-for="(t, i) in svelteTokens" :key="i" :class="'biss-tok-' + t.kind">{{ t.text }}</span></code></pre>
            </div>
          </div>

          <div class="lp-parity-result">
            <div class="lp-parity-live">
              <p class="lp-live-label"><i aria-hidden="true" />Both render this</p>
              <BissSharePanel
                :entries="shareEntries"
                :roles="shareRoles"
                link="https://example.org/p/42"
                label="Share Open justice"
                @invite="invite"
                @role="changeRole"
                @remove="removePerson"
              />
            </div>
            <div class="lp-mapping">
              <h3>What changes between frameworks</h3>
              <table>
                <thead>
                  <tr>
                    <th scope="col"><span class="lp-sr">Concept</span></th>
                    <th scope="col">Vue</th>
                    <th scope="col">Svelte</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="m in mapping" :key="m.topic">
                    <th scope="row">{{ m.topic }}</th>
                    <td data-label="Vue"><code>{{ m.vue }}</code></td>
                    <td data-label="Svelte"><code>{{ m.svelte }}</code></td>
                  </tr>
                </tbody>
              </table>
              <p>
                Everything else stays the same: prop names, labels, CSS classes and tokens. Moving
                a screen from one framework to the other is a syntax change.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Principles -->
      <section class="lp-section lp-principles" aria-labelledby="lp-principles-title">
        <div class="lp-wrap">
          <header class="lp-section-head">
            <p class="lp-kicker">How it is built</p>
            <h2 id="lp-principles-title">Made for applications that last</h2>
          </header>
          <ul class="lp-principle-grid">
            <li v-for="p in principles" :key="p.title" class="lp-principle">
              <span class="lp-principle-icon"><BissIcon :name="p.icon as never" /></span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.body }}</p>
              <code>{{ p.detail }}</code>
            </li>
          </ul>
        </div>
      </section>

      <!-- Closing CTA -->
      <section class="lp-cta" aria-labelledby="lp-cta-title">
        <div class="lp-wrap lp-cta-inner">
          <div>
            <h2 id="lp-cta-title">Start with one screen</h2>
            <p>
              Add the stylesheet, import a component and replace one view. The rest of your app
              does not have to change.
            </p>
          </div>
          <div class="lp-cta-actions">
            <div class="lp-install lp-install-dark">
              <code><span aria-hidden="true">$</span> {{ INSTALL }}</code>
              <button
                type="button"
                :aria-label="copiedKey === 'install2' ? 'Copied' : 'Copy install command'"
                @click="copy(INSTALL, 'install2')"
              >
                <BissIcon :name="copiedKey === 'install2' ? 'check' : 'copy'" />
              </button>
            </div>
            <div class="lp-actions">
              <a class="lp-btn lp-btn-light" href="#/getting-started">Read the guide <BissIcon name="chev" /></a>
              <a class="lp-btn lp-btn-outline" href="#/playground">Open the playground</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="lp-footer">
      <div class="lp-wrap lp-footer-grid">
        <div class="lp-footer-brand">
          <a class="docs-brand" href="#/"><span class="brand-mark"><BissIcon name="grid" /></span>BISS UI</a>
          <p>Vue and Svelte components from Bizzy’s design system, maintained by BISS at Maastricht University.</p>
        </div>
        <nav aria-label="Documentation links">
          <h2>Documentation</h2>
          <a href="#/getting-started">Getting started</a>
          <a href="#/theming">Theming</a>
          <a href="#/accessibility">Accessibility</a>
          <a href="#/migration">Migration</a>
        </nav>
        <nav aria-label="Library links">
          <h2>Library</h2>
          <a href="#/components">All components</a>
          <a href="#/playground">Playground</a>
          <a href="https://github.com/MaastrichtU-BISS/caselaw-ui/tree/feature/biss-ui">GitHub</a>
        </nav>
      </div>
      <div class="lp-wrap lp-footer-base">
        <span>{{ VERSION }} · MIT licence</span>
        <span>{{ total }} components · Vue 3.5 · Svelte 5</span>
      </div>
    </footer>
  </div>
</template>
