# BISS UI documentation

Live reference: [bissui.wicker.life](https://bissui.wicker.life).

The reference follows Bizzy’s compact application style: warm surfaces, clear
page headings, a predictable navigation rail, quiet controls and specific copy.
Every component page renders a live, interactive example and source-derived
API tables. Demonstration names and records are synthetic. Previews render the selected Vue or Svelte implementation, with state selection, responsive widths and reset controls. Stored PNGs are historical reference artifacts and are not used by the site.

| Start here | What it covers |
|---|---|
| Documentation site | Run `npm run docs:dev`, or build `dist-docs/` with `npm run docs:build`. It includes installation, theming, accessibility, migration, and all 144 distinct components across Vue and Svelte. |
| [Component screenshots](visual-reference.md) | Real desktop and phone renders of all 130 components. Historical visual references; the website renders interactive components. |
| [Portable components](components.md) | The initial Bizzy-derived components, their framework contracts, customization and host responsibilities. |
| [API reference](api.md) | All 144 component APIs, generated from source with framework-specific contracts. The site derives props, defaults, events, models and composition directly from the shipped SFCs. |
| [Earlier API migration](legacy-api.md) | How existing consumers opt into the new package and Svelte contracts. |
| [Migration and releases](biss-migration.md) | Independent package identity and releases, and how a consumer opts in. |
| [Extraction inventory](bizzy-inventory.md) | Which Bizzy components were adapted, and the application features that remain in the host. |
| [Design contract](../DESIGN.md) | Colors, typography, shape, motion and component boundaries. |

## Run the site

Run these commands from the repository root, rather than an installed npm package.

```sh
npm ci
npm run docs:dev
```

The development server prints its local URL. This does not publish the docs.
The production site uses relative assets and hash routes, so `dist-docs/` can be
served by a static host, including from a subdirectory. The interactive examples
are isolated in `preview.html`; they use the shipped components and local data.

## Keep screenshots and API tables current

```sh
npm run docs:build          # extract APIs and build the component preview
npm run docs:screenshots    # capture actual components headlessly
npm run docs:markdown       # refresh the repository's visual reference
npm run docs:build          # rebuild live examples and source views
npm run docs:check          # coverage, hashes, navigation, live examples and WCAG scans
npm run docs:typecheck
```

Screenshots live in `docs/screenshots/`. Their manifest records the fixture,
viewport, pixel dimensions and SHA-256 for each PNG. A fingerprint of component,
style and preview inputs prevents stale captures from passing the docs check.
The capture script closes every browser and preview server it starts.

Use `docs-site/fixtures.ts` to add or adjust an example, and
`scripts/generate-docs.mjs` to add a component’s category and introduction. API
rows come from source, rather than a second hand-maintained prop list. Add
copyable examples in `docs-site/examples.ts` when a component needs composition
or controlled state. All 144 components are available in both frameworks. Screenshots use the Vue implementation; both framework workbenches have interaction and accessibility checks.

## Documentation interface

The shell uses collapsible component families, searchable navigation and a mobile
drawer with keyboard focus containment. Component pages connect live examples,
framework-specific source links, API anchors and a table of contents that follows
scroll position. The component directory has independent filtering and empty-state
feedback. Shared documentation styles live in `docs-site/docs.css`.

Dialog uses named authored examples with matching source, highlighted code, a
resizable viewport and direct links to the isolated example. The viewer stays
compact on phones; overlay interaction remains inside its iframe.

`test-docs-design.mjs` covers navigation groups, search, mobile focus, section
tracking, source switching, directory filtering, overflow and accessibility at
1440px and 390px. The docs check also verifies all 144 routes and the Dialog
interaction examples in both frameworks.
