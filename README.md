# Caselaw UI

Shared Case Law Explorer design tokens and framework primitives for Vue and Svelte services.

The package keeps the common visual language in one place:

- White institutional canvas with a fixed 32px square grid.
- Primary blue matched to the shared Keycloak login flow: `#2f63ee`.
- Fixed top and bottom bars.
- Service icons for the shared top bar and favicon.
- 8px cards, 6px controls, restrained shadows, and consistent type sizing.
- Equivalent Vue and Svelte components with the same props.

## Install

```bash
npm install caselaw-ui
```

## Global Styles

Import the shared CSS once in the client app root:

```ts
import "caselaw-ui/styles.css";
```

For SvelteKit, put it in `src/routes/+layout.svelte` or `src/app.css`.

For Vue/Nuxt, put it in `main.ts`, `app.vue`, or the Nuxt CSS config.

## Svelte

```svelte
<script lang="ts">
  import "caselaw-ui/styles.css";
  import { CleButton, CleGridShell } from "caselaw-ui/svelte";

  const footerLinks = [
    { label: "BISS Institute", href: "https://www.maastrichtuniversity.nl/research/biss-institute", external: true },
    { label: "Citations API", href: "https://demo-api.caselawexplorer.tech", external: true },
  ];
</script>

  <CleGridShell brand="Case Law Explorer" mark="CLE" icon="explorer" footerLinks={footerLinks}>
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
  <CleGridShell brand="Caselaw DB" mark="DB" icon="database" :footer-links="footerLinks">
    <section>
      <p class="cle-eyebrow">Admin only</p>
      <h1>Database workbench</h1>
      <CleButton>Sign in with shared account</CleButton>
    </section>
  </CleGridShell>
</template>

<script setup lang="ts">
import "caselaw-ui/styles.css";
import { CleButton, CleGridShell } from "caselaw-ui/vue";

const footerLinks = [
  { label: "BISS Institute", href: "https://www.maastrichtuniversity.nl/research/biss-institute", external: true },
  { label: "Citations API", href: "https://demo-api.caselawexplorer.tech", external: true },
];
</script>
```

## Exports

- `caselaw-ui/styles.css`: tokens and reusable classes.
- `caselaw-ui/tokens`: TypeScript token object.
- `caselaw-ui`: design tokens plus service icon and favicon helpers.
- `caselaw-ui/svelte`: Svelte primitives.
- `caselaw-ui/vue`: Vue primitives.

## Current Components

- `CleGridShell`: fixed top bar, fixed bottom bar, grid background, main page container.
- `CleTopBar`: service icon/brand title, consistent right-aligned nav, and action slots.
- `CleBottomBar`: managed-by text and footer links.
- `CleButton`: primary and secondary buttons/links.
- `CleCard`: standard card surface.
- `CleServiceIcon`: semantic service mark for top bars, panels, and favicons.

## Service Icons

Use the same semantic icon name everywhere a service identifies itself. `CleGridShell` passes it to `CleTopBar` and, by default, installs an SVG favicon in the browser.

```ts
type CleServiceIconName = "explorer" | "database" | "access" | "api" | "auth" | "rate-limit";
```

Recommended mapping:

| Service | `brand` | `mark` fallback | `icon` |
| --- | --- | --- | --- |
| Case Law Explorer | `Case Law Explorer` | `CLE` | `explorer` |
| Database Workbench | `Caselaw DB` | `DB` | `database` |
| Access / Rate Limit Admin | `Caselaw Access` | `ACL` | `access` |
| Citations API | `Citations API` | `API` | `api` |
| Shared Auth | `Caselaw Auth` | `AUTH` | `auth` |

If an app cannot use `CleGridShell`, call `setCleFavicon("api")` from `caselaw-ui` on client mount and render `CleTopBar` directly with the same `icon` prop.

## Versioning

Treat this as a shared product dependency. Changes to token names, component props, or class semantics should be released as a new minor or major version depending on breakage.
