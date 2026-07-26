---
name: testing-angular-spa
description: How to build, test, and run the bstraehle/angular-spa Angular 21 SPA locally for end-to-end verification (dependency bumps, UI smoke tests).
---

# Testing the angular-spa repo

## Node version
The repo's Angular 21 CLI requires Node >= 20.19 / 22.12. The box default (`node v20.18.1`) is
below the minimum and `ng` will refuse to run. Always start with:

```bash
source ~/.nvm/nvm.sh && nvm use 22.12.0
```

## Build

```bash
npm ci          # ~5s
npm run build   # emits dist/demo-spa/browser
```

Expect pre-existing `NG8107` optional-chain warnings from `add.component.html` and
`update.component.html` — they are not regressions.

## Unit tests

The repo currently has **zero `.spec.ts` files**, so karma reports `Executed 0 of 0` and karma may
exit non-zero on "no tests". This is expected, not a failure.

```bash
CHROME_BIN=/opt/.devin/chrome/chrome/linux-137.0.7118.2/chrome-linux64/chrome \
  npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox
```

(The `ChromeHeadlessNoSandbox` custom launcher is defined in `karma.conf.js`.)
If the chrome path above no longer exists, find one with `ls /opt/.devin/chrome/chrome/`.

## Running the app

Docker is available on the box and is the closest match to production (nginx serving the static
bundle). The `Dockerfile` copies `dist/demo-spa/browser`, so **build first**:

```bash
npm run build
docker build -t spa-image .
docker run -d --name spa -p 8080:80 spa-image
# http://localhost:8080
```

If docker is unavailable, `npx ng serve` is the fallback.

### Backend
The app talks to a separate .NET REST API (`environment.DemoAPIhost` in `src/environments/`).
That backend is normally **not running** in a Devin box, so:
- `/demo/list` renders the `List` heading + table header + `Add` link with **zero rows** — this is
  the expected empty state, not a bug.
- The browser console shows exactly one `Log` entry from `main-*.js`. That is the app's own
  `console.log(err)` in `src/app/demo/list/list.component.ts`. Do not report it as a bundle error.
- Detail/add/update/delete routes call `handleError` which redirects to `/error/:msg`, so CRUD
  flows cannot be verified without the backend. Say so explicitly rather than skipping silently.

## UI routes (from `src/app/app-routing.module.ts`)
`/` (Hello, World!), `/privacy`, `/demo/list`, `/demo/view/:id`, `/demo/add`,
`/demo/update/:id`, `/demo/delete/:id`, `/error/:msg`. Navbar links (from `app.component.html`):
brand `DemoSPA` → `/`, `Demo` → `/demo/list`, `Privacy` → `/privacy`.

## Verifying dependency / `overrides` bumps
This repo pins security fixes via the `overrides` block in `package.json`. To prove an override
actually took effect (rather than being silently ignored), check the installed tree, not just the
lockfile:

```bash
npm ls <pkg> --all | grep -o "<pkg>@[0-9.]*" | sort -u
```

A single line matching the pinned version = override applied. Multiple versions = a stale copy
survived.

For audit posture, parse the JSON rather than eyeballing the text output:

```bash
npm audit --json > /tmp/audit.json
python3 -c "import json;d=json.load(open('/tmp/audit.json'));print(d['metadata']['vulnerabilities'])"
```

Known long-tail: a large number of `high` findings can all cascade from a single advisory (e.g.
brace-expansion `GHSA-mh99-v99m-4gvg` fanning out through minimatch/glob/karma/@angular/build).
Group findings by advisory URL before claiming a regression. A pre-existing **low** `body-parser`
finding (`GHSA-v422-hmwv-36x6`) is also present and unrelated to override changes.

## Devin Secrets Needed
None — everything runs locally with no credentials.
