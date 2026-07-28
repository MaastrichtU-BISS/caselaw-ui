# caselaw-ui

[![npm](https://img.shields.io/npm/v/caselaw-ui?logo=npm&label=npm&color=%23181849)](https://www.npmjs.com/package/caselaw-ui)

The shared interface layer for the Case Law Explorer products. Design tokens, page
furniture, tables, forms and code blocks, in both Vue and Svelte, so the products look
like one product.

```bash
npm install caselaw-ui
```

## Using it

Import the stylesheet once, anywhere in your application entry point:

```js
import "caselaw-ui/styles.css";
```

Every rule in it is `.cle-` prefixed, so it cannot reach your own styling. Adding it to
an existing app changes nothing until you use a component.

Then import components from the entry point for your framework.

### Vue

```vue
<script setup>
import { CleGridShell, CleHero, CleButton, CleFeatureCard } from "caselaw-ui/vue";
</script>

<template>
  <CleGridShell brand="My Product" mark="MP" icon="api">
    <CleHero
      title="My Product"
      subtitle="What it does, in one sentence."
      :pills="['Fast', 'Documented']"
    >
      <template #actions>
        <CleButton href="/docs">Read the docs</CleButton>
      </template>
    </CleHero>

    <section class="cle-feature-grid">
      <CleFeatureCard icon="api" title="Search" copy="Query everything at once." />
    </section>
  </CleGridShell>
</template>
```

### Svelte

```svelte
<script>
  import { CleGridShell, CleHero, CleButton } from "caselaw-ui/svelte";
  import "caselaw-ui/styles.css";
</script>

<CleGridShell brand="My Product" mark="MP" icon="api">
  <CleHero title="My Product" subtitle="What it does." pills={["Fast", "Documented"]}>
    <svelte:fragment slot="actions">
      <CleButton href="/docs">Read the docs</CleButton>
    </svelte:fragment>
  </CleHero>
</CleGridShell>
```

## Two page shapes

**`CleGridShell`** is the public face: grid background, fixed top bar, fixed footer,
and your content between them. Entry pages and marketing pages use it.

```vue
<CleGridShell
  brand="Caselaw Access"
  mark="ACL"
  icon="access"
  :top-links="[{ label: 'Docs', href: '/docs' }]"
  footer-text="Managed by BISS Institute."
  :footer-links="[{ label: 'BISS Institute', href: '...', external: true }]"
>
  ...
</CleGridShell>
```

**`CleConsoleLayout`** is the signed-in face: the same top bar, plus a sidebar, a
breadcrumb trail, a page header and an account block. Set `footer` to close a
workspace with the shared bottom bar; its body and sidebar automatically leave room.

```vue
<CleConsoleLayout
  brand="Citations API"
  icon="api"
  title="API reference"
  subtitle="The live API surface."
  :crumbs="[{ label: 'Citations API', href: '/' }, { label: 'Docs' }]"
  footer
  footer-text="Managed by BISS Institute."
  :footer-links="[{ label: 'BISS Institute', href: '...', external: true }]"
>
  <template #nav>
    <CleNavSection heading="Endpoints">
      <CleNavItem href="/docs/echr" label="ECHR" meta="POST" :active="true" />
    </CleNavSection>
  </template>

  ...content...
</CleConsoleLayout>
```

## Components

| Group | Components |
|---|---|
| Page shape | `CleGridShell`, `CleConsoleLayout`, `CleAppShell`, `CleTopBar`, `CleBottomBar` |
| Headings | `CleHero`, `ClePageHeader`, `CleSectionHeader`, `CleHeroPill` |
| Content | `CleCard`, `CleFeatureCard`, `CleKpiCard`, `CleCallout`, `CleBadge`, `CleEmptyState` |
| Data | `CleDataTable`, `CleStatList`, `CleMeterList`, `CleBarChart`, `CleSkeleton` |
| Forms | `CleField`, `CleInput`, `CleTextarea`, `CleSelect`, `CleSwitch`, `CleTagInput`, `CleSearchInput`, `CleCopyField` |
| Actions | `CleButton`, `CleModal`, `CleConfirmDialog`, `CleToastStack` |
| Code | `CleCodeBlock`, `CleCodeTabs` |
| Navigation | `CleNavSection`, `CleNavItem`, `CleTab`, `CleStep`, `CleSteps` |
| Identity | `CleServiceIcon`, `CleSidebarUser` |

Svelte covers the subset the SvelteKit products need. Vue covers everything. A shape
only one framework can draw is how the products drift apart, so new components should
land in both.

## Tables

`CleDataTable` sorts every column by default and paginates when given a page size.

```vue
<CleDataTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'plan', label: 'Plan' },
    { key: 'actions', label: '', actions: true },
  ]"
  :rows="rows"
  :page-size="25"
  empty="No keys yet."
>
  <template #cell-plan="{ value }">
    <CleBadge tone="success">{{ value }}</CleBadge>
  </template>
</CleDataTable>
```

Clicking a header cycles ascending, descending, unsorted. Columns marked `actions` are
excluded from sorting.

## Code blocks

Syntax highlighting with no dependency, covering JSON, Python, JavaScript, TypeScript,
bash and SQL.

```vue
<CleCodeBlock language="python" :code="snippet" label="server.py" />

<CleCodeTabs :samples="[
  { label: 'Python', language: 'python', code: pythonSnippet },
  { label: 'Node', language: 'js', code: nodeSnippet },
]" />
```

Pass `language="plain"` to turn highlighting off.

## Service icons

Six marks identify the products: `explorer`, `database`, `access`, `api`, `auth`,
`rate-limit`.

```js
import { setCleFavicon, getCleFaviconHref } from "caselaw-ui";

setCleFavicon("api");                 // sets the tab icon
getCleFaviconHref("explorer");        // a data URI, for a static file
```

`CleGridShell` and `CleConsoleLayout` set the favicon from their `icon` prop. Pass
`:favicon="false"` when the page owns its own.

## Theming

Everything reads from CSS custom properties on `:root`. Override them after importing
the stylesheet:

```css
:root {
  --cle-primary: #2f63ee;
  --cle-bg: #f8fafc;
  --cle-text: #172033;
  --cle-muted: #667085;
  --cle-border: #d9e1ec;
  --cle-radius-md: 8px;
  --cle-topbar-height: 68px;
}
```

## Development

```bash
npm install
npm run check        # Vue typecheck, Svelte compile check, unit tests
npm run check:vue
npm run check:svelte
npm test
```

Vue components are checked with `vue-tsc`, because `tsc --noEmit` does not read
`.vue` files and a broken template will otherwise publish cleanly.

## Publishing

Tag the commit and the workflow publishes to npm through OIDC trusted publishing.

```bash
npm version patch
git push origin main --tags
```

## Related repositories

- [caselaw-access](https://github.com/davidwickerhf/caselaw-access), whose console is built from this
- [caselaw-auth](https://github.com/davidwickerhf/caselaw-auth), the shared sign-in
- [caselaw-coolify](https://github.com/davidwickerhf/caselaw-coolify), the deployment bundle
