# Library quality audit and changes

The first port prioritized breadth. This pass treats component count as an inventory,
not a measure of quality. Bizzy remains the design authority; the existing caselaw-ui
release and original Bizzy repository are unchanged.

| Problem found | Change |
|---|---|
| Framework switch changed code while always rendering Vue | Separate real Vue/Svelte preview renderers, sharing fixtures and public component APIs |
| Field labels/hints/errors required manual ID plumbing | Shared field contract, scoped framework contexts, automatic native associations and state inheritance |
| Svelte text controls silently ignored native `value` | Native `value`/`bind:value` support, retaining the previous `modelValue` alias |
| Grid selection and geometry duplicated across frameworks | Pure shared model with tri-state selection, off-page selection preservation, pinned ordering and clamped widths |
| Pinned offsets assumed column widths the table did not honor | Explicit model-derived table geometry and selection-column width |
| Consumers needed specificity overrides for library CSS | Named token/component cascade layers; unlayered application CSS takes precedence |
| Density tokens were partly decorative | Real compact/standard/comfortable control and table density, selectable in docs |
| Isolated previews hid integration problems | Composed workspace with search, selection, sorting, editing, validation and persistence in local demo state |
| Buttons lacked async state and disabled links still dispatched actions | Loading state, reduced-motion feedback and disabled activation guards |

## Architecture boundaries

- `core/field.ts`: field/control accessibility contract, without a framework dependency.
- `core/data-grid.ts`: immutable grid state and geometry; no DOM or framework imports.
- Vue/Svelte: rendering, context and lifecycle adapters around those contracts.
- Theme JSON: runtime tokens generated for CSS and TypeScript.
- CSS layers: `biss.tokens`, then `biss.components`; host overrides stay outside the layers.
- Docs: production component imports, shared fixtures, actual selected framework.

Both frameworks must implement new behavior before it enters a release. Pure model
checks cover edge cases, installed-artifact checks cover SSR/types/packaging, and
browser checks cover actual controls and composition. A mounted wrapper alone is
not sufficient evidence that an example works.

## Remaining work

The library is still a prerelease. A full library-wide API consistency pass, generic
row/cell typing, compound/headless composition APIs, virtualized large-data views,
and broader browser/assistive-technology coverage remain separate substantial work.
These are not claimed as implemented by the presence of similarly named components.
