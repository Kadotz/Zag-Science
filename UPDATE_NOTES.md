# Zag Science — scroll and zero-weight correction

- Next Exercise now expands the destination card first, scrolls smoothly while the previous card remains expanded, then collapses the previous card after it leaves the viewport. Scroll position is compensated for the collapse.
- Allows 0 kg for any exercise with at least 0.5 reps; still rejects negative weight, blank weight, and zero reps.
- Native iOS widget refresh when the app is closed is NOT fixed by this HTML-only patch. Requires widget extension Swift timeline / App Group storage changes. The current JavaScript widget bridge only syncs when the app runs.
- No actual iOS device test performed. Test both orientations, especially near the end of a workout.
