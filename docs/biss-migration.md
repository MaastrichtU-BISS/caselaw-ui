# Migration and independent releases

Keep `caselaw-ui` on main and its existing npm version stream. Maintain this work
on `feature/biss-ui` (or a dedicated long-lived release branch); do not merge the
package-name change into the legacy release branch while it is maintained.
No repository rename, dependent-app edit, deprecation or npm publication is part
of this change.

1. Review and test this branch. Test a local `npm pack` tarball in one Vue and one
   Svelte consumer before release; Vue ships compiled ESM; Svelte ships standard preprocessed Svelte components.
2. Confirm ownership/availability of the npm name `biss-ui`. If unavailable, agree
   on a scoped name before publishing; do not silently substitute a name.
3. Configure a **separate** npm trusted publisher for the new package and the
   workflow filename in this repository. The existing caselaw-ui publisher does
   not automatically authorize another package. See npm’s current setup:
   https://docs.npmjs.com/trusted-publishers/
4. Publish the reviewed prerelease using the `biss-ui-v0.1.0-next.0` tag and the
   guarded workflow. `publishConfig.tag` is `next`; legacy `v*` tags do not trigger
   this branch’s publisher. Configure initial package creation in npm as required.
5. Each consumer opts in: install `biss-ui@next`, replace imports, rename `Cle…`
   to `Biss…`, and change `--cle-*` overrides to `--biss-*`. Adopt the portable
   Bizzy components where they fit. Review visuals, keyboard flows and translations.
6. After consumer validation, choose a stable version and explicitly change the
   publication tag to `latest`. Keep the legacy package available independently.

The npm identity is the isolation boundary. A repository rename is optional and
can wait until integrations and maintainers are ready. Installing biss-ui does
not upgrade an existing dependency on caselaw-ui. Both stylesheets can coexist
because their selectors and properties use separate prefixes.

The old API was not an exact Bizzy match. Its components retain capabilities but
receive the new palette and controls. The library includes controlled data grids, editors and sharing surfaces; the host supplies permissions, persistence and application rules.

Svelte migration is intentional: replace `on:change` with `onchange`, `on:save` with `onsave`, and named slots with snippets. `children` supplies default content. Every component page lists its actual props and callbacks. Modal, ConfirmDialog and Dialog share one native dialog implementation.

See [architecture](architecture.md) for compiled exports, SSR isolation and the shared token source.
