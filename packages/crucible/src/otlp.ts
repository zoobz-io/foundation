import type { LogEntry, SpanEntry, MetricEntry } from "./types";
import type {
  OtlpKeyValue,
  OtlpAnyValue,
  OtlpResource,
  OtlpInstrumentationScope,
  OtlpLogsPayload,
  OtlpTracesPayload,
  OtlpMetricsPayload,
} from "./otlp-types";

const SCOPE: OtlpInstrumentationScope = { name: "crucible", version: "0.0.1" };

const msToNano = (ms: number): string => `${Math.round(ms) * 1_000_000}`;

const toAnyValue = (value: string | number | boolean): OtlpAnyValue => {
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { boolValue: value };
  if (Number.isInteger(value)) return { intValue: String(value) };
  return { doubleValue: value };
};

const toKeyValues = (attrs: Record<string, unknown> | undefined): OtlpKeyValue[] => {
  if (!attrs) return [];
  return Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([key, value]) => ({ key, value: toAnyValue(value as string | number | boolean) }));
};

const makeResource = (serviceName: string): OtlpResource => ({
  attributes: [{ key: "service.name", value: { stringValue: serviceName } }],
});

// --- Severity mapping ---

const SEVERITY_MAP: Record<string, { number: number; text: string }> = {
  debug: { number: 5, text: "DEBUG" },
  info: { number: 9, text: "INFO" },
  warn: { number: 13, text: "WARN" },
  error: { number: 17, text: "ERROR" },
  fatal: { number: 21, text: "FATAL" },
};

// --- Span status mapping ---

const SPAN_STATUS_MAP: Record<string, number> = {
  unset: 0,
  ok: 1,
  error: 2,
};

// --- Public API ---

export const toOtlpLogs = (entries: LogEntry[], serviceName: string): OtlpLogsPayload => ({
  resourceLogs: [{
    resource: makeResource(serviceName),
    scopeLogs: [{
      scope: SCOPE,
      logRecords: entries.map((entry) => {
        const severity = SEVERITY_MAP[entry.level] ?? { number: 9, text: "INFO" };
        return {
          timeUnixNano: msToNano(entry.timestamp),
          severityNumber: severity.number,
          severityText: severity.text,
          body: { stringValue: entry.message },
          attributes: toKeyValues(entry.data),
          ...(entry.traceId ? { traceId: entry.traceId } : {}),
          ...(entry.spanId ? { spanId: entry.spanId } : {}),
        };
      }),
    }],
  }],
});

export const toOtlpTraces = (spans: SpanEntry[], serviceName: string): OtlpTracesPayload => ({
  resourceSpans: [{
    resource: makeResource(serviceName),
    scopeSpans: [{
      scope: SCOPE,
      spans: spans
        .filter((s) => s.endTime !== undefined)
        .map((span) => ({
          traceId: span.traceId,
          spanId: span.spanId,
          ...(span.parentSpanId ? { parentSpanId: span.parentSpanId } : {}),
          name: span.name,
          kind: 1, // SPAN_KIND_INTERNAL
          startTimeUnixNano: msToNano(span.startTime),
          endTimeUnixNano: msToNano(span.endTime!),
          attributes: toKeyValues(span.attributes),
          status: { code: SPAN_STATUS_MAP[span.status] ?? 0 },
        })),
    }],
  }],
});

export const toOtlpMetrics = (metrics: MetricEntry[], serviceName: string): OtlpMetricsPayload => ({
  resourceMetrics: [{
    resource: makeResource(serviceName),
    scopeMetrics: [{
      scope: SCOPE,
      metrics: metrics.map((m) => ({
        name: m.name,
        ...(m.unit ? { unit: m.unit } : {}),
        gauge: {
          dataPoints: [{
            timeUnixNano: msToNano(m.timestamp),
            asDouble: m.value,
            attributes: toKeyValues(m.attributes),
          }],
        },
      })),
    }],
  }],
});
