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

Use `biss-ui/svelte` for Svelte. New components use named slots for composition;
the original Svelte tabs/pager use `bind:value` / `bind:page` and `on:change`;
Vue uses `v-model` and `v-model:page`. No router, translations, server, session,
or Nuxt globals are required. Labels are props; applications supply translations.
Use `on:save` / `on:discard` for the original Svelte SaveBar. The expanded
components use Svelte 5 callback props and snippets; see the component reference.

## Components and customization

54 components adapt Bizzy’s components and patterns in both frameworks, including
menus, dialogs, pickers, boards, charts, tables, identity and onboarding.
The full library exports 96 Vue and 81 Svelte components.


[Component reference](docs/components.md) documents the new Bizzy extractions and
[existing API](docs/legacy-api.md) covers the inherited library, now named `Biss…`.
The inherited API retains its functionality; the portable Bizzy components are
available in **both** frameworks. Framework coverage for inherited components
continues to differ; consult the two entry points before importing.

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

Run `npm run docs:dev` for the Bizzy-style documentation site: all 97 distinct
components, 226 real screenshots, interactive examples, framework usage, and
source-derived API tables. [Documentation guide](docs/README.md) ·
[Component screenshots](docs/visual-reference.md).

Build the static site with `npm run docs:build`. No hosting is configured or
published by this change.

## Develop

```sh
npm ci
npm run check
npm run demo:build
npm run test:browser
npm run pack:dry
npm run demo
```

Both framework workbenches include filled, empty, loading, error and interactive states.
Browser verification starts a built preview, captures desktop and phone images,
and closes the browser and server even on failure.

See [migration and releases](docs/biss-migration.md) and
[extraction inventory](docs/bizzy-inventory.md) for scope and remaining adapters.
