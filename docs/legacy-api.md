# Migrating the earlier API

The earlier caselaw-ui components remain available with `Biss…` names. They now
use the same Bizzy visual foundation as every new component. All 130 components
are implemented in both Vue and Svelte. The [generated API reference](api.md) and
searchable documentation site describe the current contracts.

Existing caselaw-ui consumers remain on their independent package and release
line. This branch does not change their dependency, CSS, source or release tags.

For an application opting into BISS UI:

1. Install the reviewed `biss-ui` prerelease or a locally packed tarball.
2. Change `caselaw-ui/vue` or `caselaw-ui/svelte` imports to the matching `biss-ui`
   entry point. Change `Cle…` component names to `Biss…`.
3. Import `biss-ui/styles.css` once and migrate `--cle-*` token overrides to
   `--biss-*`. Review existing overrides against the unified token source.
4. In Svelte, replace `on:click`, `on:change`, `on:save` and similar component
   events with `onclick`, `onchange`, `onsave` callback props. Payloads arrive
   directly, without `CustomEvent.detail`. Replace slots with Svelte 5 snippets.
5. Keep Vue's emits, slots and `v-model` conventions. Modal and ConfirmDialog
   now compose the same native Dialog lifecycle, so wrapper theme tokens apply.
6. Give Svelte ToastStack an explicit queue from `createBissToasts`; destroy it
   when its owning application scope ends. Vue toast contexts are app-scoped.

The new package ships built artifacts. Vue consumers load compiled ESM;
Svelte consumers load standard preprocessed Svelte components. See
[architecture](architecture.md) for SSR, entry points and lifecycle ownership,
and [independent releases](biss-migration.md) for the publication boundary.

## Dialog foundation migration

BissDialog retains `open`, `title`, `description`, `width`, `busy`, `portal`,
`closeLabel` and the existing close event/callback. Vue adds `v-model:open`; Svelte
adds `bind:open` and `onOpenChange`. Both add `size` and per-part `ui` classes.
Install `reka-ui` for Vue or `bits-ui` for Svelte. Svelte now requires 5.33+.

The content uses a focus-managed `div[role="dialog"]` rather than a native
`dialog` element. Replace consumer selectors such as `dialog:modal` with
`[role="dialog"][data-state="open"]`. BISS part classes and tokens are the styling
contract. Advanced composition is available through the Dialog namespace.
