/** OTLP JSON wire format types (subset needed for export). */

export interface OtlpKeyValue {
  key: string;
  value: OtlpAnyValue;
}

export interface OtlpAnyValue {
  stringValue?: string;
  intValue?: string;
  doubleValue?: number;
  boolValue?: boolean;
}

export interface OtlpResource {
  attributes: OtlpKeyValue[];
}

export interface OtlpInstrumentationScope {
  name: string;
  version?: string;
}

// --- Logs ---

export interface OtlpLogRecord {
  timeUnixNano: string;
  severityNumber: number;
  severityText: string;
  body: OtlpAnyValue;
  attributes: OtlpKeyValue[];
  traceId?: string;
  spanId?: string;
}

export interface OtlpScopeLogs {
  scope: OtlpInstrumentationScope;
  logRecords: OtlpLogRecord[];
}

export interface OtlpResourceLogs {
  resource: OtlpResource;
  scopeLogs: OtlpScopeLogs[];
}

export interface OtlpLogsPayload {
  resourceLogs: OtlpResourceLogs[];
}

// --- Traces ---

export interface OtlpSpan {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  kind: number;
  startTimeUnixNano: string;
  endTimeUnixNano: string;
  attributes: OtlpKeyValue[];
  status: { code: number; message?: string };
}

export interface OtlpScopeSpans {
  scope: OtlpInstrumentationScope;
  spans: OtlpSpan[];
}

export interface OtlpResourceSpans {
  resource: OtlpResource;
  scopeSpans: OtlpScopeSpans[];
}

export interface OtlpTracesPayload {
  resourceSpans: OtlpResourceSpans[];
}

// --- Metrics ---

export interface OtlpNumberDataPoint {
  timeUnixNano: string;
  asDouble: number;
  attributes: OtlpKeyValue[];
}

export interface OtlpGauge {
  dataPoints: OtlpNumberDataPoint[];
}

export interface OtlpMetric {
  name: string;
  unit?: string;
  gauge: OtlpGauge;
}

export interface OtlpScopeMetrics {
  scope: OtlpInstrumentationScope;
  metrics: OtlpMetric[];
}

export interface OtlpResourceMetrics {
  resource: OtlpResource;
  scopeMetrics: OtlpScopeMetrics[];
}

export interface OtlpMetricsPayload {
  resourceMetrics: OtlpResourceMetrics[];
}
