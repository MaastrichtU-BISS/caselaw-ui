<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { BissIcon } from '../src/vue';
import { highlight } from '../src/core/highlight';
import catalog from './generated/components.json';

import { guides } from './content';
import { example } from './examples';
import Workbench from './Workbench.vue';
import DialogDocumentation from './DialogDocumentation.vue';
import ExampleCard from './ExampleCard.vue';
import { examplesBySlug } from './examples/registry';
import { fixtures } from './fixtures';
const route = ref(location.hash.slice(1).split('?')[0] || '/getting-started'),
  query = ref(''),
  navOpen = ref(false),
  framework = ref<'vue' | 'svelte'>('vue'),
  viewport = ref<'desktop' | 'phone'>('desktop'),
  density = ref('standard'),
  state = ref('default'),
  previewHeight = ref(360),
  previewKey = ref(0),
  copied = ref(false);
const searchInput = ref<HTMLInputElement>();
type ThemeChoice = 'light' | 'dark' | 'system';
const themeChoice = ref<ThemeChoice>(
  (document.documentElement.dataset.bissTheme as ThemeChoice | undefined) ?? 'system',
);
const systemDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
const resolvedTheme = computed(() =>
  themeChoice.value === 'system' ? (systemDark.value ? 'dark' : 'light') : themeChoice.value,
);
function toggleTheme() {
  themeChoice.value = resolvedTheme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.bissTheme = themeChoice.value;
  try {
    localStorage.setItem('biss-docs-theme', themeChoice.value);
  } catch {
    /* Storage can be unavailable; the choice still applies to this visit. */
  }
}
const tierIntro: Record<string, string> = {
  Components:
    'Controls and displays with no application state. Compose them freely; they render props and report changes.',
  Blocks:
    'Compositions for recurring application tasks such as sharing, filtering and dashboards. Your application supplies the data and handles each action.',
};
const tierGroups = (tier: string) => (catalog.tiers as Record<string, string[]>)[tier] ?? [];
const mobileNavButton = ref<HTMLButtonElement>();
const collapsedGroups = ref(new Set(catalog.groups.slice(1)));
const activeSection = ref('');
let scrollFrame: number | undefined;
function updateActiveSection() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('.docs-section[id]'));
  activeSection.value =
    [...nodes].reverse().find((node) => node.getBoundingClientRect().top <= 150)?.id ??
    nodes[0]?.id ??
    '';
}
function trackSection() {
  if (scrollFrame !== undefined) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = undefined;
    updateActiveSection();
  });
}
function groupExpanded(group: string) {
  return !!query.value || !collapsedGroups.value.has(group);
}
function toggleGroup(group: string) {
  const next = new Set(collapsedGroups.value);
  next.has(group) ? next.delete(group) : next.add(group);
  collapsedGroups.value = next;
}
function closeNavigation() {
  navOpen.value = false;
  mobileNavButton.value?.focus();
}
const sourceUrl = computed(() =>
  current.value
    ? `https://github.com/MaastrichtU-BISS/caselaw-ui/blob/feature/biss-ui/src/${framework.value}/${current.value.name}.${framework.value === 'vue' ? 'vue' : 'svelte'}`
    : 'https://github.com/MaastrichtU-BISS/caselaw-ui/tree/feature/biss-ui',
);

