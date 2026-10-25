# Zag Science — Point 6: source tests and GitHub Actions

This is built on the Point 5 version. **index.html and the existing tip image are copied unchanged.** No refactoring or user-data migration is performed.

## Installation
Copy these files into the root of your GitHub repository, preserving paths:
- `index.html` and `assets/images/tip-01b-previous-values.png` (unchanged from Point 5; optional if already installed)
- `tests/app.test.cjs` (new)
- `.github/workflows/verify.yml` (new)
- Update the existing `package.json` test script (see below)

**IMPORTANT: Do not overwrite your existing package.json.** Your real repository already has a Capacitor package.json: add `"test": "node --test tests/*.test.cjs"` to its existing `scripts` object. Keep all your current dependencies and Codemagic scripts. If a test script exists, replace only that script's value. Do not copy the example package.json into your repository.

Run `npm test` locally; GitHub Actions automatically runs it on pushes and pull requests. No new npm dependencies required.

## Scope and limits
The tests exercise selected actual functions extracted from `index.html` and include static invariants for cloud backup ordering, graph cohort and test-mode guard. They do **not** test real Supabase permissions, iOS background lifecycle, TestFlight widgets, cloud concurrency, or the StoreKit purchase flow. Passing tests does not prove that every app feature works. They should be supplemented with device tests before release.

The source extractor is intentionally scoped to known simple functions; update it if those functions are converted to complex template-literal code.

**Security warning:** The current TestFlight source includes a JavaScript Pro override. A source-code comment is NOT a production safeguard; the public release must exclude this code using a verified build process and native/server purchase verification.
