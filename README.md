# BISS UI

Vue 3.5 and Svelte 5 components using Bizzy’s warm neutral surfaces, BISS blue,
compact controls, restrained borders and quiet feedback. A new package, forked
from caselaw-ui; existing consumers stay on their existing package and styles.

This branch is a release candidate. Nothing has been published to npm.

```sh
# After the first preview publication
npm install biss-ui@next
# Add the foundation for your framework
npm install reka-ui # Vue
# npm install bits-ui # Svelte
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

154 components are available in **each framework**, with one Bizzy design language,
in two tiers:

- **Components** (Actions, Forms, Overlays, Navigation, Data display, Charts,
  Feedback): controls and displays with no application state, from Button, Tabs,
  Slider and NumberField to DatePicker, Menu and DataTable.
- **Blocks** (Application shells, Page headers, Data views, Sharing and
  collaboration, Dashboards, Documents, Onboarding, Marketing): compositions for
  recurring application tasks, such as Sidebar, DataGrid, FilterBuilder,
  SharePanel, NotificationCenter, ImportMapper, Feed and Tour. The host supplies
  their data and handles their actions.

[docs/components.md](docs/components.md) lists every component by tier and group.

The [documentation site](docs/README.md) derives API tables from source and shows
live examples. The [architecture guide](docs/architecture.md)
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
HTML reset.

### Light, dark and system themes

Set `data-biss-theme` on `<html>`, or on any wrapper to theme one region:

```html
<html data-biss-theme="system"> <!-- or "light" / "dark" -->
```

`light` and `dark` can be nested inside each other; `system` follows the
operating system. Both palettes are generated from `src/theme/tokens.json` and
exported as `bissCssTokens` and `bissThemes` from `biss-ui/tokens`. Give custom
brand colors a dark value too, for example inside `[data-biss-theme='dark']`.

## Connected component architecture

Dialog is the first migrated family: `Dialog.Root`, `Trigger`, `Portal`,
`Overlay`, `Content`, `Title`, `Description` and `Close` share scoped state,
keyboard behavior and a Bizzy styling recipe. Use `biss-ui/vue/dialog` or
`biss-ui/svelte/dialog` for part-level imports. `BissDialog` remains the convenient
wrapper with framework-native open binding, sizing and per-part `ui` classes.

Vue uses Reka UI 2.11+; Svelte uses Bits UI 2.21+ and Svelte 5.33+. Install only
the provider for your framework. Other families are still being migrated; the
[reference architecture](docs/reference-architecture.md) records the sequence.
[Try the paired Dialog examples](https://bissui.wicker.life/#/components/dialog).

## Quality and composition

Fields automatically connect labels, hints, validation and controls. The shared grid
model governs selection and column geometry in both frameworks. CSS cascade layers
and compact/comfortable density provide predictable customization. Svelte text
controls support native `value` / `bind:value`; `modelValue` remains compatible.

Try the [composed playground](https://bissui.wicker.life/#/playground), or read the
[quality audit](docs/library-audit.md) for what changed and what remains.

## Documentation

Browse the library at [bissui.wicker.life](https://bissui.wicker.life).

Run `npm run docs:dev` for the documentation site: a landing page with a live
workspace and theming playground, all 154 components, and source-derived API
tables. Component pages render authored examples: each is a real `.vue` and
`.svelte` file under `docs-site/examples/<component>/`, and the page shows the
exact source of the file it runs. Add an example by adding the file pair and an
entry to that folder's `manifest.ts`. [Documentation guide](docs/README.md) ·
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
