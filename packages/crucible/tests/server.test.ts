import { describe, it, expect, vi, beforeEach } from "vitest";

const mockWrite = vi.fn();
const mockReadBody = vi.fn();
const mockReadRawBody = vi.fn();
const mockGetHeader = vi.fn();

vi.mock("h3", () => ({
  defineEventHandler: (fn: (event: unknown) => unknown) => fn,
  readBody: (...args: unknown[]) => mockReadBody(...args),
  readRawBody: (...args: unknown[]) => mockReadRawBody(...args),
  getRequestHeader: (...args: unknown[]) => mockGetHeader(...args),
}));

const { defineCrucibleHandler } = await import("../runtime/server");

const handler = defineCrucibleHandler({ write: mockWrite });

const makeEvent = () => ({ path: "/api/crucible", context: {} });

beforeEach(() => {
  vi.clearAllMocks();
});

describe("defineCrucibleHandler", () => {
  describe("log entries", () => {
    it("calls write for each valid log entry", async () => {
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        { level: "info", message: "hello", timestamp: 1 },
        { level: "error", message: "fail", timestamp: 2 },
      ]);
      await handler(makeEvent());
      expect(mockWrite).toHaveBeenCalledTimes(2);
      expect(mockWrite.mock.calls[0][0].message).toBe("hello");
      expect(mockWrite.mock.calls[0][0].source).toBe("client");
      expect(mockWrite.mock.calls[1][0].message).toBe("fail");
    });

    it("skips invalid entries", async () => {
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        { level: "info", message: "valid", timestamp: 1 },
        { invalid: true },
        "not an object",
      ]);
      await handler(makeEvent());
      expect(mockWrite).toHaveBeenCalledTimes(1);
    });

    it("handles empty array", async () => {
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([]);
      const result = await handler(makeEvent());
      expect(result).toEqual({ ok: true });
      expect(mockWrite).not.toHaveBeenCalled();
    });

    it("handles non-array body", async () => {
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue({ not: "array" });
      const result = await handler(makeEvent());
      expect(result).toEqual({ ok: true });
      expect(mockWrite).not.toHaveBeenCalled();
    });
  });

  describe("span entries", () => {
    it("accepts valid span entries", async () => {
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        {
          kind: "span",
          traceId: "a".repeat(32),
          spanId: "b".repeat(16),
          name: "navigation",
          startTime: 1000,
          endTime: 2000,
          status: "ok",
        },
      ]);
      await handler(makeEvent());
      expect(mockWrite).toHaveBeenCalledTimes(1);
      expect(mockWrite.mock.calls[0][0].kind).toBe("span");
      expect(mockWrite.mock.calls[0][0].name).toBe("navigation");
      expect(mockWrite.mock.calls[0][0].source).toBe("client");
    });
  });

  describe("metric entries", () => {
    it("accepts valid metric entries", async () => {
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        {
          kind: "metric",
          name: "web_vital.lcp",
          value: 2500,
          timestamp: 1000,
        },
      ]);
      await handler(makeEvent());
      expect(mockWrite).toHaveBeenCalledTimes(1);
      expect(mockWrite.mock.calls[0][0].kind).toBe("metric");
      expect(mockWrite.mock.calls[0][0].name).toBe("web_vital.lcp");
      expect(mockWrite.mock.calls[0][0].source).toBe("client");
    });
  });

  describe("mixed batches", () => {
    it("processes logs, spans, and metrics in one batch", async () => {
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        { level: "info", message: "log", timestamp: 1 },
        { kind: "span", traceId: "a".repeat(32), spanId: "b".repeat(16), name: "nav", startTime: 1, endTime: 2, status: "ok" },
        { kind: "metric", name: "lcp", value: 100, timestamp: 1 },
        { kind: "unknown", bad: true },
      ]);
      await handler(makeEvent());
      expect(mockWrite).toHaveBeenCalledTimes(3);
    });
  });

  describe("options", () => {
    it("filters log entries below minLevel but passes spans/metrics", async () => {
      const optWrite = vi.fn();
      const optHandler = defineCrucibleHandler(
        { write: optWrite },
        { minLevel: "warn" },
      );
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        { level: "info", message: "below min", timestamp: 1 },
        { level: "warn", message: "at min", timestamp: 2 },
        { kind: "span", traceId: "a".repeat(32), spanId: "b".repeat(16), name: "nav", startTime: 1, endTime: 2, status: "ok" },
        { kind: "metric", name: "lcp", value: 100, timestamp: 1 },
      ]);
      await optHandler(makeEvent());
      expect(optWrite).toHaveBeenCalledTimes(3);
      expect(optWrite.mock.calls[0][0].message).toBe("at min");
      expect(optWrite.mock.calls[1][0].kind).toBe("span");
      expect(optWrite.mock.calls[2][0].kind).toBe("metric");
    });

    it("uses defaults when no options provided", async () => {
      const noOptHandler = defineCrucibleHandler({ write: vi.fn() });
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([]);
      const result = await noOptHandler(makeEvent());
      expect(result).toEqual({ ok: true });
    });
  });

  describe("sendBeacon (text/plain)", () => {
    it("parses JSON from text body", async () => {
      mockGetHeader.mockReturnValue("text/plain");
      mockReadRawBody.mockResolvedValue(JSON.stringify([
        { level: "warn", message: "beacon", timestamp: 3 },
      ]));
      await handler(makeEvent());
      expect(mockWrite).toHaveBeenCalledTimes(1);
      expect(mockWrite.mock.calls[0][0].message).toBe("beacon");
      expect(mockWrite.mock.calls[0][0].source).toBe("client");
    });

    it("handles malformed text body", async () => {
      mockGetHeader.mockReturnValue("text/plain");
      mockReadRawBody.mockResolvedValue("not json");
      const result = await handler(makeEvent());
      expect(result).toEqual({ ok: true });
      expect(mockWrite).not.toHaveBeenCalled();
    });
  });
});
