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
        for delay in [0.5, 1.5, 3.0, 6.0, 10.0, 20.0, 35.0] {
            DispatchQueue.main.asyncAfter(deadline: .now() + delay) { [weak self] in self?.refreshWidgetData() }
        }
    }

    private var widgetHandlerRegistered = false

    private func registerWidgetHandler() {
        guard !widgetHandlerRegistered, let webView = webView else { return }
        webView.configuration.userContentController.add(self, name: "zagWidgetSync")
        widgetHandlerRegistered = true
    }

    @objc private func refreshWidgetData() {
        registerWidgetHandler()
        // Direct read-back is a fallback when WKScriptMessageHandler registration
        // races Capacitor web view creation. It reads the same state as the app.
        let snapshotJS = """
        (function(){try {
          var pro = window.zagProEntitled === true || localStorage.getItem('zag_dev_pro_test_only') === '1';
          var rows = typeof zagStrengthRecords === 'function' ? zagStrengthRecords() : [];
          return JSON.stringify({pro:pro,records:rows.map(function(r,i){return {date:r.date,by:r.by,order:i};})});
        }catch(e){return JSON.stringify({pro:localStorage.getItem('zag_dev_pro_test_only') === '1',records:[]});}})();
        """
        webView?.evaluateJavaScript(snapshotJS) { [weak self] result, error in
            guard error == nil, let raw = result as? String,
                  let data = raw.data(using: .utf8),
                  let payload = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return }
            self?.saveWidgetPayload(payload)
        }
        webView?.evaluateJavaScript("window.zagWidgetSync && window.zagWidgetSync();", completionHandler: nil)
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "zagWidgetSync", let payload = message.body as? [String: Any] else { return }
        saveWidgetPayload(payload)
    }

    private func saveWidgetPayload(_ payload: [String: Any]) {
        guard let records = payload["records"] as? [[String: Any]],
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
