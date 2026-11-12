<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { BissIcon } from '../src/vue';
import { highlight } from '../src/core/highlight';
import catalog from './generated/components.json';

import { guides } from './content';
import { example } from './examples';
import { fixtures } from './fixtures';
const route = ref(location.hash.slice(1).split('?')[0] || '/getting-started'),
  query = ref(''),
  navOpen = ref(false),
  framework = ref<'vue' | 'svelte'>('vue'),
  viewport = ref<'desktop' | 'phone'>('desktop'),
  state = ref('default'),
  previewHeight = ref(360),
  previewKey = ref(0),
  copied = ref(false);
const searchInput = ref<HTMLInputElement>();
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
    `./preview.html?component=${encodeURIComponent(current.value?.name ?? 'BissButton')}&state=${encodeURIComponent(state.value)}`,
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
const sections = computed(() =>
  current.value
    ? ['Preview', 'Usage', 'Props', 'Events and composition', 'Guidance']
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

const related = computed(() => catalog.components.filter(c=>c.category===current.value?.category&&c.name!==current.value?.name).slice(0,5));
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
  if (e.key === 'Escape') {
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
    previewHeight.value = 360;
    previewKey.value++;
    document.title = c ? `${c.short} · BISS UI` : 'BISS UI · Documentation';
    window.scrollTo(0, 0);
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
onMounted(() => {
  onHash();
  window.addEventListener('hashchange', onHash);
  window.addEventListener('keydown', key);
});
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', onHash);
  window.removeEventListener('keydown', key);
});
</script>
<template>
  <a class="skip-link" href="#main-content" @click.prevent="skipToContent">Skip to content</a>
  <header class="docs-topbar">
    <a class="docs-brand" href="#/getting-started"
      ><span class="brand-mark"><BissIcon name="grid" /></span>BISS UI</a
    ><span class="docs-product">Component documentation</span>
    <div class="topbar-end">
      <span class="version">0.1.0-next.0</span
      ><button
        type="button"
        class="mobile-nav"
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
      <div v-if="!query" class="nav-group">
        <p>Start here</p>
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
      <template v-for="group in catalog.groups" :key="group"
        ><div v-if="matches.some((c) => c.category === group)" class="nav-group">
          <p>{{ group }}</p>
          <a
            v-for="c in matches.filter((c) => c.category === group)"
            :key="c.name"
            :href="`#/components/${c.slug}`"
            :aria-current="current?.name === c.name ? 'page' : undefined"
            >{{ label(c.short) }}<span v-if="!c.vue" class="framework-note">Svelte</span></a
          >
        </div></template
      >
      <p v-if="!matches.length" class="nav-empty">
        No matching components. Try “date”, “table” or “menu”.
      </p>
    </nav>
    <div class="sidebar-note">From Bizzy’s design system.<br />Built for your application.</div>
  </aside>
  <div v-if="navOpen" class="nav-scrim" @click="navOpen = false" aria-hidden="true" />
  <div class="docs-layout">
    <main id="main-content" tabindex="-1">
      <template v-if="current">
        <div class="breadcrumbs">
          <a href="#/components">Components</a><BissIcon name="chev" /><span>{{
            current.category
          }}</span>
        </div>
        <div class="page-heading">
          <h1>{{ label(current.short) }}</h1>
          <code>{{ current.name }}</code>
        </div>
        <p class="docs-lead">{{ current.description }}</p>
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
              ? 'Both frameworks'
              : current.vue
                ? 'Vue only'
                : 'Svelte only'
          }}</span>
        </div>
        <section id="preview" class="docs-section">
          <h2>Preview</h2>
          <div class="preview-toolbar">
            <span>Interactive preview</span>
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
              :key="current.name + state + previewKey"
              :src="previewUrl"
              :title="`${current.name} interactive example`"
              :style="{ height: previewHeight + 'px' }"
              @load="resizePreview"
            />
          </div>
          <p class="preview-description">
            Live Vue component with local example data. The framework switch selects the usage code
            and API.
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
        <section id="props" class="docs-section">
          <h2>Props</h2>
          <p>
            The table is generated from the shipped
            {{ framework === 'vue' ? 'Vue' : 'Svelte' }} component source. Required values have no
            default.
          </p>
          <div v-if="visibleProps.length" class="api-table-wrap">
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
            No custom events are declared in this framework’s prop contract. Standard element events
            follow the component’s native attribute forwarding.
          </p>
          <p v-if="api?.slots.length">
            Slots: <code v-for="slot in api.slots" :key="slot" class="slot-name">{{ slot }}</code>.
          </p>
          <p v-if="framework === 'svelte' && current.modern">
            Composition snippets appear in the typed Svelte props. <code>children</code> is the main
            content; named snippets provide actions or a footer where supported.
          </p>
          <p>
            Use <code>{{ current.name }}Props</code> from <code>biss-ui/{{ framework }}</code> when
            building a typed wrapper.
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
          {{ catalog.components.length }} components. Screenshots, working examples and
          source-derived contracts.
        </p>
        <p class="coverage-line">
          130 Vue components · 130 Svelte components · interactive examples
        </p>
        <section v-for="group in catalog.groups" :key="group" class="docs-section">
          <h2>{{ group }}</h2>
          <a
            v-for="c in catalog.components.filter((c) => c.category === group)"
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
          /></a></section
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
    <aside class="page-toc" aria-label="On this page">
      <p>On this page</p>
      <a
        v-for="section in sections"
        :key="section"
        :href="'#' + route + '?section=' + anchor(section)"
        >{{ section }}</a
      >
    </aside>
  </div>
</template>

<style>
.live-example {
  width: 100%;
  background: var(--biss-card);
  border: 1px solid var(--biss-border);
  border-radius: 8px;
  overflow: hidden;
}
.live-example.phone-preview {
  max-width: 390px;
  margin-inline: auto;
}
.live-example iframe {
  display: block;
  width: 100%;
  border: 0;
  min-height: 260px;
}
.preview-description {
  font-size: 13px;
  color: var(--biss-muted);
}
</style>
