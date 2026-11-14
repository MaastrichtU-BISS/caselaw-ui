---
name: BISS UI
description: Vue and Svelte components in Bizzy's warm, compact visual system.
colors:
  primary: "#005CA9"
  primary-hover: "#004A8A"
  background: "#FAF9F7"
  panel: "#FFFFFF"
  border: "#E7E5E0"
  text: "#1D1C1A"
  muted: "#5E5C57"
  success: "#0F7A4E"
  danger: "#C2412F"
  warning: "#7A5A00"
typography:
  body:
    fontFamily: '"Inter Variable", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  title:
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  section:
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.35
  control:
    fontSize: "13.5px"
    fontWeight: 500
    lineHeight: 1.2
rounded:
  control: "7px"
  panel: "10px"
  panel-large: "12px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.panel}"
    rounded: "{rounded.control}"
    height: "32px"
    padding: "0 12px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
---

# BISS UI design contract

## Overview

**Creative North Star: "Quiet, legible tools"**

Source authority is Bizzy's DESIGN.md and app/assets/css/theme.css. BISS UI
extends that established visual language for research and administration. Operate
mode uses warm surfaces, white panels, compact controls and restrained blue actions.

All 144 Vue and 144 Svelte components share this system, including the renamed
caselaw APIs and public-page compositions. There is no separate legacy visual
foundation; the old Caselaw stylesheet has been removed.

**Key Characteristics:**

- Warm, quiet surfaces with clear borders.
- Compact sans-serif typography and consistent control rhythm.
- Host-controlled data, labels and composition in both frameworks.

## Colors

Use the primary blue for actions and selected navigation; use the warmer neutrals
for page backgrounds, panels, borders, text and metadata. Green indicates success,
red errors and amber attention. Do not use color alone for state.

**The Shared Source Rule.** `src/theme/tokens.json` owns runtime tokens and generates
the CSS and TypeScript exports. The frontmatter records the design contract;
change runtime values in that source, then regenerate the exports. Customize
semantic CSS properties on a host wrapper rather than layering a second theme.

## Typography

Use host-provided Inter or system sans. Body text, page titles, section titles and
controls use the roles above. Weights range from 400 to 600; monospace belongs to
code and measurements. Public-page heroes use the same compact heading language.

Documentation uses Read mode: page titles (30px), section titles (19px), and phone
page titles (26px), within the same family and restrained hierarchy.

## Layout

Controls and toolbar items follow a consistent working rhythm (32px); table rows
use a compact default (36px). The page maximum is 1180px and the console maximum
is 1440px. Actions and metadata wrap at phone widths. Split layouts collapse to
one column at the 640px breakpoint; wide data grids retain horizontal scrolling.

The documentation has a fixed header (56px), warm sidebar (244px), white content
panels and restrained blue navigation. At phone widths, “Browse docs” opens the
navigation over the content and preview controls wrap. Keep the skip link and
visible keyboard focus available throughout.

## Elevation & Depth

Cards use a warm border (1px) and a minimal shadow. Modal and popover shadows share
one token. Depth separates working surfaces and temporary overlays without making
ordinary content appear raised. Exact shadow and transition values are recorded
in `.impeccable/design.json` and generated runtime tokens.

## Shapes

Controls have gently curved corners using the control radius; panels use the
panel radii. Small status badges and pills retain their compact rounded shape.
Keep borders quiet and functional.

## Components

**The One System Rule.** Every component uses the shared foundation. Styles are
organized into `src/styles/foundation.css`, `forms.css`, `layout.css`, `content.css`,
`bizzy.css`, `library.css` and `editors.css`, composed by `index.css` with the
generated tokens. Do not restore a legacy stylesheet or introduce another visual
foundation for a component family.

Buttons use one primary action per task, with secondary, ghost and danger variants
for supporting actions. Inputs share the compact control geometry, visible focus
outlines, textual errors and a clear disabled state. Navigation uses the same
rhythm with blue selected states; cards group related information on white panels.

New shared components require both Vue and Svelte implementations, typed props,
localizable labels, composition slots or snippets, keyboard and focus behavior,
semantic HTML and token-based customization. Vue ships compiled ESM; Svelte uses
modern Svelte 5 callbacks and snippets. Components render supplied data and emit
intent. Hosts own persistence, permissions, application state and translations;
components must not depend on Nuxt, app stores, i18n services or server APIs.
Composite components expose configurable labels for their nested controls and
accessible names as well as their visible text.

Native dialog, popover, tooltip and resize behavior is shared through
`src/core/dom.ts`, including listener and timer cleanup. Tooltips open on hover or
focus, remain available while hovered or focused, and close on Escape. Leaving
starts a cancellable dismissal delay (140ms), allowing the pointer to cross into
the tooltip. Reduced motion disables nonessential animation.

Each documentation component page pairs real screenshots with a live reference
example using synthetic data. Framework controls select Vue or Svelte usage and
source-generated contracts; state controls select the example state, and
Desktop/Phone controls select the screenshot viewport. Screenshots and live
examples identify their reference implementation independently of the selected
code framework. Generate props, defaults, events and composition from shipped
source rather than maintaining duplicate API lists. Use relative assets and hash
routes so the built documentation works on static hosts and under subdirectories.
See `docs/README.md` for capture, generation and verification commands.

## Do's and Don'ts

- Do use the shared token source and the same visual system in both frameworks.
- Do preserve visible focus, semantic controls and host-configurable labels.
- Do let actions and metadata wrap at phone widths.
- Don't use color alone to communicate state.
- Don't use glass, gradients, display-scale marketing type, uppercase labels or ornamental borders.
- Don't layer overrides over the removed Caselaw stylesheet.

## Library quality contracts

Form fields scope control IDs, accessible descriptions, errors and required/disabled
state through framework contexts. Host IDs belong on the Field. Loading buttons
retain their label and width; disabled links cannot dispatch activation callbacks.
Grid columns share one model across frameworks, keep pinned columns together, and
fill available width with a final flexible column. Selection supports partial and
off-page state. Compact and comfortable density are token-based wrapper choices.

The stylesheet declares token and component cascade layers, leaving application
styles free to override them. Both Vue and Svelte are actually rendered in docs.
The composed playground demonstrates the working design with real form validation
and local record editing, rather than relying on isolated component appearance.
