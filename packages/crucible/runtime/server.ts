import { defineEventHandler, readBody, readRawBody, getRequestHeader } from "h3";
import type { LogLevel, LogEntry, SpanEntry, MetricEntry, TelemetryEntry, OtlpConfig } from "../src/types";
import { meetsLevel } from "../src/levels";
import { isLogLevel, isLogEntry, isSpanEntry, isMetricEntry, isTelemetryEntry } from "../src/guards";
import { sanitizeData, summarize } from "../src/sanitize";
import { toOtlpLogs, toOtlpTraces, toOtlpMetrics } from "../src/otlp";

export interface CrucibleHandler {
  write: (entry: TelemetryEntry) => void | Promise<void>;
}

export interface CrucibleHandlerOptions {
  minLevel?: LogLevel;
  otlp?: OtlpConfig;
}

let registeredWrite: ((entry: TelemetryEntry) => void | Promise<void>) | null = null;

/** Returns the registered write function, or null if defineCrucibleHandler hasn't been called yet. */
export const useCrucibleWriter = (): ((entry: TelemetryEntry) => void | Promise<void>) | null => registeredWrite;

// --- OTLP batch export ---

let otlpConfig: OtlpConfig | undefined;
const otlpLogs: LogEntry[] = [];
const otlpSpans: SpanEntry[] = [];
const otlpMetrics: MetricEntry[] = [];
let otlpTimer: ReturnType<typeof setInterval> | null = null;

const exportOtlp = async (): Promise<void> => {
  if (!otlpConfig) return;

  const { endpoint, headers = {}, serviceName = "crucible" } = otlpConfig;
  const reqHeaders = { "Content-Type": "application/json", ...headers };

  const promises: Promise<void>[] = [];

  if (otlpLogs.length > 0) {
    const batch = otlpLogs.splice(0, otlpLogs.length);
    promises.push(
      fetch(`${endpoint}/v1/logs`, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(toOtlpLogs(batch, serviceName)),
      }).then(() => {}).catch(() => {}),
    );
  }

  if (otlpSpans.length > 0) {
    const batch = otlpSpans.splice(0, otlpSpans.length);
    promises.push(
      fetch(`${endpoint}/v1/traces`, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(toOtlpTraces(batch, serviceName)),
      }).then(() => {}).catch(() => {}),
    );
  }

  if (otlpMetrics.length > 0) {
    const batch = otlpMetrics.splice(0, otlpMetrics.length);
    promises.push(
      fetch(`${endpoint}/v1/metrics`, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(toOtlpMetrics(batch, serviceName)),
      }).then(() => {}).catch(() => {}),
    );
  }

  await Promise.all(promises);
};

const enqueueForOtlp = (entry: TelemetryEntry): void => {
  if (isLogEntry(entry)) otlpLogs.push(entry);
  else if (isSpanEntry(entry)) otlpSpans.push(entry);
  else if (isMetricEntry(entry)) otlpMetrics.push(entry);
};

// --- Console writer (dev mode) ---

const LOG_METHOD: Record<string, "debug" | "info" | "warn" | "error"> = {
  debug: "debug",
  info: "info",
  warn: "warn",
  error: "error",
  fatal: "error",
};

const writeLog = (entry: LogEntry): void => {
  const method = LOG_METHOD[entry.level] ?? "info";
  const data = entry.data ? summarize(entry.data) : undefined;
  if (data) console[method](entry.message, data);
  else console[method](entry.message);
};

const writeSpan = (entry: SpanEntry): void => {
  const duration = entry.endTime ? `${entry.endTime - entry.startTime}ms` : "in-flight";
  console.debug(`span:${entry.name}`, duration, entry.status);
};

const writeMetric = (entry: MetricEntry): void => {
  console.debug(`metric:${entry.name}`, `${entry.value}${entry.unit ?? ""}`);
};

/** Built-in console writer for dev mode. Formats all telemetry types to the console. */
export const consoleWriter: CrucibleHandler = {
  write: (entry) => {
    if (isLogEntry(entry)) writeLog(entry);
    else if (isSpanEntry(entry)) writeSpan(entry);
    else if (isMetricEntry(entry)) writeMetric(entry);
  },
};

// --- Handler ---

export const defineCrucibleHandler = (handler: CrucibleHandler, options?: CrucibleHandlerOptions) => {
  const envLevel = process.env.LOG_LEVEL;
  const minimum: LogLevel = options?.minLevel ?? (isLogLevel(envLevel) ? envLevel : "debug");

  // Set up OTLP export if configured
  otlpConfig = options?.otlp;
  if (otlpConfig && !otlpTimer) {
    const interval = otlpConfig.batchInterval ?? 5000;
    otlpTimer = setInterval(exportOtlp, interval);
  }

  registeredWrite = (entry: TelemetryEntry) => {
    if (isLogEntry(entry) && !meetsLevel(entry.level, minimum)) return;
    const processed = isLogEntry(entry) ? { ...entry, data: sanitizeData(entry.data) } as LogEntry : entry;
    if (otlpConfig) enqueueForOtlp(processed);
    return handler.write(processed);
  };

  return defineEventHandler(async (event) => {
    const contentType = getRequestHeader(event, "content-type") || "";

    let entries: unknown[];
    if (contentType.includes("application/json")) {
      const body = await readBody(event);
      entries = Array.isArray(body) ? body : [];
    } else {
      const raw = await readRawBody(event, "utf-8");
      if (!raw) return { ok: true };
      try {
        const parsed: unknown = JSON.parse(raw);
        entries = Array.isArray(parsed) ? parsed : [];
      } catch {
        return { ok: true };
      }
    }

    for (const entry of entries) {
      if (!isTelemetryEntry(entry)) continue;

      if (isLogEntry(entry)) {
        if (!meetsLevel(entry.level, minimum)) continue;
        const processed = { ...entry, data: sanitizeData(entry.data), source: "client" } as LogEntry;
        if (otlpConfig) enqueueForOtlp(processed);
        await handler.write(processed);
      } else {
        const processed = { ...entry, source: "client" } as SpanEntry | MetricEntry;
        if (otlpConfig) enqueueForOtlp(processed);
        await handler.write(processed);
      }
    }

    return { ok: true };
  });
};
