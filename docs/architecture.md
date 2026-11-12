# Library architecture

BISS UI is a separate release line from caselaw-ui. Both frameworks expose the
same 130 named components and use the same styles. Consumers choose a framework
entry point; the root entry point has no framework dependency.

| Entry point | Contract |
|---|---|
| `biss-ui` | Tokens, public data types, icons, highlighting and toast queue factory |
| `biss-ui/core` | Framework-independent collection, filtering, date and chart helpers |
| `biss-ui/vue` | Compiled Vue ESM, component declarations and app-scoped toast integration |
| `biss-ui/svelte` | Preprocessed Svelte 5 components, declarations, callbacks and snippets |
| `biss-ui/styles.css` | One shared visual system, imported once by the host |
| `biss-ui/tokens` | Generated token values and theme types |

## Boundaries

`src/core/` owns portable data contracts and pure behavior. It cannot import a
framework. Browser interaction helpers live in `core/dom.ts`; their event
listeners, observers and focus handling are installed only on mount and disposed
by the framework adapters in `src/vue/actions.ts` and Svelte actions.

`src/vue/` and `src/svelte/` own rendering, lifecycle and framework conventions.
Controls emit proposed changes; the host owns persistence, authentication,
authorization, fetching and domain calculations. No component reads a global
account, changes server permissions, or performs an invitation itself.

Modal and ConfirmDialog compose Dialog rather than maintaining separate focus,
scroll and dismissal implementations. Popovers use the native browser top layer
and retain wrapper tokens. DOM work stays out of module initialization, so the
components can render on the server.

Toast queues come from `createBissToasts()`. Each Vue app has its own context;
`createBissUI()` can install it explicitly. Svelte receives an explicit queue.
There is no module-level notification singleton. Queues expose unsubscribe and
destroy operations, and server rendering creates no notification timers.

## One visual source

`src/theme/tokens.json` is the source of truth. `npm run tokens:generate` produces
CSS custom properties and typed TypeScript values; `npm run tokens:check` rejects
drift. Semantic tokens govern color, controls, typography, borders and surfaces.
Framework components never carry a competing theme. Override tokens on a wrapper
to customize a region, or on `:root` to customize an application.

All reusable styling lives in `src/styles/`. Foundation, forms, layout, content,
Bizzy patterns and editor styles compose the public stylesheet. Components use
`biss-` selectors and do not reset document elements globally. The former
caselaw visual foundation has been removed.

## Artifact and compatibility

`npm run build` creates `dist/`: native ESM and declarations for the core,
compiled Vue output and declarations, a standard `@sveltejs/package` output, and
modular CSS. Relative ESM paths have explicit extensions. Only the built artifact
and package documentation enter the tarball. Optional peer dependencies allow a
Vue-only application to use Vue without requiring Svelte, and vice versa.

Vue targets 3.5+, Svelte targets 5.20+, and the browser interaction layer targets
modern evergreen browsers with native dialog and popover support. Svelte SSR
bundlers should process `biss-ui` as a Svelte dependency; plain Vite SSR can use
`ssr.noExternal: ['biss-ui']`. Vue consumers do not need to compile library SFCs.

This prerelease intentionally updates the old Svelte event/slot dialect. Use
callback props (`onclick`, `onchange`, `onsave`) and snippets. Existing caselaw-ui
consumers remain on their independently published package.

## Contribution and verification

A component is complete when both framework implementations, public prop types,
shared styles, controlled-state examples and source-derived docs agree. Add its
fixture and documentation category, plus behavior checks when it introduces
stateful interactions. Native attributes belong on the interactive element;
icon-only controls need accessible labels. Keep keyboard and pointer paths
consistent, honor reduced motion, and dispose every browser resource.

The quality checks cover type safety, Svelte compilation, pure logic, both
framework workbenches at desktop and phone widths, keyboard interactions and axe
scans. `test:package` unpacks the real archive into an isolated consumer, renders
all 260 framework implementations on the server, verifies a Vue build without an
SFC compiler, and checks request-local state. Documentation checks render all 130 components in both frameworks and verify
field associations, a composed editing workflow, responsive layout and accessibility.

```sh
npm run check
npm run build
npm run test:package
npm run demo:build
npm run test:browser
npm run docs:typecheck
npm run docs:build
npm run docs:screenshots
npm run docs:markdown
npm run docs:build
npm run docs:check
```

Screenshots are reproducible synthetic examples. Both workbench test runners and
documentation scripts close browsers and stop preview servers in `finally`.

## Shared field and grid contracts

`core/field.ts` owns the framework-independent field contract. Field providers scope
IDs and descriptions to a control (set a custom ID on Field, rather than its child); Input, Select and Textarea consume them. A host
can use the scoped `control` object with another native control. Required, disabled
and error state propagate through context, without a global singleton.

Svelte controls support native `value` and `bind:value`. `modelValue` remains a
compatibility alias; prefer `value` in new code. Supply one value contract at a time.

`core/data-grid.ts` owns selection and column geometry. Off-page selection survives
page-local select-all changes; the header exposes indeterminate state. Pinned columns
are contiguous, widths are clamped, and the final flexible column fills the measured
container. A shared ResizeObserver action disposes measurement on unmount.

CSS is organized into `biss.tokens` and `biss.components` cascade layers. Unlayered
host styles override the library without selector escalation. A wrapper can select
`data-biss-density="compact"` or `"comfortable"`; standard density remains the default.

The docs render actual selected-framework components in an isolated frame, and the
[playground](https://bissui.wicker.life/#/playground) demonstrates composition. See
[the quality audit](library-audit.md) for changes and outstanding architectural work.
