import UIKit
import WebKit
import Capacitor
import WidgetKit

// This subclass is installed into Capacitor's Main.storyboard by the build script.
class ZagBridgeViewController: CAPBridgeViewController, WKScriptMessageHandler {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Capacitor may create the WKWebView after viewDidLoad. Register once
        // it exists and request a fresh payload when the app becomes active.
        registerWidgetHandler()
        NotificationCenter.default.addObserver(self, selector: #selector(refreshWidgetData), name: UIApplication.didBecomeActiveNotification, object: nil)
        for delay in [0.5, 1.5, 3.0, 6.0, 10.0, 20.0, 40.0] {
            DispatchQueue.main.asyncAfter(deadline: .now() + delay) { [weak self] in self?.refreshWidgetData() }
        }
    }

    private weak var registeredWebView: WKWebView?

    private func registerWidgetHandler() {
        guard let webView = webView, registeredWebView !== webView else { return }
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "zagWidgetSync")
        webView.configuration.userContentController.add(self, name: "zagWidgetSync")
        registeredWebView = webView
    }

    @objc private func refreshWidgetData() {
        registerWidgetHandler()
        webView?.evaluateJavaScript("window.zagWidgetSync && window.zagWidgetSync();", completionHandler: nil)
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "zagWidgetSync", let payload = message.body as? [String: Any] else { return }
        let defaults = UserDefaults(suiteName: "group.com.zagscience.app")
        if let records = payload["records"] as? [[String: Any]],
           let data = try? JSONSerialization.data(withJSONObject: records) {
            defaults?.set(data, forKey: "zag_widget_workouts")
        }
        // This is only a TestFlight development toggle, NOT purchase validation.
        if let pro = payload["pro"] as? Bool {
            defaults?.set(pro, forKey: "zag_widget_is_pro")
        } else if let proFlag = payload["proFlag"] as? Bool {
            defaults?.set(proFlag, forKey: "zag_widget_is_pro")
        }
        // WKWebView bridges JSON numbers as NSNumber. Read the dictionary as
        // [String: Any] so the exercise list isn't silently emptied by a cast.
        let records = payload["records"] as? [[String: Any]] ?? []
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
