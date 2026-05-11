export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

/**
 * Log data interface. Consumers extend via module augmentation:
 *
 * declare module "@zoobz-io/crucible/types" {
 *   interface LogData {
 *     userId: string;
 *     requestId: string;
 *     duration: number;
 *   }
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogData {}

export type LogPayload = [keyof LogData] extends [never]
  ? Record<string, unknown>
  : Partial<LogData>;

// --- Telemetry Entries ---

/** Unified log entry. */
export interface LogEntry {
  kind?: "log";
  level: LogLevel;
  message: string;
  data?: LogPayload;
  timestamp: number;
  traceId?: string;
  spanId?: string;
  source?: "server" | "client";
}


export type SpanStatus = "ok" | "error" | "unset";

/** A trace span. */
export interface SpanEntry {
  kind: "span";
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  startTime: number;
  endTime?: number;
  status: SpanStatus;
  attributes?: Record<string, string | number | boolean>;
  source?: "server" | "client";
}

/** A metric data point. */
export interface MetricEntry {
  kind: "metric";
  name: string;
  value: number;
  unit?: string;
  attributes?: Record<string, string | number | boolean>;
  timestamp: number;
  source?: "server" | "client";
}

/** Discriminated union of all telemetry signals. */
export type TelemetryEntry = LogEntry | SpanEntry | MetricEntry;

// --- Config ---

export interface TracesConfig {
  navigation?: boolean;
  fetch?: boolean;
  server?: boolean;
}

export interface MetricsConfig {
  webVitals?: boolean;
  resources?: boolean;
  longTasks?: boolean;
  connection?: boolean;
}

export interface OtlpConfig {
  endpoint: string;
  headers?: Record<string, string>;
  serviceName?: string;
  batchInterval?: number;
}

/** Config for the crucible module. */
export interface CrucibleConfig {
  /** Minimum log level to emit. Default: "debug" in dev, "info" in production. */
  level?: LogLevel;
  /** Batch client log transmission. Default: false in dev, true in production. */
  batch?: boolean;
  /** Enable trace auto-instrumentation. Default: true. */
  traces?: boolean | TracesConfig;
  /** Enable performance metrics collection. Default: true. */
  metrics?: boolean | MetricsConfig;
  /** OTLP export configuration. */
  otlp?: OtlpConfig;
}

// --- NuxtApp augmentation ---

declare module "#app" {
  interface NuxtApp {
    $transmit: (entry: TelemetryEntry) => void;
  }
}
