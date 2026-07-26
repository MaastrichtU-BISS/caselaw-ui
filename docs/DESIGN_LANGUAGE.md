# Design Language

## Tokens

The canonical auth/product palette comes from the Keycloak login theme:

| Token | Value | Use |
| --- | --- | --- |
| `--cle-bg` | `#f8fafc` | Page background |
| `--cle-grid` | `rgba(148, 163, 184, 0.14)` | 32px grid lines |
| `--cle-card` | `#ffffff` | Cards and panels |
| `--cle-border` | `#d9e1ec` | Card and bar borders |
| `--cle-text` | `#111827` | Main text |
| `--cle-muted` | `#667085` | Supporting copy |
| `--cle-primary` | `#2f63ee` | Primary buttons, focus accents |
| `--cle-primary-hover` | `#2454d6` | Primary hover |

## Layout

Use `CleGridShell` for public entry pages, admin entry pages, and auth-gated service front doors.

The shell gives each page:

- Fixed top app bar.
- Fixed bottom bar.
- Square grid background matching the shared auth service.
- Main content padding that prevents overlap with fixed bars.
- A consistent service icon and brand treatment when `icon` is supplied.

Top bars are full-width app chrome by default. Page bodies remain constrained with
`--cle-page-max`, while the header uses `--cle-bar-max: 100%` and 24px viewport
padding. Only override `--cle-bar-max` for embedded or deliberately narrow app
surfaces.

## App Bars

Every product should use the same top bar structure:

- Left: service icon tile plus product name.
- Right: cross-service links first, account or page actions second.
- No center navigation unless a service genuinely needs a persistent section switcher.
- No duplicate links that point to the current page.

Use `CleGridShell` when possible. It forwards `topLinks`, `topbar-actions`, and a custom `icon` slot to `CleTopBar`. Use `CleTopBar` directly only for highly custom layouts.

Service identity should be passed with a semantic icon name, not hand-built per app:

| Service | Icon |
| --- | --- |
| Case Law Explorer | `explorer` |
| Database Workbench | `database` |
| Access / Rate Limit Admin | `access` |
| Citations API | `api` |
| Shared Auth | `auth` |

`CleGridShell` sets the favicon from the same `icon` value. Apps that do not use the shell should call `setCleFavicon(icon)` on client mount.

## Two Surfaces: Entry Pages and Consoles

The library covers two page families, and they deliberately look different.

**Entry pages** — public front doors, sign-in, service landing. Use `CleGridShell`.
Expressive: display-scale `--cle-text-h1`, the 32px grid backdrop, generous
whitespace, one clear action. Constrained to `--cle-page-max`.

**Consoles** — admin tooling used repeatedly by signed-in staff. Use `CleAppShell`.
Dense and quiet: fixed sidebar navigation, `--cle-console-title` (1.5rem) page
titles, flat `--cle-shadow-sm` cards, no grid backdrop, width up to
`--cle-console-max`. A console must never open with a marketing hero; the
first screenful belongs to data and controls.

Do not mix the two. A hero headline inside a console wastes the fold, and a
sidebar on a landing page reads as a leaked internal tool.

## Console Structure

- One control per navigation axis. The sidebar answers *which record* (which
  project, which dataset) and holds top-level destinations; tabs answer *which
  section of that record*. Never render the same destinations as both sidebar
  entries and tabs — that is the duplication to avoid, not the two axes.
- Sections are routes, not local state, so URLs are linkable and Back works.
  `CleNavItem` and `CleTab` take an `as` prop for framework link components
  (`:as="NuxtLink"`); remaining attributes forward to it.
- Creation and editing belong in `CleModal`, not in a form permanently parked
  beside the table it feeds.
- Destructive actions go through `CleConfirmDialog`, never `window.confirm`.
- Outcomes report through `useCleToasts`, not inline banners that shift layout.
  Reserve `CleCallout` for persistent state (misconfiguration, empty setup),
  not transient results.
- Tables use `loading` for skeleton rows, `numeric` for counts, and `actions`
  for the trailing button column.

## Forms

Wrap every control in `CleField` for the label, hint, and error slot. Use
`CleInput`, `CleSelect`, `CleTextarea`, `CleSwitch`, and `CleTagInput`.

`CleTagInput` replaces comma-separated text areas for scope and endpoint
lists — it shows what is committed, offers `suggestions`, and removes the
"did my spacing matter?" question entirely.

## Component Rules

- Cards use 8px radius.
- Buttons use 6px radius and 44px minimum height.
- Letter spacing stays at `0`, except small uppercase eyebrow labels.
- Do not add same-page nav links unless the page is long enough that they are useful.
- Prefer plain product links in the bars and keep service-specific actions in the main content.
- Use `CleServiceIcon` or the `icon` prop rather than creating one-off logo tiles.

## Suggested Footer Links

Use service env/config to populate these where possible:

- BISS Institute
- Maastricht University Law & Tech Lab
- Citations API
