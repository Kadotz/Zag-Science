import WidgetKit
import SwiftUI
import AppIntents

private let sharedSuite = "group.com.zagscience.app"

// Each widget instance stores its own choices through iOS Edit Widget.
enum StrengthPeriod: String, AppEnum {
    case month1, month3, month6, year1, all
    static var typeDisplayRepresentation = TypeDisplayRepresentation(name: "Time period")
    static var caseDisplayRepresentations: [Self: DisplayRepresentation] = [
        .month1: "Last month", .month3: "Last 3 months", .month6: "Last 6 months",
        .year1: "Last year", .all: "All time"
    ]
    var label: String {
        switch self {
        case .month1: return "Last month"
        case .month3: return "Last 3 months"
        case .month6: return "Last 6 months"
        case .year1: return "Last year"
        case .all: return "All time"
        }
    }
}

enum StrengthInterval: String, AppEnum {
    case workout, daily, weekly, monthly
    static var typeDisplayRepresentation = TypeDisplayRepresentation(name: "Graph interval")
    static var caseDisplayRepresentations: [Self: DisplayRepresentation] = [
        .workout: "Every workout", .daily: "Daily", .weekly: "Weekly", .monthly: "Monthly"
    ]
}

struct StrengthExercise: AppEntity, Identifiable {
    let id: String
    let name: String
    static var typeDisplayRepresentation = TypeDisplayRepresentation(name: "Exercise")
    var displayRepresentation: DisplayRepresentation { DisplayRepresentation(title: "\(name)") }
    static var defaultQuery = StrengthExerciseQuery()
}

struct StrengthExerciseQuery: EntityStringQuery {
    func entities(matching string: String) async throws -> [StrengthExercise] {
        let options = try await suggestedEntities()
        return options.filter { string.isEmpty || $0.name.localizedCaseInsensitiveContains(string) }
    }
    func entities(for identifiers: [String]) async throws -> [StrengthExercise] {
        let options = try await suggestedEntities()
        return options.filter { identifiers.contains($0.id) }
    }
    func suggestedEntities() async throws -> [StrengthExercise] {
        let names = UserDefaults(suiteName: sharedSuite)?.stringArray(forKey: "zag_widget_exercises") ?? []
        return [StrengthExercise(id: "all", name: "Overall strength")] + names.filter { !$0.isEmpty }.map {
            StrengthExercise(id: $0, name: $0)
        }
    }
    func defaultResult() async -> StrengthExercise? { StrengthExercise(id: "all", name: "Overall strength") }
}

struct StrengthWidgetConfiguration: WidgetConfigurationIntent {
    static var title: LocalizedStringResource = "Strength graph settings"
    static var description = IntentDescription("Choose which strength data this widget displays.")

    @Parameter(title: "Exercise") var exercise: StrengthExercise?
    @Parameter(title: "Time period", default: .all) var period: StrengthPeriod
    @Parameter(title: "Graph interval", default: .workout) var interval: StrengthInterval
}

// Shared payload contract (written by native Capacitor bridge):
// zag_widget_history = JSON array of {"exercise":"Bench Press Flat", "timestamp": ISO8601,
//   "value": 75.0, "workoutId":"unique-session-id"}. Value must be the SAME per-set
// strength measure used by the in-app History chart, not a fabricated PB value.
// A workout may contain multiple working-set records. Rest days have no records.
private struct StrengthRecord: Decodable {
    let exercise: String
    let timestamp: String
    let value: Double
    let workoutId: String?
}

private struct WorkoutRecord: Decodable {
    let date: String
    let by: [String: Double]
    let order: Int
}

struct StrengthEntry: TimelineEntry {
    let date: Date
    let isPro: Bool
    let points: [Double]
    let change: Double?
    let exerciseLabel: String
    let periodLabel: String
}

