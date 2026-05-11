import { describe, it, expect } from "vitest";
import { isLogEntry, isLogLevel, isSpanEntry, isMetricEntry, isTelemetryEntry } from "../src/guards";

describe("isLogLevel", () => {
  it("accepts valid levels", () => {
    expect(isLogLevel("debug")).toBe(true);
    expect(isLogLevel("info")).toBe(true);
    expect(isLogLevel("warn")).toBe(true);
    expect(isLogLevel("error")).toBe(true);
    expect(isLogLevel("fatal")).toBe(true);
  });

  it("rejects invalid values", () => {
    expect(isLogLevel("trace")).toBe(false);
    expect(isLogLevel("")).toBe(false);
    expect(isLogLevel(42)).toBe(false);
    expect(isLogLevel(null)).toBe(false);
  });
});

describe("isLogEntry", () => {
  it("accepts a valid entry without kind", () => {
    expect(isLogEntry({
      level: "info",
      message: "hello",
      timestamp: Date.now(),
    })).toBe(true);
  });

  it("accepts a valid entry with kind: log", () => {
    expect(isLogEntry({
      kind: "log",
      level: "info",
      message: "hello",
      timestamp: Date.now(),
    })).toBe(true);
  });

  it("rejects entry with wrong kind", () => {
    expect(isLogEntry({
      kind: "span",
      level: "info",
      message: "hello",
      timestamp: Date.now(),
    })).toBe(false);
  });

  it("accepts entry with optional fields", () => {
    expect(isLogEntry({
      level: "error",
      message: "fail",
      timestamp: Date.now(),
      data: { userId: "123" },
      traceId: "a".repeat(32),
      spanId: "b".repeat(16),
      source: "server",
    })).toBe(true);
  });

  it("rejects missing level", () => {
    expect(isLogEntry({ message: "no level", timestamp: 1 })).toBe(false);
  });

  it("rejects invalid level", () => {
    expect(isLogEntry({ level: "trace", message: "bad", timestamp: 1 })).toBe(false);
  });

  it("rejects missing message", () => {
    expect(isLogEntry({ level: "info", timestamp: 1 })).toBe(false);
  });

  it("rejects missing timestamp", () => {
    expect(isLogEntry({ level: "info", message: "no time" })).toBe(false);
  });

  it("rejects null", () => expect(isLogEntry(null)).toBe(false));
  it("rejects string", () => expect(isLogEntry("not an entry")).toBe(false));
});

describe("isSpanEntry", () => {
  const validSpan = {
    kind: "span" as const,
    traceId: "a".repeat(32),
    spanId: "b".repeat(16),
    name: "page:navigation",
    startTime: Date.now(),
    status: "ok" as const,
  };

  it("accepts valid span", () => {
    expect(isSpanEntry(validSpan)).toBe(true);
  });

  it("accepts span with optional fields", () => {
    expect(isSpanEntry({
      ...validSpan,
      parentSpanId: "c".repeat(16),
      endTime: Date.now() + 100,
      attributes: { path: "/home" },
      source: "client",
    })).toBe(true);
  });

  it("rejects wrong kind", () => {
    expect(isSpanEntry({ ...validSpan, kind: "log" })).toBe(false);
  });

  it("rejects wrong traceId length", () => {
    expect(isSpanEntry({ ...validSpan, traceId: "short" })).toBe(false);
  });

  it("rejects wrong spanId length", () => {
    expect(isSpanEntry({ ...validSpan, spanId: "short" })).toBe(false);
  });

  it("rejects invalid status", () => {
    expect(isSpanEntry({ ...validSpan, status: "invalid" })).toBe(false);
  });

  it("rejects missing name", () => {
    const { name: _, ...noName } = validSpan;
    expect(isSpanEntry(noName)).toBe(false);
  });

  it("rejects null", () => expect(isSpanEntry(null)).toBe(false));
});

describe("isMetricEntry", () => {
  const validMetric = {
    kind: "metric" as const,
    name: "web_vital.lcp",
    value: 2500,
    timestamp: Date.now(),
  };

  it("accepts valid metric", () => {
    expect(isMetricEntry(validMetric)).toBe(true);
  });

  it("accepts metric with optional fields", () => {
    expect(isMetricEntry({
      ...validMetric,
      unit: "ms",
      attributes: { path: "/home" },
      source: "client",
    })).toBe(true);
  });

  it("rejects wrong kind", () => {
    expect(isMetricEntry({ ...validMetric, kind: "span" })).toBe(false);
  });

  it("rejects missing value", () => {
    const { value: _, ...noValue } = validMetric;
    expect(isMetricEntry(noValue)).toBe(false);
  });

  it("rejects non-numeric value", () => {
    expect(isMetricEntry({ ...validMetric, value: "not a number" })).toBe(false);
  });

  it("rejects null", () => expect(isMetricEntry(null)).toBe(false));
});

describe("isTelemetryEntry", () => {
  it("accepts log entry", () => {
    expect(isTelemetryEntry({ level: "info", message: "hi", timestamp: 1 })).toBe(true);
  });

  it("accepts span entry", () => {
    expect(isTelemetryEntry({
      kind: "span",
      traceId: "a".repeat(32),
      spanId: "b".repeat(16),
      name: "test",
      startTime: 1,
      status: "ok",
    })).toBe(true);
  });

  it("accepts metric entry", () => {
    expect(isTelemetryEntry({
      kind: "metric",
      name: "lcp",
      value: 100,
      timestamp: 1,
    })).toBe(true);
  });

  it("rejects invalid objects", () => {
    expect(isTelemetryEntry({ kind: "unknown" })).toBe(false);
    expect(isTelemetryEntry(null)).toBe(false);
    expect(isTelemetryEntry("string")).toBe(false);
  });
});
