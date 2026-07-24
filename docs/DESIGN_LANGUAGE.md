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

## Component Rules

- Cards use 8px radius.
- Buttons use 6px radius and 44px minimum height.
- Letter spacing stays at `0`, except small uppercase eyebrow labels.
- Do not add same-page nav links unless the page is long enough that they are useful.
- Prefer plain product links in the bars and keep service-specific actions in the main content.

## Suggested Footer Links

Use service env/config to populate these where possible:

- BISS Institute
- Maastricht University Law & Tech Lab
- Citations API