struct StrengthProvider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> StrengthEntry {
        StrengthEntry(date: .now, isPro: true, points: [45,48,47,54,60,62,68], change: 12.8,
                      exerciseLabel: "Overall strength", periodLabel: "Last 3 months")
    }
    func snapshot(for configuration: StrengthWidgetConfiguration, in context: Context) async -> StrengthEntry {
        load(configuration)
    }
    func timeline(for configuration: StrengthWidgetConfiguration, in context: Context) async -> Timeline<StrengthEntry> {
        Timeline(entries: [load(configuration)], policy: .after(Date().addingTimeInterval(3600)))
    }

    private func load(_ configuration: StrengthWidgetConfiguration) -> StrengthEntry {
        let defaults = UserDefaults(suiteName: sharedSuite)
        let isPro = defaults?.bool(forKey: "zag_widget_is_pro") ?? false
        let selected = configuration.exercise?.id ?? "all"
        let label = configuration.exercise?.name ?? "Overall strength"
        let empty = StrengthEntry(date: .now, isPro: isPro, points: [], change: nil,
                                  exerciseLabel: label, periodLabel: configuration.period.label)
        guard isPro, let json = defaults?.data(forKey: "zag_widget_workouts"),
              let objects = (try? JSONSerialization.jsonObject(with: json)) as? [[String: Any]] else {
            defaults?.set("Cannot decode shared workout JSON or Pro not enabled", forKey: "zag_widget_diagnostic")
            return empty
        }
        // Decode each row independently. One malformed date or legacy record must
        // never make the entire widget history disappear.
        let records: [WorkoutRecord] = objects.enumerated().compactMap { index, object in
            let date: String
            if let text = object["date"] as? String { date = text }
            else if let number = object["date"] as? NSNumber { date = number.stringValue }
            else { return nil }
            guard let raw = object["by"] as? [String: Any] else { return nil }
            var by: [String: Double] = [:]
            for (name, value) in raw {
                let number: Double?
                if let n = value as? NSNumber { number = n.doubleValue }
                else if let text = value as? String { number = Double(text) }
                else { number = nil }
                if let n = number, n.isFinite && n > 0 { by[name] = n }
            }
            guard !by.isEmpty else { return nil }
            return WorkoutRecord(date: date, by: by, order: (object["order"] as? NSNumber)?.intValue ?? index)
        }
        let sourceCount = objects.count
        let validValueCount = records.filter { !$0.by.isEmpty }.count
        let calendar = Calendar.current
        let now = Date()
        let start: Date?
        switch configuration.period {
        case .month1: start = calendar.date(byAdding: .month, value: -1, to: now)
        case .month3: start = calendar.date(byAdding: .month, value: -3, to: now)
        case .month6: start = calendar.date(byAdding: .month, value: -6, to: now)
        case .year1: start = calendar.date(byAdding: .year, value: -1, to: now)
        case .all: start = nil
        }
        let formatter = DateFormatter()
        formatter.dateFormat = "dd/MM/yyyy"
        formatter.locale = Locale(identifier: "en_GB")
        let iso = ISO8601DateFormatter()
        let isoFractional = ISO8601DateFormatter()
        isoFractional.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        let otherFormats = [
            "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss",
            "d/M/yyyy, HH:mm:ss", "d/M/yyyy, H:mm:ss",
            "d/M/yyyy HH:mm:ss", "d/M/yyyy, HH:mm",
            "d/M/yyyy", "M/d/yyyy, h:mm:ss a",
            "M/d/yyyy, h:mm a", "M/d/yyyy"
        ]
        func parseDate(_ raw: String) -> Date? {
            let value = raw.trimmingCharacters(in: .whitespacesAndNewlines)
            if let date = formatter.date(from: value) ?? iso.date(from: value) ?? isoFractional.date(from: value) {
                return date
            }
            for pattern in otherFormats {
                let parser = DateFormatter()
                parser.locale = Locale(identifier: "en_GB")
                parser.dateFormat = pattern
                parser.isLenient = true
                if let date = parser.date(from: value) { return date }
            }
            if let numeric = Double(value), numeric > 100_000_000 {
                return Date(timeIntervalSince1970: numeric > 10_000_000_000 ? numeric / 1000 : numeric)
            }
            return nil
        }
        let dated = records.compactMap { record -> (Date, WorkoutRecord)? in
            guard let date = parseDate(record.date), date <= now.addingTimeInterval(86400) else { return nil }
            return (date, record)
        }.sorted { $0.0 < $1.0 || ($0.0 == $1.0 && $0.1.order < $1.1.order) }
        let readableDates = dated.count
        var baseline: [String: Double] = [:]
        var latest: [String: Double] = [:]
        var raw: [(Date, Double)] = []
        for (date, record) in dated {
            var changed = false
            for (name, value) in record.by where value.isFinite && value > 0 {
                if baseline[name] == nil { baseline[name] = value }
                latest[name] = value
                if selected == "all" || selected == name { changed = true }
            }
            guard changed, start.map({ date >= $0 }) ?? true else { continue }
            let value: Double?
            if selected == "all" {
                let ratios = latest.compactMap { (name, v) -> Double? in
                    guard let base = baseline[name], base > 0 else { return nil }
                    return 100 * v / base
                }
                value = ratios.isEmpty ? nil : ratios.reduce(0, +) / Double(ratios.count)
            } else { value = latest[selected] }
            if let value = value, value.isFinite { raw.append((date, value)) }
        }
        var plotted = raw
        if configuration.interval != .workout {
            var buckets: [Date: Double] = [:]
            for (date, value) in raw {
                let key: Date
                switch configuration.interval {
                case .daily: key = calendar.startOfDay(for: date)
                case .weekly: key = calendar.dateInterval(of: .weekOfYear, for: date)?.start ?? date
                case .monthly: key = calendar.dateInterval(of: .month, for: date)?.start ?? date
                case .workout: key = date
                }
                buckets[key] = value // last reading in interval, not average or zero
            }
            plotted = buckets.map { ($0.key, $0.value) }.sorted { $0.0 < $1.0 }
        }
        var points = plotted.map { $0.1 }
        // A single workout is still real history. Draw a flat line instead of
        // showing the misleading "Complete workouts" empty-state message.
        if points.count == 1 { points.append(points[0]) }
        // Test-build diagnostics: read from the main app's Developer Test Mode.
        // These counters are generated by the widget's real timeline calculation,
        // not by its sample placeholder preview.
        defaults?.set("Stored: \(sourceCount) | valid values: \(validValueCount) | readable dates: \(readableDates) | selected: \(selected) | raw: \(raw.count) | graph points: \(points.count)", forKey: "zag_widget_diagnostic")
        let change = points.count >= 2 && points[0] > 0 ? (points[points.count - 1] / points[0] - 1) * 100 : nil
        return StrengthEntry(date: now, isPro: true, points: points, change: change,
                             exerciseLabel: label, periodLabel: configuration.period.label)
    }
}

