# Zag Science — Converter tip + native widget calendar rollover

Includes the latest illustrated weight converter tip and set completion changes.

Native files to REPLACE in their corresponding repository paths:
- `native-widget/ZagWidgetPlugin.swift`
- `zag_widget_starter/ZagStrengthWidget/ZagStrengthWidget.swift`
- `index.html`
- `assets/images/tip-10-weight-converter.png`
- `assets/images/info-page-1-key-features-new.png`

## Widget change
App sync now sends the streak snapshot (date, last workout, weekly rest allowance and consumed rest days) to the App Group. WidgetKit projects streak state across subsequent calendar days, independently of app launch, and requests a timeline reload after the next midnight. It only marks *past* days missed, not the current day. Workout completion still forces an immediate sync.

## Important caveats
- WidgetKit refresh timing is managed by iOS; midnight refresh is requested but not guaranteed.
- The app's existing streak policy is **weekly rest-day allowance**, not fixed scheduled weekdays. The widget follows that policy.
- The extension can project only from the last successful sync and the latest recorded workout date. App launch reconciles full history.
- Native Swift has NOT been compiled in Xcode or tested on device. Check Codemagic and TestFlight before releasing.
- Native widget source requires existing Xcode target and App Group wiring; this ZIP does not install a missing widget target.
