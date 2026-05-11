import { describe, it, expect } from "vitest";
import { sanitizeData, summarize } from "../src/sanitize";

describe("sanitizeData", () => {
  it("returns undefined for null", () => {
    expect(sanitizeData(null)).toBeUndefined();
  });

  it("returns undefined for non-objects", () => {
    expect(sanitizeData("string")).toBeUndefined();
    expect(sanitizeData(42)).toBeUndefined();
    expect(sanitizeData(undefined)).toBeUndefined();
  });

  it("passes through JSON-safe objects", () => {
    expect(sanitizeData({ a: 1, b: "two" })).toEqual({ a: 1, b: "two" });
  });

  it("strips non-serializable values", () => {
    const circular: Record<string, unknown> = { a: 1 };
    circular.self = circular;
    expect(sanitizeData(circular)).toBeUndefined();
  });

  it("handles nested objects", () => {
    expect(sanitizeData({ a: { b: { c: 1 } } })).toEqual({ a: { b: { c: 1 } } });
  });
});

describe("summarize", () => {
  it("passes through small objects", () => {
    expect(summarize({ a: 1, b: "short" })).toEqual({ a: 1, b: "short" });
  });

  it("truncates long strings", () => {
    const long = "x".repeat(200);
    const result = summarize({ val: long });
    expect((result.val as string).length).toBeLessThan(200);
    expect((result.val as string).endsWith("…")).toBe(true);
  });

  it("summarizes arrays", () => {
    expect(summarize({ arr: [1, 2, 3] })).toEqual({ arr: "[Array(3)]" });
  });

  it("summarizes nested objects", () => {
    expect(summarize({ nested: { deep: true } })).toEqual({ nested: "[Object]" });
  });

  it("caps at 8 keys", () => {
    const big: Record<string, number> = {};
    for (let i = 0; i < 12; i++) big[`k${i}`] = i;
    const result = summarize(big);
    expect(Object.keys(result).length).toBe(9); // 8 keys + "…"
    expect(result["…"]).toBe("+4 more");
  });
});
