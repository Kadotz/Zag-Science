ZAG SCIENCE — 30 OCT 2026

Copy index.html to the repository root and copy the PNG files into assets/images/ (preserve names and folders).
Do not delete the original JPG files. Existing user data/localStorage, workouts and cloud sync logic are retained.

Fixes:
- Restored visible Guide and Tips popup borders, X, previous/next buttons (real UI controls).
- Replaced 5 Guide and 11 Tips artwork references with transparent PNG versions. GOAT explanation is black artwork by design.
- Tips navigation stops at first and last tip (does not wrap).
- ALL fills only wholly blank prescribed rows; skips partially typed/completed/optional rows, no guessed values, and avoids re-rendering the form.
- Single-set completion requires manually valid weight/reps; will not silently insert targets.
- Max Save shows exercise, weight, reps, date and time.
- After successful sign-in, welcome dialog links to Guide, Tips and Workout Info.

QA: Node test suite passed (12/12); 54 inline scripts syntax checked.
Requires an actual iPhone/TestFlight run to validate CSS layouts, tap targets, and ALL button against real workout data.
