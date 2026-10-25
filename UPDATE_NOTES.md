Zag Science — navigation and tutorial follow-up (2026-10-25)

Included:
- Restores expanded workout exercise cards and Extras when switching between tabs.
- Keeps existing Maxes expanded-state behaviour.
- Separates Next Exercise scrolling calculations/timings for landscape and portrait; avoids competing same-tab scroll restoration.
- Uses consistent tutorial slide sizing and reduces first-page lighting intensity while preserving its exact image text and artwork.

Verification: 12/12 Node tests passed, all 52 inline JavaScript sections passed Node syntax checks.

Not yet fully addressed: persistence of a specific opened online Group and its inner tabs. This requires careful changes to asynchronous group loading, and is not claimed as fixed. iPhone landscape scrolling and visual appearance still need TestFlight verification. Existing assets from your repository remain necessary.
