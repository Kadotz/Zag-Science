ZAG SCIENCE — ZAG PRO iOS HOME SCREEN WIDGET STARTER

This is native WidgetKit source, NOT an installed or working widget yet.
The existing project generates ios/App during Codemagic builds. Integrating the
widget therefore requires a repeatable Xcode target-generation step after cap sync.

Required integration work:
1. Add a WidgetKit extension target to ios/App/App.xcodeproj (bundle ID
   com.zagscience.app.StrengthWidget), embed it in the main App target, and sign it.
2. Enable the same App Group, group.com.zagscience.app, for BOTH targets in
   Apple Developer capabilities, provisioning profiles and entitlements.
3. Add a native Capacitor bridge that writes 'zag_widget_is_pro' (Boolean),
   'zag_widget_points' ([Double]), and 'zag_widget_change' (Double) to
   UserDefaults(suiteName: "group.com.zagscience.app").
4. Source those values from the REAL History strength-series calculations.
   Do not send invented sample data. Revoke pro status when entitlement expires.
   The Swift placeholder's sample values are preview-only.
5. Call WidgetCenter.shared.reloadTimelines(ofKind: "ZagStrengthWidget")
   after shared values change. iOS controls actual refresh frequency.
6. Register zagscience://history as a deep link and route it to History.
7. Test signing, installation, locking/unlocking, and graph values on TestFlight.

Important: Do not treat a JavaScript-side pro flag as secure proof of subscription.
Validate access through the app's existing verified entitlement system. The
widget reads the last verified state from shared storage; revoke it promptly.

The original codemagic.yaml is deliberately NOT replaced: no verified native
target creation/signing has been completed. Adding untested build steps could
break your current TestFlight pipeline.

CUSTOMISABLE WIDGET UPDATE
- Long press widget > Edit Widget: Exercise, Time period, Graph interval.
- Exercise options: Overall strength + exercise names published to App Group UserDefaults
  key zag_widget_exercises ([String]).
- Time periods: 1, 3, 6, 12 months, all time.
- Intervals: every workout, daily, weekly, monthly.
- AppIntentConfiguration replaces StaticConfiguration (requires iOS 17+).
- App Group key zag_widget_history must contain UTF-8 JSON DATA (not a string)
  with an array of objects {"exercise":"Bench Press Flat", "timestamp":"2026-10-21T19:00:00Z",
  "value":80.0, "workoutId":"session-123"}.
  Include every completed working set, use the exact strength measure used by the
  in-app graph, and use the same exercise names in zag_widget_exercises.
- Native bridge should update these keys and call WidgetCenter.shared.reloadTimelines.
- Widget filters and aggregates records locally; no rest-day zero points.
- The widget is still a starter until the bridge, entitlement verification,
  WidgetKit target, App Group signing and TestFlight testing are completed.
