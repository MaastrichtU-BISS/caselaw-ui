# BISS UI design contract

Source authority: Bizzy DESIGN.md and app/assets/css/theme.css. Operate mode:
quiet, legible tools for research and administration. Warm surfaces #FAF9F7,
white panels, #E7E5E0 borders, #1D1C1A text and #005CA9 primary actions. Green
indicates success, red errors, amber attention. Do not use color alone for state.

Controls target 32px height, 7px corners; panels 10–12px. Page titles 22px/600,
section titles 15px/600, controls 13.5px. Use host-provided Inter or system sans.
One primary action per task. Actions and metadata wrap at phone widths.

New shared components require both Vue and Svelte implementations, typed props,
localizable labels, composition slots, keyboard and focus behavior, semantic HTML,
and token-based customization. They must not depend on Nuxt, app stores, i18n,
permissions or server APIs. Reduced motion disables nonessential animation.

Inherited caselaw components remain available under Biss names; their detailed
layout modernization is separate from the directly extracted Bizzy components.

## Documentation

The documentation uses Read mode within Bizzy’s established visual language:
a fixed 56px header, a 244px warm sidebar, white content panels, compact headings
(30px page titles, 19px section titles) and restrained blue navigation and controls.
At phone widths, “Browse docs” opens the navigation over the content; headings
reduce to 26px and preview controls wrap. Keep the skip link and visible keyboard
focus available throughout.

Each component page pairs real screenshots with a live reference example using
synthetic data. Framework controls select Vue or Svelte usage and source-generated
contracts; state controls select the example state, and Desktop/Phone controls
select the screenshot viewport. Screenshots and live examples identify their
reference implementation independently of the selected code framework. Generate
props, defaults, events and composition from shipped source rather than maintaining
duplicate API lists. Use relative assets and hash routes so the built documentation
works on static hosts and under subdirectories. See `docs/README.md` for capture,
generation and verification commands.