struct StrengthWidgetView: View {
    var entry: StrengthEntry
    var body: some View {
        VStack(alignment: .leading, spacing: 7) {
            HStack {
                Text("ZAG SCIENCE").font(.system(size: 12, weight: .black))
                    .foregroundStyle(Color(red: 0.93, green: 0.44, blue: 1))
                Spacer()
                Text("ZAG PRO").font(.system(size: 9, weight: .bold)).foregroundStyle(.white.opacity(0.65))
            }
            if !entry.isPro {
                Spacer()
                Text("🔒 Strength Progress").font(.system(size: 18, weight: .bold))
                Text("Unlock with Zag Pro").font(.caption).foregroundStyle(.white.opacity(0.7))
                Spacer()
            } else if entry.points.count < 2 {
                Spacer()
                Text(entry.exerciseLabel).font(.headline).lineLimit(1)
                Text("No strength readings in this range — try All time / Every workout").font(.caption).foregroundStyle(.white.opacity(0.7))
                Spacer()
            } else {
                HStack(alignment: .firstTextBaseline, spacing: 6) {
                    if let change = entry.change {
                        Text(String(format: "%+.1f%%", change)).font(.system(size: 26, weight: .heavy))
                    }
                    Text(entry.periodLabel).font(.caption2).foregroundStyle(.white.opacity(0.7))
                }
                Text(entry.exerciseLabel).font(.system(size: 10, weight: .medium))
                    .foregroundStyle(.white.opacity(0.8)).lineLimit(1)
                GeometryReader { geometry in
                    let low = entry.points.min() ?? 0
                    let high = entry.points.max() ?? 1
                    let span = max(high - low, 1)
                    Path { path in
                        for (index, value) in entry.points.enumerated() {
                            let x = geometry.size.width * CGFloat(index) / CGFloat(max(entry.points.count - 1, 1))
                            let y = geometry.size.height * (1 - CGFloat((value - low) / span) * 0.85) - 2
                            if index == 0 { path.move(to: CGPoint(x: x, y: y)) }
                            else { path.addLine(to: CGPoint(x: x, y: y)) }
                        }
                    }.stroke(Color(red: 0.89, green: 0.24, blue: 1),
                             style: StrokeStyle(lineWidth: 3, lineCap: .round, lineJoin: .round))
                }
            }
        }
        .foregroundStyle(.white)
        .padding(14)
        .containerBackground(for: .widget) { Color(red: 0.035, green: 0.02, blue: 0.075) }
        .widgetURL(URL(string: "zagscience://history"))
    }
}

struct ZagStrengthWidget: Widget {
    let kind = "ZagStrengthWidget"
    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: StrengthWidgetConfiguration.self, provider: StrengthProvider()) { entry in
            StrengthWidgetView(entry: entry)
        }
        .configurationDisplayName("Zag Strength Progress")
        .description("Customise your Zag Pro strength graph by exercise, period and interval.")
        .supportedFamilies([.systemMedium])
    }
}

@main
struct ZagWidgetBundle: WidgetBundle {
    var body: some Widget { ZagStrengthWidget() }
}
