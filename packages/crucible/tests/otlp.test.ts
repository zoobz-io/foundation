import { describe, it, expect } from "vitest";
import { toOtlpLogs, toOtlpTraces, toOtlpMetrics } from "../src/otlp";
import type { LogEntry, SpanEntry, MetricEntry } from "../src/types";

describe("toOtlpLogs", () => {
  it("transforms log entries to OTLP format", () => {
    const entries: LogEntry[] = [
      { level: "info", message: "hello", timestamp: 1000, data: { userId: "123" } },
      { level: "error", message: "fail", timestamp: 2000, traceId: "a".repeat(32), spanId: "b".repeat(16) },
    ];

    const result = toOtlpLogs(entries, "test-service");

    expect(result.resourceLogs).toHaveLength(1);
    const resourceLog = result.resourceLogs[0]!;
    expect(resourceLog.resource.attributes[0]).toEqual({ key: "service.name", value: { stringValue: "test-service" } });

    const records = resourceLog.scopeLogs[0]!.logRecords;
    expect(records).toHaveLength(2);

    expect(records[0]!.severityText).toBe("INFO");
    expect(records[0]!.severityNumber).toBe(9);
    expect(records[0]!.body).toEqual({ stringValue: "hello" });
    expect(records[0]!.timeUnixNano).toBe("1000000000");
    expect(records[0]!.attributes).toEqual([{ key: "userId", value: { stringValue: "123" } }]);

    expect(records[1]!.traceId).toBe("a".repeat(32));
    expect(records[1]!.spanId).toBe("b".repeat(16));
  });

  it("handles empty array", () => {
    const result = toOtlpLogs([], "svc");
    expect(result.resourceLogs[0]!.scopeLogs[0]!.logRecords).toHaveLength(0);
  });
});

describe("toOtlpTraces", () => {
  it("transforms span entries to OTLP format", () => {
    const spans: SpanEntry[] = [
      {
        kind: "span",
        traceId: "a".repeat(32),
        spanId: "b".repeat(16),
        parentSpanId: "c".repeat(16),
        name: "navigation",
        startTime: 1000,
        endTime: 2000,
        status: "ok",
        attributes: { "http.path": "/" },
      },
    ];

    const result = toOtlpTraces(spans, "test-service");

    expect(result.resourceSpans).toHaveLength(1);
    const otlpSpans = result.resourceSpans[0]!.scopeSpans[0]!.spans;
    expect(otlpSpans).toHaveLength(1);

    const span = otlpSpans[0]!;
    expect(span.traceId).toBe("a".repeat(32));
    expect(span.spanId).toBe("b".repeat(16));
    expect(span.parentSpanId).toBe("c".repeat(16));
    expect(span.name).toBe("navigation");
    expect(span.startTimeUnixNano).toBe("1000000000");
    expect(span.endTimeUnixNano).toBe("2000000000");
    expect(span.status).toEqual({ code: 1 });
    expect(span.attributes).toEqual([{ key: "http.path", value: { stringValue: "/" } }]);
  });

  it("filters out spans without endTime", () => {
    const spans: SpanEntry[] = [
      { kind: "span", traceId: "a".repeat(32), spanId: "b".repeat(16), name: "inflight", startTime: 1000, status: "unset" },
      { kind: "span", traceId: "a".repeat(32), spanId: "c".repeat(16), name: "done", startTime: 1000, endTime: 2000, status: "ok" },
    ];

    const result = toOtlpTraces(spans, "svc");
    expect(result.resourceSpans[0]!.scopeSpans[0]!.spans).toHaveLength(1);
    expect(result.resourceSpans[0]!.scopeSpans[0]!.spans[0]!.name).toBe("done");
  });

  it("maps error status", () => {
    const spans: SpanEntry[] = [
      { kind: "span", traceId: "a".repeat(32), spanId: "b".repeat(16), name: "err", startTime: 1000, endTime: 2000, status: "error" },
    ];

    const result = toOtlpTraces(spans, "svc");
    expect(result.resourceSpans[0]!.scopeSpans[0]!.spans[0]!.status).toEqual({ code: 2 });
  });
});

describe("toOtlpMetrics", () => {
  it("transforms metric entries to OTLP format", () => {
    const metrics: MetricEntry[] = [
      { kind: "metric", name: "web_vital.lcp", value: 2500, unit: "ms", timestamp: 1000 },
      { kind: "metric", name: "web_vital.cls", value: 0.1, unit: "score", timestamp: 2000, attributes: { path: "/home" } },
    ];

    const result = toOtlpMetrics(metrics, "test-service");

    expect(result.resourceMetrics).toHaveLength(1);
    const otlpMetrics = result.resourceMetrics[0]!.scopeMetrics[0]!.metrics;
    expect(otlpMetrics).toHaveLength(2);

    expect(otlpMetrics[0]!.name).toBe("web_vital.lcp");
    expect(otlpMetrics[0]!.unit).toBe("ms");
    expect(otlpMetrics[0]!.gauge.dataPoints[0]!.asDouble).toBe(2500);
    expect(otlpMetrics[0]!.gauge.dataPoints[0]!.timeUnixNano).toBe("1000000000");

    expect(otlpMetrics[1]!.gauge.dataPoints[0]!.attributes).toEqual([{ key: "path", value: { stringValue: "/home" } }]);
  });

  it("handles empty array", () => {
    const result = toOtlpMetrics([], "svc");
    expect(result.resourceMetrics[0]!.scopeMetrics[0]!.metrics).toHaveLength(0);
  });
});
