---
name: testing-angular-spa
description: How to build, serve and end-to-end test the DemoSPA Angular SPA (bstraehle/angular-spa) locally, including the no-backend golden paths and known pre-existing quirks.
---

# Testing the DemoSPA Angular SPA

## Toolchain
- Angular CLI rejects the default node on PATH (20.x). Always run first:
  `source ~/.nvm/nvm.sh && nvm use 22.12.0`
- Install: `npm install` (or `npm ci` — useful as a lockfile-integrity check after any
  dependency/`overrides` change, since it fails loudly on bad integrity hashes).
- Build: `npm run build` → output `dist/demo-spa/browser`.
- Tests: `CHROME_BIN=$(ls -d /opt/.devin/chrome/chrome/linux-*/chrome-linux64/chrome | head -1) npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox`.
  The repo has **zero** `.spec.ts` files, so `Executed 0 of 0 SUCCESS` is the expected
  pass — never cite this as functional evidence; always test in the browser too.
- Pre-existing build warnings: `NG8107` optional-chaining diagnostics in
  `add.component.html` / `update.component.html`. Ignore them.

## Two ways to serve
- Production-equivalent (preferred for evidence): `npm run build && docker build -t spa-image . && docker run -d -p 8080:80 spa-image` → http://localhost:8080
- Dev server: `npx ng serve` → http://localhost:4200

**Important:** the `Dockerfile` is stock nginx with no SPA `try_files ... /index.html`
fallback, so **deep links 404 on :8080** (`/demo/list` returns 404 on a hard load). Load
`/` and navigate by clicking links; if you must deep-link into a route (e.g.
`/demo/update/:id`), use the dev server on :4200 instead. This is a long-standing repo
trait, not a regression — but if you ever see route 404s, check this first.

## Dependency-only PRs (`overrides` bumps for Dependabot alerts)
Verify at three levels:
1. `npm ls <pkg>` shows `<pkg>@<version> overridden`; `grep -c '<pkg>-<oldversion>' package-lock.json` is 0.
2. `npm ci` + `npm run build` succeed (the Angular CLI parses JSON schemas via
   `ajv`/`fast-uri`, so build-tool dep breakage surfaces here).
3. Browser golden paths on the built bundle (below) — proves the emitted bundle still boots.

## Golden paths (no backend required)
The .NET API (`environment.DemoAPIhost` = `http://host.docker.internal:8001`) is usually
not running locally, so all HTTP calls fail. That is fine and expected — assert the app
loads, routes, validates and does not white-screen.
- Routes (`src/app/app-routing.module.ts`): `/`, `/demo/list`, `/demo/view/:id`,
  `/demo/add`, `/demo/update/:id`, `/demo/delete/:id`, `/privacy`, `/error/:msg`.
- Home: `Hello, World!` heading.
- Nav "Demo" → `/demo/list`: `List` heading + `Id | Name | Action` table headers, empty
  body (`getDemos()` has no `catchError`, so the failure just logs).
- "Add" link → `/demo/add`. Best discriminating test = client-side validation
  (`[disabled]="!addForm.valid"`, `required` + `min=1`):
  - clear `Id` → red alert "Value must be greater than or equal to 1."
  - clear `Name` → red alert "Please fill out this field."
  - `Id=1` + non-empty `Name` → alerts clear and the `Add` button becomes enabled.
  Note errors only render when the control is dirty/touched, so type-then-clear (Ctrl+A,
  Delete) rather than just blurring an untouched field.
- Clicking `Add` with the API down navigates to `/demo/list` (see `add.component.ts`).

## Known pre-existing quirks (report, don't "fix" while testing)
- `demo.service.ts` `handleError` does `errObj.error.Result` and then
  `router.navigate(['error', undefined])`. For connection-level failures there is no
  `Result`, producing a console `RuntimeError: NG04008: The requested path contains
  undefined segment at index 1` and leaving the user on the current page instead of
  `/error/:msg`. Expect this on `/demo/update/:id`, `/demo/view/:id`, `/demo/delete/:id`
  whenever the backend is down. It might be a real bug when the API returns a
  non-JSON/opaque error; a full end-to-end error-page check needs the .NET API running.
- Acceptable console noise with no backend: the app's own `console.log` of the
  `HttpErrorResponse` (minified to something like `Kr` in prod builds) and
  `net::ERR_*` for `host.docker.internal:8001`. Anything about module/chunk loading or
  Angular bootstrap is a real failure.

## Devin Secrets Needed
None — no authentication is involved; the SPA has no login.
