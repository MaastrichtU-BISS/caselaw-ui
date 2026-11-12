# BISS UI

Vue 3.5 and Svelte 5 components using Bizzy’s warm neutral surfaces, BISS blue,
compact controls, restrained borders and quiet feedback. A new package, forked
from caselaw-ui; existing consumers stay on their existing package and styles.

This branch is a release candidate. Nothing has been published to npm.

```sh
# After the first preview publication
npm install biss-ui@next
```

```vue
<script setup lang="ts">
import { BissPageBar, BissButton, BissGoalBar } from 'biss-ui/vue';
import 'biss-ui/styles.css';
</script>
<template>
  <BissPageBar title="Projects" description="Your team’s work">
    <template #actions><BissButton>New project</BissButton></template>
  </BissPageBar>
  <BissGoalBar :value=".6" :expected=".75" label="Funding: 60 percent" />
</template>
```

Use `biss-ui/svelte` for Svelte. Every Svelte component uses Svelte 5 callback
props and snippets. Vue uses emits and slots, with `v-model` on form controls.
No router, account store, server connection or Nuxt globals are required.

## Components and customization

130 components are available in **each framework**, with one Bizzy design language.
They include data grids, column and label editors, filter builders, sharing and
permissions, document blocks, comments, dashboards, task lists, calendars, boards,
charts, forms, navigation, overlays and feedback.

The [documentation site](docs/README.md) derives API tables from source and shows
real screenshots and live examples. The [architecture guide](docs/architecture.md)
explains package boundaries, state ownership and contribution standards.

All styles and custom properties are `biss-` prefixed. Customize tokens globally
or on a wrapper to theme a single region:

```css
.research-tool {
  --biss-primary: #005ca9;
  --biss-primary-hover: #004a8a;
  --biss-bg: #faf9f7;
  --biss-card: #fff;
  --biss-radius-md: 10px;
  --biss-font-family: 'Inter', system-ui, sans-serif;
}
```

Fonts are supplied by the host; the package makes no font network requests.
Components inherit CSS tokens, support documented slots, and expose native
attributes where their framework implementation allows them. There is no global
HTML reset. Dark themes require supplying the full semantic token palette.

## Documentation

Browse the library at [bissui.wicker.life](https://bissui.wicker.life).

Run `npm run docs:dev` for the Bizzy-style documentation site: all 130
components, desktop and phone screenshots, interactive examples, framework usage, and
source-derived API tables. [Documentation guide](docs/README.md) ·
[Component screenshots](docs/visual-reference.md).

Build the static site with `npm run docs:build`. [Hosting and deployment](docs/HOSTING.md)
describe the separate Coolify documentation app and CI deployment after checks pass.

## Develop

```sh
npm ci
npm run check
npm run demo:build
npm run test:browser
npm run build
npm run test:package
npm run pack:dry
npm run demo
```

Both framework workbenches include filled, empty, loading, error and interactive states.
Browser verification starts a built preview, captures desktop and phone images,
and closes the browser and server even on failure.

See [migration and releases](docs/biss-migration.md) and
[extraction inventory](docs/bizzy-inventory.md) for scope and remaining adapters.
