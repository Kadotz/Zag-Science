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
            "exercises": store.stringArray(forKey: "zag_widget_exercises")?.count ?? 0,
            "records": storedRows?.count ?? 0
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
        // Do not erase a populated widget history during an early app-load sync.
        // The web app can briefly report zero rows before its state is hydrated.
        let previous = store.data(forKey: "zag_widget_workouts")
        let previousRows = previous.flatMap { try? JSONSerialization.jsonObject(with: $0) as? [Any] }
        let keepPrevious = rows.isEmpty && (previousRows?.isEmpty == false)
        if !keepPrevious { store.set(data, forKey: "zag_widget_workouts") }
        store.set(pro, forKey: "zag_widget_is_pro")
        if !keepPrevious { store.set(exercises, forKey: "zag_widget_exercises") }
        store.synchronize()
        WidgetCenter.shared.reloadAllTimelines()
        NSLog("[ZagWidgetPlugin] sync pro=%@ exercises=%ld workouts=%ld", pro ? "YES" : "NO", exercises.count, rows.count)
        call.resolve(["bridge": "capacitor-plugin", "pro": pro, "exercises": exercises.count, "records": rows.count])
    }
}
