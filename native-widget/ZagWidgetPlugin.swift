import Foundation
import Capacitor
import WidgetKit

// Registered through Capacitor's packageClassList. No custom storyboard or WKScriptMessageHandler.
@objc(ZagWidgetPlugin)
public class ZagWidgetPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ZagWidgetPlugin"
    public let jsName = "ZagWidget"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "sync", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise)
    ]

    private let suite = "group.com.zagscience.app"

    @objc public func status(_ call: CAPPluginCall) {
        guard let store = UserDefaults(suiteName: suite) else {
            call.reject("App Group unavailable: " + suite)
            return
        }
        let storedRows = store.data(forKey: "zag_widget_workouts").flatMap { try? JSONSerialization.jsonObject(with: $0) as? [Any] }
        call.resolve([
            "bridge": "capacitor-plugin",
            "pro": store.bool(forKey: "zag_widget_is_pro"),
            "widgetAccessFilePro": (FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: suite)
                .flatMap { try? Data(contentsOf: $0.appendingPathComponent("zag-widget-access.json")) }
                .flatMap { try? JSONSerialization.jsonObject(with: $0) as? [String: Any] })?["pro"] as? Bool ?? false,
            "exercises": store.stringArray(forKey: "zag_widget_exercises")?.count ?? 0,
            "records": storedRows?.count ?? 0,
            "widgetDiagnostic": store.string(forKey: "zag_widget_diagnostic") ?? "Widget has not reported yet"
        ])
    }

    @objc public func sync(_ call: CAPPluginCall) {
        guard let rows = call.getArray("records") as? [[String: Any]] else {
            call.reject("Missing records array")
            return
        }
        guard let data = try? JSONSerialization.data(withJSONObject: rows) else {
            call.reject("Invalid workout records")
            return
        }
        guard let store = UserDefaults(suiteName: suite) else {
            call.reject("App Group unavailable: " + suite)
            return
        }
        let pro = call.getBool("pro") ?? false
        var names = Set<String>()
        for row in rows {
            guard let by = row["by"] as? [String: Any] else { continue }
            for (name, raw) in by {
                let value: Double
                if let number = raw as? NSNumber { value = number.doubleValue }
                else if let string = raw as? String { value = Double(string) ?? 0 }
                else { value = 0 }
                if value.isFinite && value > 0 { names.insert(name) }
            }
        }
        let exercises = names.sorted()
        store.set(data, forKey: "zag_widget_workouts")
        let wasPro = store.bool(forKey: "zag_widget_is_pro")
        store.set(pro, forKey: "zag_widget_is_pro")
        // Commit entitlement to shared disk before notifying WidgetKit.
        if let folder = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: suite) {
            let accessFile = folder.appendingPathComponent("zag-widget-access.json")
            let accessPayload: [String: Any] = ["pro": pro, "updatedAt": Date().timeIntervalSince1970]
            if let accessData = try? JSONSerialization.data(withJSONObject: accessPayload) {
                do { try accessData.write(to: accessFile, options: .atomic) }
                catch { NSLog("[ZagWidgetPlugin] access snapshot write failed: %@", String(describing: error)) }
            }
        }

        if !pro {
            store.set("FREE: widget locked by Zag Pro entitlement", forKey: "zag_widget_diagnostic")
        } else if !wasPro {
            store.set("PRO: refreshing widget graph", forKey: "zag_widget_diagnostic")
        }
        // Snapshot allows the widget extension to advance calendar state without launching the app.
        if let snapshot = call.getObject("streakSnapshot"),
           let snapshotData = try? JSONSerialization.data(withJSONObject: snapshot) {
            store.set(snapshotData, forKey: "zag_widget_streak_snapshot")
        }
        store.set(max(0, call.getInt("streakCount") ?? 0), forKey: "zag_widget_streak_count")
        let streakState = call.getString("streakState") ?? "rest"
        store.set(["active", "rest", "lost"].contains(streakState) ? streakState : "rest",
                  forKey: "zag_widget_streak_state")
        store.set(exercises, forKey: "zag_widget_exercises")
        store.synchronize()
        WidgetCenter.shared.reloadTimelines(ofKind: "ZagStrengthWidget")
        WidgetCenter.shared.reloadAllTimelines()
        NSLog("[ZagWidgetPlugin] sync pro=%@ exercises=%ld workouts=%ld", pro ? "YES" : "NO", exercises.count, rows.count)
        call.resolve(["bridge": "capacitor-plugin", "pro": pro, "exercises": exercises.count, "records": rows.count])
    }
}
