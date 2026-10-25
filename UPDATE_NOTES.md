# Zag Science — TestFlight feedback fixes (candidate)

Based on the prior Updated Three Tips package. Replace the files at the same relative paths; keep all other existing assets and native files.

## Implemented
- Double-tap previous value: intercept second touch before keyboard focus, fill and blur. Single tap retains normal editing.
- Separate Home guide from Tips: GUIDE counter and original five guide slots, removing Widget guide slide. Widget and graph remain in Tips & Tricks.
- Remove streak reminder diagnostic/test/repair buttons (actual scheduling preserved).
- On a genuine higher completed PB, clear stale manual PB override so the new PB isn't overwritten later.
- Include all programmed/maxed exercises in strength graph selector, even without history.
- Period graph can use first in-period reading as baseline when no earlier reading exists and at least two readings exist.
- Offline Groups: show immediate connectivity message; ignore delayed group load results after navigation.
- Backup export uses iOS share sheet when supported, falling back to a downloaded JSON. Import validates essential structure and requires confirmation.
- Smooth Next Exercise scroll with a timed animation and header offset.
- Historical-set review logic from prior version preserved.

## Requires TestFlight verification / remaining risks
- Native iOS file sharing and restore require device testing; exporting to Files requires choosing Save to Files in the share sheet.
- iOS double-tap keyboard interaction requires on-device verification.
- Graph periods with fewer than two readings legitimately cannot show a trend; historical date parsing and per-period baselines need verification against actual data.
- PB sync across Supabase and all workout contexts needs on-device testing, particularly manual corrections vs genuine PBs.
- Groups async paths other than main group list may still need navigation race protection.
- All six prior improvements, StoreKit purchase verification and notification reliability are not fully covered by automated tests.
- Do not uninstall the existing app or reset local data before confirming backup export/recovery.

12 automated tests and 52 embedded JavaScript syntax checks passed in the development environment.