const current = computed(() =>
  catalog.components.find((c) => route.value === '/components/' + c.slug),
);
const guide = computed(() => guides.find((g) => route.value === '/' + g.slug));
const matches = computed(() =>
  catalog.components.filter((c) =>
    (c.name + ' ' + c.description + ' ' + c.category)
      .toLowerCase()
      .includes(query.value.toLowerCase()),
  ),
);
const catalogueQuery = ref('');
const catalogueMatches = computed(() =>
  catalog.components.filter((c) =>
    (c.name + ' ' + c.description + ' ' + c.category)
      .toLowerCase()
      .includes(catalogueQuery.value.toLowerCase()),
  ),
);
const api = computed(() => current.value?.[framework.value]);
const visibleProps = computed(
  () =>
    api.value?.props.filter(
      (p) => !['children', 'actions', 'footer'].includes(p.name) && !p.name.startsWith('on'),
    ) ?? [],
);
const callbacks = computed(() =>
  framework.value === 'svelte' && current.value?.modern
    ? (api.value?.props.filter((p) => p.name.startsWith('on')) ?? [])
    : (api.value?.events ?? []),
);
const states = computed(() => {
  if (!current.value) return ['default'];
  const f = fixtures[current.value.short];
  return f?.states ?? [f?.state ?? 'default'];
});
const previewUrl = computed(
  () =>
    `./preview.html?component=${encodeURIComponent(current.value?.name ?? 'BissButton')}&state=${encodeURIComponent(state.value)}&framework=${framework.value}&density=${density.value}&theme=${resolvedTheme.value}`,
);
let previewObserver: ResizeObserver | undefined;
onBeforeUnmount(() => previewObserver?.disconnect());
function resizePreview(event: Event) {
  previewObserver?.disconnect();
  const frame = event.target as HTMLIFrameElement;
  const doc = frame.contentDocument;
  if (!doc) return;
  const update = () => {
    previewHeight.value = Math.max(
      /Dialog|Modal|SidePanel|SearchPalette/.test(current.value?.name ?? '') ? 640 : 260,
      Math.min(1100, doc.querySelector('.preview-frame')?.scrollHeight ?? 360),
    );
  };
  update();
  const observer = new ResizeObserver(update);
  previewObserver = observer;
  observer.observe(doc.body);
  frame.addEventListener('load', () => observer.disconnect(), { once: true });
}
const authored = computed(() => (current.value ? (examplesBySlug[current.value.slug] ?? []) : []));
const sections = computed(() =>
  current.value
    ? current.value.name === 'BissDialog'
      ? ['Preview', 'Installation', 'Anatomy', 'State', 'Customization', 'API', 'Accessibility']
      : authored.value.length
        ? ['Examples', 'Import', 'Props', 'Events and composition', 'Guidance']
        : ['Preview', 'Usage', 'Props', 'Events and composition', 'Guidance']
    : (guide.value?.sections.map((s) => s.title) ?? []),
);
const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const label = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
function skipToContent() {
  const main = document.getElementById('main-content');
  main?.focus({ preventScroll: true });
  main?.scrollIntoView({ block: 'start' });
}
function scrollToSection(section: string) {
  document.getElementById(anchor(section))?.scrollIntoView({ behavior: 'instant' });
}
const snippet = computed(() => {
  const c = current.value;
  if (!c) return '';
  const authored = example(c.name, framework.value);
  if (authored) return authored;
  const f = fixtures[c.short],
    props = f?.props ?? {};
  const names = new Set(c[framework.value]?.props.map((p) => p.name));
  const attrs = Object.entries(props)
    .filter(([key]) => names.has(key) && !key.startsWith('aria-'))
    .map(([key, value]) => {
      if (framework.value === 'vue')
        return typeof value === 'string'
          ? `${key}=${JSON.stringify(value)}`
          : `:${key}='${JSON.stringify(value)}'`;
      return typeof value === 'string'
        ? `${key}=${JSON.stringify(value)}`
        : `${key}={${JSON.stringify(value)}}`;
    });
  const tag = `<${c.name}${attrs.length ? '\n  ' + attrs.join('\n  ') : ''}${f?.text ? `\n>${f.text}</${c.name}>` : '\n/>'}`;
  return framework.value === 'vue'
    ? `<script setup lang="ts">\nimport { ${c.name} } from 'biss-ui/vue';\nimport 'biss-ui/styles.css';\n</scr` +
        `ipt>\n\n${tag}`
    : `<script lang="ts">\nimport { ${c.name} } from 'biss-ui/svelte';\nimport 'biss-ui/styles.css';\n</scr` +
        `ipt>\n\n${tag}`;
});
const codeTokens = computed(() => highlight(snippet.value, 'ts'));

