# Zag Science — Phase 2: exercise names, per-position weeks, temporary swaps

Built on commit `27a0b0a` ("Zag Science v107", branch `ios-development`).

## Files changed
- `index.html` — all app changes (one new "ZAG data layer v4" block plus edits to the Workout page, split editor, backup export and cloud name handling).
- `tests/data-layer.test.cjs` — new, 16 automated tests (run by `npm test` and GitHub Actions).
- `tests/e2e/phase2.e2e.cjs` — new, browser run of the whole app (needs Playwright; not part of `npm test`).
- `PHASE_2_NOTES.md` — this file.

- `assets/images/tip-transparent-13.webp`, `assets/images/tip-transparent-14.webp` — new Tips & Tricks pages ("It's supposed to be brutal" and "Set it. Flip it. Lift it."), added at the end of the sequence.

- `zag_widget_starter/ZagStrengthWidget/ZagStrengthWidget.swift` — three small lines so the new Bodyweight series is selectable in Edit Widget but never counts towards "Overall strength". NOT compiled or tested here.

No Codemagic, Capacitor or package file was changed, and no existing image was changed.

## Bodyweight (added 13 Nov)
- Saving a bodyweight shows a pop-up with the new weight, date and time.
- Every saved weigh-in is kept with its date (`st.bodyweightLog`, one entry per day). The log starts from the weight already saved, dated when it was last saved.
- History graph: new "Bodyweight" option, in the chosen unit, with the same time-period filter.
- History graph: "Show bodyweight on this graph" toggle draws bodyweight as a white line on the strength graph, as change since the start of the period (same scale as strength). The setting is remembered.
- Widget: bodyweight is sent as its own "Bodyweight" series and appears in the Edit Widget exercise list.

## What changed in the app
1. **Four names merged**: Deadlifts → Deadlift, Dumbbell Flat Press → Dumbbell Flat Chest Press, Cable Fly → Cable Chest Fly, Pin Machine Cable Fly → Pin Machine Chest Fly (library, splits, maxes, reps, PB events, history, drafts, graphs, group lists).
2. **Weeks belong to positions, linked across days of the same kind** (updated 19 Nov). Days whose names match apart from the number (Pull 1/Pull 2, Chest 1/Chest 2, Shoulders 1/2, Push 1/2, both Arms, both Legs) share a week at every position where they have the same exercise. Finishing either day moves the shared positions on both; positions with a different exercise move only with their own day. Week 8 wraps to Week 1. The week selector and the realign prompt change linked positions too.
   - Pull: exercises 2, 3, 5 shared by all four Pull days; exercises 1 and 4 shared by the two Pull 1 days, and separately by the two Pull 2 days.
   - Chest: exercises 1-4 shared; exercise 5 (Decline on Chest 1, Incline on Chest 2) separate.
   - Push: only exercise 3 (Pin Machine Lateral Raise on both) is shared.
   - Arms, Legs, Shoulders: whole day shared.
   - Re-ordering a day changes which positions match; a newly matched position takes the week of the first matching day in the split.
3. **Workout-page swaps are temporary.** They use the position's week and the substitute's own max, are recorded under the exercise performed, survive tab changes and restarts, and clear when that day is finished. The Replace dialog offers "Back to planned".
4. **Chest 1 exercise 3** is put back to Cable Chest Fly once, on The Goat Split only, where a swap had displaced it.
5. **Shoulders 2 exercise 2 is now Dumbbell Seated Side Raise**, so both Shoulders days are identical (existing installs on The Goat Split are changed once; Dumbbell Side Raise keeps its own data and stays as an alternative).
6. **Shoulders alternatives**: Dumbbell Side Raise and Cable Side Raise added to Shoulders 1; Dumbbell Seated Side Raise and Cable Side Raise added to Shoulders 2; Cable Side Raise added to Push 1 and Push 2.
7. **Old names arriving from Supabase or a backup import** are converted on arrival.

## Migration (runs on first launch of this build, and again harmlessly on every launch)
- A safety copy of the saved data, exactly as it was, is stored on the phone under `zagScienceBackupBeforeDataV4` and included in Export Backup.
- Maxes: for the three names that were still selectable (Deadlifts, Dumbbell Flat Press, Pin Machine Cable Fly) the stronger record wins (heavier weight, then more reps). A manual max edit travels with the winning record.
- Retired pre-September names never override the current name's max; they are used only if the current name has none.
- PB events from both names are combined. History keeps every date, weight and rep; only the exercise label changes.
- Weeks: each position starts on the week it showed before the update.
- A swap that was in progress becomes a temporary swap.

## Old alias audit
Merged as plain renames: Close Pulldown B/R, Wide Pulldown B/R, Advanced Lat Pull Down, Shoulder Smyth Press, Shoulder Smyth Machine, Lateral Raise Pin, Cable Fly Pin, Pin Shoulder Blue, Close Grip Shoulder Machine Blue, Close Grip Shoulder Red, Front Raise Cable, Stand Square BB Shoulder, Arnold DB, Incline Smith, Incline Smyth, Bench, Upward cable fly, Upward Cable Fly, Dumbell Flat, Rear Delt Machine, Dumbell Side Raise, Tri Dips, DB Preacher Curl, Rope Curl, Single Rope Extension, Single Cable Curl, Single Spider, Double Rope Extension, Sitting Calfs, Lying Curl, Siting Hammy Curl, Sitting Hammy Curl.

Kept separate (data stays under the old name): Cable Side Raise, Free Weight Row, Single Lat Raise Pin, Chest pin red / blue / incline, Front raise db / plate, Db press / bench, Cable Fly / pin, Lateral Raise / pin, Uni Press / Leg Press, DB Press, Decline Machine Press, Decline Chest Machine, Incline Chest Machine, Bicep Machine, Tri EZ Extension, Press Calf, Stiff Deads, Leg Extension (R).

The old v3 migration no longer copies values. Maxes it copied in September are left in place.

## Tested
- `npm test`: 28/28 (12 existing + 16 new).
- Browser run (`tests/e2e/phase2.e2e.cjs`): 94/94 checks across fresh install, upgrade of an old install, swap lifecycle and split editing.
- All 53 inline scripts parse.

## Not tested
- On an iPhone or in TestFlight.
- Against live Supabase (cloud PB sync, cloud restore, group leaderboards).
- The widget (unchanged; a widget set to one of the old names needs its exercise re-picked once).

## Outstanding
- Old-name rows remain in Supabase `personal_bests`; the app folds them on read. A one-off server clean-up should follow once the schema is reviewed.
- Reloading while on History or Settings gives a blank page (older bug, logic audit).

## Later fixes (13 Nov)
- Tips: the Weight Converter page was listed twice (`tip-transparent-10.webp` and `tip-transparent-11.webp` are the same image). The second entry is removed from the sequence; the file itself is left in place.
- Day editor (Edit Split → Edit exercises in a day): × on a main exercise now moves it to the top of Extras instead of deleting it; extras show ＋, which moves the exercise to the end of the day's main exercises. Dragging still works.
