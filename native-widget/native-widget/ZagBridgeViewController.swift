import UIKit
import WebKit
import Capacitor
import WidgetKit

// This subclass is installed into Capacitor's Main.storyboard by the build script.
class ZagBridgeViewController: CAPBridgeViewController, WKScriptMessageHandler {
    override func viewDidLoad() {
        super.viewDidLoad()
        webView?.configuration.userContentController.add(self, name: "zagWidgetSync")
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "zagWidgetSync", let payload = message.body as? [String: Any],
              let records = payload["records"] as? [[String: Any]],
              let data = try? JSONSerialization.data(withJSONObject: records) else { return }
        let defaults = UserDefaults(suiteName: "group.com.zagscience.app")
        defaults?.set(data, forKey: "zag_widget_workouts")
        // This is only a TestFlight development toggle, NOT purchase validation.
        defaults?.set(payload["pro"] as? Bool ?? false, forKey: "zag_widget_is_pro")
        // WKWebView bridges JSON numbers as NSNumber. Read the dictionary as
        // [String: Any] so the exercise list isn't silently emptied by a cast.
        let exercises = Set(records.flatMap { record -> [String] in
            guard let values = record["by"] as? [String: Any] else { return [] }
            return values.compactMap { name, raw in
                guard let number = raw as? NSNumber, number.doubleValue > 0 else { return nil }
                return name
            }
        })
        defaults?.set(exercises.sorted(), forKey: "zag_widget_exercises")
        WidgetCenter.shared.reloadTimelines(ofKind: "ZagStrengthWidget")
    }
}
