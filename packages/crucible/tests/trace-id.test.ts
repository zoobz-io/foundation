import { describe, it, expect } from "vitest";
import { generateTraceId, generateSpanId, formatTraceparent, parseTraceparent } from "../src/trace-id";

describe("generateTraceId", () => {
  it("produces 32-char hex string", () => {
    const id = generateTraceId();
    expect(id).toHaveLength(32);
    expect(id).toMatch(/^[0-9a-f]{32}$/);
  });

  it("produces unique values", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateTraceId()));
    expect(ids.size).toBe(100);
  });
});

describe("generateSpanId", () => {
  it("produces 16-char hex string", () => {
    const id = generateSpanId();
    expect(id).toHaveLength(16);
    expect(id).toMatch(/^[0-9a-f]{16}$/);
  });

  it("produces unique values", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateSpanId()));
    expect(ids.size).toBe(100);
  });
});

describe("formatTraceparent", () => {
  it("formats with sampled flag", () => {
    const result = formatTraceparent("a".repeat(32), "b".repeat(16), true);
    expect(result).toBe(`00-${"a".repeat(32)}-${"b".repeat(16)}-01`);
  });

  it("formats with unsampled flag", () => {
    const result = formatTraceparent("a".repeat(32), "b".repeat(16), false);
    expect(result).toBe(`00-${"a".repeat(32)}-${"b".repeat(16)}-00`);
  });

  it("defaults to sampled", () => {
    const result = formatTraceparent("a".repeat(32), "b".repeat(16));
    expect(result.endsWith("-01")).toBe(true);
  });
});

describe("parseTraceparent", () => {
  it("parses valid traceparent", () => {
    const traceId = "a".repeat(32);
    const spanId = "b".repeat(16);
    const result = parseTraceparent(`00-${traceId}-${spanId}-01`);
    expect(result).toEqual({ traceId, spanId, sampled: true });
  });

  it("parses unsampled flag", () => {
    const result = parseTraceparent(`00-${"a".repeat(32)}-${"b".repeat(16)}-00`);
    expect(result?.sampled).toBe(false);
  });

  it("returns null for null input", () => {
    expect(parseTraceparent(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(parseTraceparent(undefined)).toBeNull();
  });

  it("returns null for wrong part count", () => {
    expect(parseTraceparent("00-abc-def")).toBeNull();
  });

  it("returns null for wrong version", () => {
    expect(parseTraceparent(`01-${"a".repeat(32)}-${"b".repeat(16)}-01`)).toBeNull();
  });

  it("returns null for wrong traceId length", () => {
    expect(parseTraceparent(`00-${"a".repeat(31)}-${"b".repeat(16)}-01`)).toBeNull();
  });

  it("returns null for wrong spanId length", () => {
    expect(parseTraceparent(`00-${"a".repeat(32)}-${"b".repeat(15)}-01`)).toBeNull();
  });
});
