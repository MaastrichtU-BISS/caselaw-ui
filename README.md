# Caselaw UI

Shared Case Law Explorer design tokens and framework primitives for Vue and Svelte services.

The package keeps the common visual language in one place:

- White institutional canvas with a fixed 32px square grid.
- Primary blue matched to the shared Keycloak login flow: `#2f63ee`.
- Fixed top and bottom bars.
- 8px cards, 6px controls, restrained shadows, and consistent type sizing.
- Equivalent Vue and Svelte components with the same props.

## Install

Until the package is published to npm, install it from GitHub:

```bash
npm install github:davidwickerhf/caselaw-ui
```

After npm publication:

```bash
npm install @caselawexplorer/ui
```

## Global Styles

Import the shared CSS once in the client app root:

```ts
import "@caselawexplorer/ui/styles.css";
```

For SvelteKit, put it in `src/routes/+layout.svelte` or `src/app.css`.

For Vue/Nuxt, put it in `main.ts`, `app.vue`, or the Nuxt CSS config.

## Svelte

```svelte
<script lang="ts">
  import "@caselawexplorer/ui/styles.css";
  import { CleButton, CleGridShell } from "@caselawexplorer/ui/svelte";

  const footerLinks = [
    { label: "BISS Institute", href: "https://www.maastrichtuniversity.nl/research/biss-institute", external: true },
    { label: "Citations API", href: "https://demo-api.caselawexplorer.tech", external: true },
  ];
</script>

<CleGridShell brand="Case Law Explorer" mark="CLE" footerLinks={footerLinks}>
  <section>
    <p class="cle-eyebrow">Research workspace</p>
    <h1>Case Law Explorer</h1>
    <CleButton>Sign in</CleButton>
  </section>
</CleGridShell>
```

## Vue

```vue
<template>
  <CleGridShell brand="Caselaw DB" mark="DB" :footer-links="footerLinks">
    <section>
      <p class="cle-eyebrow">Admin only</p>
      <h1>Database workbench</h1>
      <CleButton>Sign in with shared account</CleButton>
    </section>
  </CleGridShell>
</template>

<script setup lang="ts">
import "@caselawexplorer/ui/styles.css";
import { CleButton, CleGridShell } from "@caselawexplorer/ui/vue";

const footerLinks = [
  { label: "BISS Institute", href: "https://www.maastrichtuniversity.nl/research/biss-institute", external: true },
  { label: "Citations API", href: "https://demo-api.caselawexplorer.tech", external: true },
];
</script>
```

## Exports

- `@caselawexplorer/ui/styles.css`: tokens and reusable classes.
- `@caselawexplorer/ui/tokens`: TypeScript token object.
- `@caselawexplorer/ui/svelte`: Svelte primitives.
- `@caselawexplorer/ui/vue`: Vue primitives.

## Current Components

- `CleGridShell`: fixed top bar, fixed bottom bar, grid background, main page container.
- `CleTopBar`: brand mark/title and external/internal nav links.
- `CleBottomBar`: managed-by text and footer links.
- `CleButton`: primary and secondary buttons/links.
- `CleCard`: standard card surface.

## Versioning

Treat this as a shared product dependency. Changes to token names, component props, or class semantics should be released as a new minor or major version depending on breakage.
