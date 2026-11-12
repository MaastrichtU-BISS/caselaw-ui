# biss-ui

[![npm](https://img.shields.io/npm/v/biss-ui?logo=npm&label=npm&color=%23181849)](https://www.npmjs.com/package/biss-ui)

The shared interface layer for the Case Law Explorer products. Design tokens, page
furniture, tables, forms and code blocks, in both Vue and Svelte, so the products look
like one product.

```bash
npm install biss-ui
```

## Using it

Import the stylesheet once, anywhere in your application entry point:

```js
import "biss-ui/styles.css";
```

Component rules are `.biss-` prefixed, so it cannot reach your own styling. Adding it to
an existing app changes nothing until you use a component.

Then import components from the entry point for your framework.

### Vue

```vue
<script setup>
import { BissGridShell, BissHero, BissButton, BissFeatureCard } from "biss-ui/vue";
</script>

<template>
  <BissGridShell brand="My Product" mark="MP" icon="api">
    <BissHero
      title="My Product"
      subtitle="What it does, in one sentence."
      :pills="['Fast', 'Documented']"
    >
      <template #actions>
        <BissButton href="/docs">Read the docs</BissButton>
      </template>
    </BissHero>

    <section class="biss-feature-grid">
      <BissFeatureCard icon="api" title="Search" copy="Query everything at once." />
    </section>
  </BissGridShell>
</template>
```

### Svelte

```svelte
<script>
  import { BissGridShell, BissHero, BissButton } from "biss-ui/svelte";
  import "biss-ui/styles.css";
</script>

<BissGridShell brand="My Product" mark="MP" icon="api">
  <BissHero title="My Product" subtitle="What it does." pills={["Fast", "Documented"]}>
    <svelte:fragment slot="actions">
      <BissButton href="/docs">Read the docs</BissButton>
    </svelte:fragment>
  </BissHero>
</BissGridShell>
```

## Two page shapes

**`BissGridShell`** is the public face: grid background, fixed top bar, fixed footer,
and your content between them. Entry pages and marketing pages use it.

```vue
<BissGridShell
  brand="Caselaw Access"
  mark="ACL"
  icon="access"
  :top-links="[{ label: 'Docs', href: '/docs' }]"
  footer-text="Managed by BISS Institute."
  :footer-links="[{ label: 'BISS Institute', href: '...', external: true }]"
>
  ...
</BissGridShell>
```

**`BissConsoleLayout`** is the signed-in face: the same top bar, plus a sidebar, a
breadcrumb trail, a page header and an account block. Set `footer` to close a
workspace with the shared bottom bar; its body and sidebar automatically leave room.

```vue
<BissConsoleLayout
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
    <BissNavSection heading="Endpoints">
      <BissNavItem href="/docs/echr" label="ECHR" meta="POST" :active="true" />
    </BissNavSection>
  </template>

  ...content...
</BissConsoleLayout>
```

## Components

| Group | Components |
|---|---|
| Page shape | `BissGridShell`, `BissConsoleLayout`, `BissAppShell`, `BissTopBar`, `BissBottomBar` |
| Headings | `BissHero`, `BissPageHeader`, `BissSectionHeader`, `BissHeroPill` |
| Content | `BissCard`, `BissFeatureCard`, `BissKpiCard`, `BissCallout`, `BissBadge`, `BissEmptyState` |
| Data | `BissDataTable`, `BissStatList`, `BissMeterList`, `BissBarChart`, `BissSkeleton` |
| Forms | `BissField`, `BissInput`, `BissTextarea`, `BissSelect`, `BissSwitch`, `BissTagInput`, `BissSearchInput`, `BissCopyField` |
| Actions | `BissButton`, `BissModal`, `BissConfirmDialog`, `BissToastStack` |
| Code | `BissCodeBlock`, `BissCodeTabs` |
| Navigation | `BissNavSection`, `BissNavItem`, `BissTab`, `BissStep`, `BissSteps` |
| Identity | `BissServiceIcon`, `BissSidebarUser` |

Svelte covers the subset the SvelteKit products need. Vue covers everything. A shape
only one framework can draw is how the products drift apart, so new components should
land in both.

## Tables

`BissDataTable` sorts every column by default and paginates when given a page size.

```vue
<BissDataTable
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
    <BissBadge tone="success">{{ value }}</BissBadge>
  </template>
</BissDataTable>
```

Clicking a header cycles ascending, descending, unsorted. Columns marked `actions` are
excluded from sorting.

## Code blocks

Syntax highlighting with no dependency, covering JSON, Python, JavaScript, TypeScript,
bash and SQL.

```vue
<BissCodeBlock language="python" :code="snippet" label="server.py" />

<BissCodeTabs :samples="[
  { label: 'Python', language: 'python', code: pythonSnippet },
  { label: 'Node', language: 'js', code: nodeSnippet },
]" />
```

Pass `language="plain"` to turn highlighting off.

## Service icons

Six marks identify the products: `explorer`, `database`, `access`, `api`, `auth`,
`rate-limit`.

```js
import { setBissFavicon, getBissFaviconHref } from "biss-ui";

setBissFavicon("api");                 // sets the tab icon
getBissFaviconHref("explorer");        // a data URI, for a static file
```

`BissGridShell` and `BissConsoleLayout` set the favicon from their `icon` prop. Pass
`:favicon="false"` when the page owns its own.

## Theming

Everything reads from CSS custom properties on `:root`. Override them after importing
the stylesheet:

```css
:root {
  --biss-primary: #2f63ee;
  --biss-bg: #f8fafc;
  --biss-text: #172033;
  --biss-muted: #667085;
  --biss-border: #d9e1ec;
  --biss-radius-md: 8px;
  --biss-topbar-height: 68px;
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

See [independent releases](biss-migration.md). Do not use legacy v* tags or push
this branch over the maintained caselaw-ui main branch.

## Related repositories

- [caselaw-access](https://github.com/MaastrichtU-BISS/caselaw-access), whose console is built from this
- [caselaw-auth](https://github.com/MaastrichtU-BISS/caselaw-auth), the shared sign-in
- [caselaw-coolify](https://github.com/MaastrichtU-BISS/caselaw-coolify), the deployment bundle
