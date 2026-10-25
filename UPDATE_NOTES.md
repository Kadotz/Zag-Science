# Zag Science — follow-up feedback patch (provisional)

Built from the user's exact uploaded `index(20261025-162418).html`.

## Code changes
- Suppressed guide counter and replaced first guide artwork with the approved Key Features image.
- Remember expanded Maxes sections across tab changes in the current app session.
- Adjusted previous-value tap handling with a 410ms double-tap window. iOS WebKit keyboard focus must be tested: delayed programmatic focus may not display the keyboard due to user-gesture restrictions.
- Changed Groups loading to display immediately, added a 9-second timeout for initial profile loading, and invalidated outdated Groups requests when switching tabs. Further Supabase calls may still hang; live testing required.
- Prevented the old Groups boot CSS from hiding the entire screen.
- Included manual PB override metadata in exported backups and cleared newer overrides on legacy import; stored pre-import rollback in localStorage.
- Improved Next Exercise animation duration and sticky logo offset.
- Graph time windows now anchor to latest dated workout rather than current date (to make historical tests usable). This changes the interpretation of 'Last month' when there are no recent workouts.

## NOT FULLY RESOLVED — do not treat as release-ready
- The **Key Features** first-page artwork has now been replaced with the user-approved purple flask version. The other four guide pages remain unchanged.
- Graph's historical PB readings are sourced from completed history, not manually changed Maxes. A manual PB edit does not rewrite historical workouts. A separate correction review is needed for bad historical records.
- Cloud synchronisation after restoring an old backup needs a server-side conflict/restore policy. Local restore alone cannot guarantee that remote data won't replace the imported snapshot.
- Groups, iOS keyboard behaviour, smooth scrolling, backup import/export, and all graph time windows require iPhone testing.
- No live Supabase/StoreKit or iOS execution performed.

Keep a separate export of your data and do not delete the app while testing.
