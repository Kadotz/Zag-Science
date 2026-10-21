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

struct StrengthExerciseQuery: EntityQuery {
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
    @Parameter(title: "Time period", default: .month3) var period: StrengthPeriod
    @Parameter(title: "Graph interval", default: .weekly) var interval: StrengthInterval
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
        guard isPro, let json = defaults?.data(forKey: "zag_widget_history"),
              let records = try? JSONDecoder().decode([StrengthRecord].self, from: json) else { return empty }

        let now = Date()
        let calendar = Calendar.current
        let start: Date?
        switch configuration.period {
        case .month1: start = calendar.date(byAdding: .month, value: -1, to: now)
        case .month3: start = calendar.date(byAdding: .month, value: -3, to: now)
        case .month6: start = calendar.date(byAdding: .month, value: -6, to: now)
        case .year1: start = calendar.date(byAdding: .year, value: -1, to: now)
        case .all: start = nil
        }
        let parser = ISO8601DateFormatter()
        parser.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        let fallbackParser = ISO8601DateFormatter()
        let selectedRecords = records.compactMap { record -> (Date, StrengthRecord)? in
            guard record.value.isFinite, record.value > 0,
                  selected == "all" || record.exercise == selected,
                  let date = parser.date(from: record.timestamp) ?? fallbackParser.date(from: record.timestamp),
                  date <= now, start.map({ date >= $0 }) ?? true else { return nil }
            return (date, record)
        }.sorted { $0.0 < $1.0 }

        // Average all working sets in each interval. Missing intervals are omitted, not zeroed.
        var buckets: [String: (sum: Double, count: Int, date: Date)] = [:]
        for (date, record) in selectedRecords {
            let key: String
            let bucketDate: Date
            switch configuration.interval {
            case .workout:
                // Session IDs should be stable and unique per workout; fall back to timestamp.
                key = record.workoutId ?? record.timestamp
                bucketDate = date
            case .daily:
                bucketDate = calendar.startOfDay(for: date)
                key = "\(bucketDate.timeIntervalSince1970)"
            case .weekly:
                bucketDate = calendar.dateInterval(of: .weekOfYear, for: date)?.start ?? date
                key = "\(bucketDate.timeIntervalSince1970)"
            case .monthly:
                bucketDate = calendar.dateInterval(of: .month, for: date)?.start ?? date
                key = "\(bucketDate.timeIntervalSince1970)"
            }
            let previous = buckets[key]
            buckets[key] = ((previous?.sum ?? 0) + record.value,
                            (previous?.count ?? 0) + 1,
                            min(previous?.date ?? bucketDate, bucketDate))
        }
        let points = buckets.values.sorted { $0.date < $1.date }.map { $0.sum / Double($0.count) }
        let change: Double? = points.count >= 2 && points[0] > 0
            ? (points[points.count - 1] / points[0] - 1) * 100 : nil
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
                Text("Complete workouts to build your graph").font(.caption).foregroundStyle(.white.opacity(0.7))
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
