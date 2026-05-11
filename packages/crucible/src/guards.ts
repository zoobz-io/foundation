import type { LogEntry, LogLevel, SpanEntry, MetricEntry, TelemetryEntry } from "./types";

const LOG_LEVELS: Set<string> = new Set(["debug", "info", "warn", "error", "fatal"]);
const SPAN_STATUSES: Set<string> = new Set(["ok", "error", "unset"]);

/** Type guard for LogEntry — validates shape without casting. */
export const isLogEntry = (value: unknown): value is LogEntry => {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if (obj.kind !== undefined && obj.kind !== "log") return false;
  return (
    typeof obj.level === "string" &&
    LOG_LEVELS.has(obj.level) &&
    typeof obj.message === "string" &&
    typeof obj.timestamp === "number"
  );
};

/** Type guard for LogLevel. */
export const isLogLevel = (value: unknown): value is LogLevel =>
  typeof value === "string" && LOG_LEVELS.has(value);

/** Type guard for SpanEntry. */
export const isSpanEntry = (value: unknown): value is SpanEntry => {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    obj.kind === "span" &&
    typeof obj.traceId === "string" &&
    obj.traceId.length === 32 &&
    typeof obj.spanId === "string" &&
    obj.spanId.length === 16 &&
    typeof obj.name === "string" &&
    typeof obj.startTime === "number" &&
    typeof obj.status === "string" &&
    SPAN_STATUSES.has(obj.status)
  );
};

/** Type guard for MetricEntry. */
export const isMetricEntry = (value: unknown): value is MetricEntry => {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    obj.kind === "metric" &&
    typeof obj.name === "string" &&
    typeof obj.value === "number" &&
    typeof obj.timestamp === "number"
  );
};

/** Type guard for any TelemetryEntry. */
export const isTelemetryEntry = (value: unknown): value is TelemetryEntry =>
  isLogEntry(value) || isSpanEntry(value) || isMetricEntry(value);
