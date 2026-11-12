# Hosting BISS UI documentation

Public URL: https://bissui.wicker.life

The documentation is a separate static Coolify application on wicker-01
(`195.201.108.244`). It serves the component library, guides, source-derived APIs,
reference screenshots and interactive examples. No database, authentication,
application secrets or server-side rendering is required.

## Deployment

- Repository: `MaastrichtU-BISS/caselaw-ui`.
- Branch: `feature/biss-ui`.
- Coolify application: `biss-ui-docs` (`lblr1jhrcdzzzmkl3baostot`), in the Personal project.
- Build: `Dockerfile.docs` in the repository root, Node 22 with `npm ci` and
  `npm run docs:build`.
- Runtime: nginx, internal port 80, with `deploy/docs.nginx.conf`.
- Domain: `bissui.wicker.life`, one A record to wicker-01 in Hetzner DNS.
- TLS: automatic through Coolify's Traefik proxy.
- Health: `GET /healthz`, checked by the container's Docker health check.
- Updates: after the Library checks workflow passes, its deployment job sends a
  signed push event to Coolify. Other branches and pull requests do not deploy
  this app. The repository secret `BISS_UI_DOCS_WEBHOOK_SECRET` matches this
  app’s manual GitHub webhook secret; no Coolify API token is stored in GitHub.

This branch is intentional: caselaw-ui's `main` and npm release stream remain
independent. Updating the website does not publish a package. Change the deployed
branch only when the BISS UI release line moves deliberately.

HTML is revalidated on each visit; hashed assets are cached for a year. Hash
routes (`/#/components/data-grid`) work without a server-side SPA fallback.
`preview.html` serves the isolated live component examples from the same origin.

## Validate and roll back

```sh
npm run docs:typecheck
npm run docs:build
npm run docs:check
curl --fail https://bissui.wicker.life/healthz
```

The docs check verifies all 130 component pages and 300 screenshot references,
mobile navigation, live examples and accessibility. Before deploying component or
style changes, refresh screenshots using the workflow in [README.md](README.md).

Use Coolify's deployment history to redeploy the previous successful commit if
needed. The application is static and has no persistent data to migrate.