const related = computed(() =>
  catalog.components
    .filter((c) => c.category === current.value?.category && c.name !== current.value?.name)
    .slice(0, 5),
);
function onHash() {
  const [path, queryString] = location.hash.slice(1).split('?');
  route.value = path || '/getting-started';
  navOpen.value = false;
  const section = new URLSearchParams(queryString).get('section');
  if (section) nextTick(() => scrollToSection(section));
}
function key(e: KeyboardEvent) {
  if (e.key === '/' && !(e.target as HTMLElement).closest('input,textarea,[contenteditable]')) {
    e.preventDefault();
    navOpen.value = true;
    nextTick(() => searchInput.value?.focus());
  }
  if (e.key === 'Tab' && navOpen.value && window.matchMedia('(max-width: 760px)').matches) {
    const controls = Array.from(
      document.querySelectorAll<HTMLElement>(
        '#docs-navigation a, #docs-navigation button, #docs-navigation input',
      ),
    ).filter((node) => node.getClientRects().length);
    const first = controls[0],
      last = controls.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }
  if (e.key === 'Escape') {
    if (navOpen.value) closeNavigation();
    navOpen.value = false;
    query.value = '';
  }
}
watch(
  current,
  (c) => {
    state.value = c
      ? (fixtures[c.short]?.state ?? fixtures[c.short]?.states?.[0] ?? 'default')
      : 'default';
    framework.value = c?.vue ? 'vue' : 'svelte';
    if (c) {
      const next = new Set(collapsedGroups.value);
      next.delete(c.category);
      collapsedGroups.value = next;
    }

    previewHeight.value = 360;
    previewKey.value++;
    document.title = c ? `${c.short} · BISS UI` : 'BISS UI · Documentation';
    window.scrollTo(0, 0);
  },
  { immediate: true },
);
watch(navOpen, async (open) => {
  if (!window.matchMedia('(max-width: 760px)').matches) return;
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    await nextTick();
    searchInput.value?.focus();
  }
});
watch(
  [route, sections],
  async () => {
    await nextTick();
    updateActiveSection();
  },
  { immediate: true },
);
async function copy() {
  try {
    await navigator.clipboard.writeText(snippet.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1600);
  } catch {
    copied.value = false;
  }
}
const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
const onScheme = (event: MediaQueryListEvent) => (systemDark.value = event.matches);
onMounted(() => {
  colorScheme.addEventListener('change', onScheme);
  onHash();
  window.addEventListener('hashchange', onHash);
  window.addEventListener('keydown', key);
  window.addEventListener('scroll', trackSection, { passive: true });
});
onBeforeUnmount(() => {
  colorScheme.removeEventListener('change', onScheme);
  window.removeEventListener('hashchange', onHash);
  window.removeEventListener('keydown', key);
  window.removeEventListener('scroll', trackSection);
  if (scrollFrame !== undefined) cancelAnimationFrame(scrollFrame);
  document.body.style.overflow = '';
});
</script>
<template>
  <a class="skip-link" href="#main-content" @click.prevent="skipToContent">Skip to content</a>
  <header class="docs-topbar">
    <a class="docs-brand" href="#/getting-started"
      ><span class="brand-mark"><BissIcon name="grid" /></span>BISS UI</a
    >
    <nav class="docs-primary-nav" aria-label="Primary">
      <a href="#/getting-started" :aria-current="guide ? 'page' : undefined">Documentation</a
      ><a
        href="#/components"
        :aria-current="current || route === '/components' ? 'page' : undefined"
        >Components</a
      ><a href="#/playground" :aria-current="route === '/playground' ? 'page' : undefined"
        >Playground</a
      >
    </nav>
    <div class="topbar-end">
      <a
        class="header-repository"
        href="https://github.com/MaastrichtU-BISS/caselaw-ui/tree/feature/biss-ui"
        aria-label="BISS UI on GitHub"
        ><BissIcon name="code" /><span>GitHub</span></a
      ><button
        type="button"
        class="theme-toggle"
        :aria-label="resolvedTheme === 'dark' ? 'Use light theme' : 'Use dark theme'"
        :title="resolvedTheme === 'dark' ? 'Use light theme' : 'Use dark theme'"
        @click="toggleTheme"
      >
        <svg v-if="resolvedTheme === 'dark'" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" /></svg></button
      ><span class="version">v0.1.0-next.0</span
      ><button
        type="button"
        class="mobile-nav"
        ref="mobileNavButton"
        :aria-expanded="navOpen"
        aria-controls="docs-navigation"
        @click="navOpen = !navOpen"
      >
        <BissIcon name="menu" /><span>Browse docs</span>
      </button>
    </div>
  </header>
  <aside id="docs-navigation" class="docs-sidebar" :class="{ 'is-open': navOpen }">
    <label class="docs-search"
      ><BissIcon name="search" /><input
        ref="searchInput"
        v-model="query"
        type="search"
        placeholder="Find a component…"
        aria-label="Find a component"
      /><kbd>/</kbd></label
    >
    <nav aria-label="Documentation">
      <div v-if="!query" class="nav-group nav-guides">
        <p>Start here</p>
        <a href="#/playground" :aria-current="route === '/playground' ? 'page' : undefined"
          >Library playground</a
        >
        <a
          v-for="g in guides"
          :key="g.slug"
          :href="`#/${g.slug}`"
          :aria-current="route === '/' + g.slug ? 'page' : undefined"
          >{{ g.title }}</a><a
          href="#/components"
          :aria-current="route === '/components' ? 'page' : undefined"
          >All components <small>{{ catalog.components.length }}</small></a
        >
      </div>
      <template v-for="tier in Object.keys(catalog.tiers)" :key="tier"
        ><p
          v-if="matches.some((c) => c.tier === tier)"
          class="nav-tier"
        >
          {{ tier }}
        </p>
        <template v-for="group in tierGroups(tier)" :key="group"
          ><div v-if="matches.some((c) => c.category === group)" class="nav-group">
            <button
              type="button"
              class="nav-group-toggle"
              :aria-expanded="groupExpanded(group)"
              :aria-controls="'group-' + anchor(group)"
              @click="toggleGroup(group)"
            >
              <span>{{ group }}</span><small>{{
                catalog.components.filter((c) => c.category === group).length
              }}</small
              ><BissIcon name="chev" />
            </button>
            <div v-show="groupExpanded(group)" :id="'group-' + anchor(group)" class="nav-group-links">
              <a
                v-for="c in matches.filter((c) => c.category === group)"
                :key="c.name"
                :href="`#/components/${c.slug}`"
                :aria-current="current?.name === c.name ? 'page' : undefined"
                >{{ label(c.short) }}<span v-if="!c.vue" class="framework-note">Svelte</span></a
              >
            </div>
          </div></template
        >
      </template>
      <p v-if="!matches.length" class="nav-empty">
        No matching components. Try “date”, “table” or “menu”.
      </p>
    </nav>
    <div class="sidebar-note">
      Built with BISS UI.<br /><a href="#/theming"
        >Make it yours <span aria-hidden="true">↗</span></a
      >
    </div>
  </aside>
  <div v-if="navOpen" class="nav-scrim" @click="closeNavigation" aria-hidden="true" />
  <div class="docs-layout" :class="{ 'without-toc': !sections.length }">
    <main id="main-content" tabindex="-1">
      <template v-if="current">
        <div class="breadcrumbs">
          <a href="#/components">Components</a><BissIcon name="chev" /><span>{{
            current.category
          }}</span>
        </div>
        <header class="component-heading">
          <div class="page-heading">
            <h1>{{ label(current.short) }}</h1>
            <code>{{ current.name }}</code>
          </div>
          <p class="docs-lead">{{ current.description }}</p>
          <div class="page-resources">
            <a :href="sourceUrl"
              ><BissIcon name="code" />View source<span aria-hidden="true">↗</span></a
            ><a
              :href="'#' + route + '?section=' + (current.name === 'BissDialog' ? 'api' : 'props')"
              >API reference<BissIcon name="chev"
            /></a>
          </div>
        </header>
        <div class="framework-switch" role="group" aria-label="Code framework">
          <button
            type="button"
            :disabled="!current.vue"
            :aria-pressed="framework === 'vue'"
            @click="framework = 'vue'"
          >
            Vue <span v-if="!current.vue">unavailable</span></button
          ><button
            type="button"
            :disabled="!current.svelte"
            :aria-pressed="framework === 'svelte'"
            @click="framework = 'svelte'"
          >
            Svelte <span v-if="!current.svelte">unavailable</span></button
          ><span>{{
            current.vue && current.svelte
              ? 'Vue 3 · Svelte 5'
              : current.vue
                ? 'Vue only'
                : 'Svelte only'
          }}</span>
        </div>
        <DialogDocumentation v-if="current.name === 'BissDialog'" :framework="framework" />
        <template v-else>
          <template v-if="authored.length">
            <section id="examples" class="docs-section">
              <h2>Examples</h2>
              <div class="density-inline">
                <label class="state-control"
                  >Density
                  <select v-model="density" aria-label="Example density">
                    <option value="standard">Standard</option>
                    <option value="compact">Compact</option>
                    <option value="comfortable">Comfortable</option>
                  </select></label
                >
              </div>
              <div class="example-stack">
                <ExampleCard
                  v-for="(item, index) in authored"
                  :key="current.slug + item.id"
                  :slug="current.slug"
                  :example="item"
                  :framework="framework"
                  :density="density"
                  :theme="resolvedTheme"
                  :lead="index === 0"
                />
              </div>
            </section>
            <section id="import" class="docs-section">
              <h2>Import</h2>
              <pre
                class="guide-code"
                tabindex="0"
                aria-label="Import code"
              ><code>{{ framework === 'vue'
  ? `import { ${current.name} } from 'biss-ui/vue';\nimport 'biss-ui/styles.css';`
  : `import { ${current.name} } from 'biss-ui/svelte';\nimport 'biss-ui/styles.css';` }}</code></pre>
            </section>
          </template>
          <template v-else>
          <section id="preview" class="docs-section">
            <h2>Preview</h2>
            <div class="preview-toolbar">
              <span class="preview-live-label"><i aria-hidden="true" />Live preview</span
              ><label class="state-control"
                >Density
                <select v-model="density" aria-label="Preview density">
                  <option value="standard">Standard</option>
                  <option value="compact">Compact</option>
                  <option value="comfortable">Comfortable</option>
                </select></label
              >
              <button type="button" class="biss-button biss-button-secondary" @click="previewKey++">
                Reset example
              </button>
              <label class="state-control"
                >State
                <select v-model="state" aria-label="Component state">
                  <option v-for="s in states" :key="s" :value="s">{{ label(s) }}</option>
                </select></label
              >
              <div class="segmented" role="group" aria-label="Preview viewport">
                <button
                  type="button"
                  :aria-pressed="viewport === 'desktop'"
                  @click="viewport = 'desktop'"
                >
                  Desktop</button
                ><button
                  type="button"
                  :aria-pressed="viewport === 'phone'"
                  @click="viewport = 'phone'"
                >
                  Phone
                </button>
              </div>
            </div>
            <div class="live-example" :class="{ 'phone-preview': viewport === 'phone' }">
              <iframe
                :key="current.name + framework + density + state + previewKey"
                :src="previewUrl"
                :title="`${current.name} interactive example`"
                :style="{ height: previewHeight + 'px' }"
                @load="resizePreview"
              />
            </div>
            <p class="preview-description">
              Live {{ framework === 'vue' ? 'Vue' : 'Svelte' }} component with local example data.
            </p>
          </section>
          <section id="usage" class="docs-section">
            <h2>Usage</h2>
            <p>
              Import from <code>biss-ui/{{ framework }}</code
              >. This example shows the initial state; handle events in your application to persist
              changes.
            </p>
            <div class="sample-code">
              <div>
                <span>{{ framework === 'vue' ? 'Vue' : 'Svelte' }} · TypeScript</span
                ><button type="button" @click="copy">{{ copied ? 'Copied' : 'Copy code' }}</button>
              </div>
              <pre
                tabindex="0"
                aria-label="Usage code"
              ><code><span v-for="(token,i) in codeTokens" :key="i" :class="'biss-tok-'+token.kind">{{token.text}}</span></code></pre>
            </div>
            <p v-if="framework === 'svelte' && current.modern">
              This component uses Svelte 5 callback props and snippets. Pass callbacks such as
              <code>onchange</code> directly.
            </p>
            <p v-else-if="framework === 'svelte'">
              This component uses callback props. Use
              <code>onchange</code> where the component exposes a change event.
            </p>
          </section>
          </template>
          <section id="props" class="docs-section">
            <h2>Props</h2>
            <p>
              The table is generated from the shipped
              {{ framework === 'vue' ? 'Vue' : 'Svelte' }} component source. Required values have no
              default.
            </p>
            <div
              v-if="visibleProps.length"
              class="api-table-wrap"
              role="region"
              aria-label="Component props"
              tabindex="0"
            >
              <table class="api-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="prop in visibleProps" :key="prop.name">
                    <td>
                      <code>{{ prop.name }}</code><span
                        v-if="prop.required && !(prop as any).default"
                        class="required"
                        >Required</span
                      >
                      <p v-if="prop.description">{{ prop.description }}</p>
                    </td>
                    <td>
                      <code>{{ prop.type }}</code>
                    </td>
                    <td>
                      <code>{{ (prop as any).default ?? '—' }}</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-else class="quiet-note">
              This component composes its content through slots or snippets and has no configuration
              props.
            </p>
          </section>
          <section id="events-and-composition" class="docs-section">
            <h2>Events and composition</h2>
            <ul v-if="callbacks.length" class="contract-list">
              <li v-for="event in callbacks" :key="event.name">
                <code>{{ event.name }}</code><code>{{ event.type }}</code>
              </li>
            </ul>
            <p v-else>
              No custom events are declared in this framework’s prop contract. Standard element
              events follow the component’s native attribute forwarding.
            </p>
            <p v-if="api?.slots.length">
              Slots:
              <code v-for="slot in api.slots" :key="slot" class="slot-name">{{ slot }}</code>.
            </p>
            <p v-if="framework === 'svelte' && current.modern">
              Composition snippets appear in the typed Svelte props. <code>children</code> is the
              main content; named snippets provide actions or a footer where supported.
            </p>
            <p>
              Use <code>{{ current.name }}Props</code> from
              <code>biss-ui/{{ framework }}</code> when building a typed wrapper.
            </p>
          </section>
          <section id="guidance" class="docs-section">
            <h2>Guidance</h2>
            <p>{{ current.guidance }}</p>
            <p v-if="['Kanban', 'Calendar', 'Timeline'].includes(current.short)">
              The application owns writes and permissions. These views do not include Bizzy’s
              persistence, dependency scheduling or collaborative editing engine.
            </p>
            <p
              v-if="
                ['Menu', 'Popover', 'SelectPicker', 'SwatchPicker', 'DateField'].includes(
                  current.short,
                )
              "
            >
              Requires the native Popover API. Give the trigger a clear label and keep search,
              keyboard and disabled states intact when customizing.
            </p>
            <p v-if="['DatePicker', 'DateField'].includes(current.short)">
              Use ISO calendar days. Typed date parsing currently understands English and Dutch;
              provide localized display labels and a deterministic <code>today</code> value when
              rendering across time zones.
            </p>
            <p>
              Override semantic CSS tokens on the surrounding wrapper. Read
              <a href="#/theming">Theming</a> before changing colors or density, and
              <a href="#/accessibility">Accessibility</a> before replacing controls or labels.
            </p>
          </section>
          <nav class="related-components" aria-label="Related components">
            <h2>Related components</h2>
            <a v-for="c in related" :key="c.name" :href="`#/components/${c.slug}`"
              >{{ label(c.short) }}<BissIcon name="chev"
            /></a>
          </nav>
        </template>
      </template>
      <template v-else-if="route === '/playground'"
        ><div class="breadcrumbs">BISS UI in use</div>
        <h1>Library playground</h1>
        <p class="docs-lead">
          Search, sort and select records. Edit a project or create one to explore form validation
          and component composition.
        </p>
        <Workbench
      /></template>
      <template v-else-if="guide"
        ><div class="breadcrumbs">Documentation</div>
        <h1>{{ guide.title }}</h1>
        <p class="docs-lead">{{ guide.description }}</p>
        <section
          v-for="section in guide.sections"
          :id="anchor(section.title)"
          :key="section.title"
          class="docs-section"
        >
          <h2>{{ section.title }}</h2>
          <p>{{ section.body }}</p>
          <pre
            v-if="section.code"
            class="guide-code"
            tabindex="0"
            :aria-label="section.title + ' code'"
          ><code>{{section.code}}</code></pre>
        </section>
        <div class="guide-next">
          <a href="#/components"
            >Browse all {{ catalog.components.length }} components <BissIcon name="chev"
          /></a></div
      ></template>
      <template v-else-if="route === '/components'"
        ><div class="breadcrumbs">Component reference</div>
        <h1>All components</h1>
        <p class="docs-lead">
          {{ catalog.components.length }} components. Live examples in both frameworks and
          source-derived contracts.
        </p>
        <div class="catalogue-tools">
          <label class="catalogue-search"
            ><BissIcon name="search" /><input
              v-model="catalogueQuery"
              type="search"
              aria-label="Search component catalogue"
              placeholder="Search components…" /></label
          ><span>{{ catalogueMatches.length }} components</span>
        </div>
        <p v-if="!catalogueMatches.length" class="catalogue-empty" role="status">
          No components match “{{ catalogueQuery }}”. Try a name such as “button”, “date” or
          “dialog”.
        </p>
        <nav class="category-index" aria-label="Component categories">
          <template v-for="tier in Object.keys(catalog.tiers)" :key="tier"
            ><span>{{ tier }}</span
            ><a
              v-for="group in tierGroups(tier)"
              :key="group"
              :href="'#/components?section=' + anchor(group)"
              >{{ group }}</a
            ></template
          >
        </nav>
        <template v-for="tier in Object.keys(catalog.tiers)" :key="tier">
        <header
          v-if="catalogueMatches.some((c) => c.tier === tier)"
          :id="anchor(tier)"
          class="catalogue-tier"
        >
          <h2>{{ tier }}</h2>
          <p>{{ tierIntro[tier] }}</p>
        </header>
        <section
          v-for="group in tierGroups(tier).filter((group) =>
            catalogueMatches.some((c) => c.category === group),
          )"
          :id="anchor(group)"
          :key="group"
          class="docs-section catalogue-group"
        >
          <h2>{{ group }}</h2>
          <div class="component-grid">
            <a
              v-for="c in catalogueMatches.filter((c) => c.category === group)"
              :key="c.name"
              class="component-row"
              :href="`#/components/${c.slug}`"
              ><div>
                <strong>{{ label(c.short) }}</strong>
                <p>{{ c.description }}</p>
              </div>
              <small>{{
                c.vue && c.svelte ? 'Vue · Svelte' : c.vue ? 'Vue' : 'Svelte'
              }}</small><BissIcon name="chev"
            /></a>
          </div></section
        ></template
      ></template>
      <template v-else
        ><h1>Page not found</h1>
        <p>
          Choose a component from the sidebar or
          <a href="#/getting-started">start with the installation guide</a>.
        </p></template
      >
      <footer class="docs-footer">
        <span>BISS UI · From Bizzy’s design system</span><a href="#/migration">Migration guide</a>
      </footer>
    </main>
    <aside v-if="sections.length" class="page-toc" aria-label="On this page">
      <p>On this page</p>
      <a
        v-for="section in sections"
        :key="section"
        :href="'#' + route + '?section=' + anchor(section)"
        :aria-current="activeSection === anchor(section) ? 'location' : undefined"
        >{{ section }}</a
      >
      <div class="toc-resources">
        <p>Build with BISS UI</p>
        <a href="#/theming">Customize your theme <span aria-hidden="true">↗</span></a
        ><a :href="sourceUrl">Browse the source <span aria-hidden="true">↗</span></a>
      </div>
    </aside>
  </div>
</template>
