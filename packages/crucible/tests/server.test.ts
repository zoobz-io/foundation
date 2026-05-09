import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("nitropack/runtime", () => ({
  useNitroApp: () => ({
    hooks: { afterEach: vi.fn() },
  }),
}));

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
  describe("JSON entries", () => {
    it("calls write for each valid entry", async () => {
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

  describe("field narrowing", () => {
    it("narrows data to configured fields for hook entries", async () => {
      const narrowWrite = vi.fn();
      const narrowHandler = defineCrucibleHandler(
        { write: narrowWrite },
        { hookLevels: { "test:hook": { level: "info", fields: ["from", "to"] } } },
      );
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        { level: "info", message: "test:hook", timestamp: 1, hook: "test:hook", data: { from: "a", to: "b", extra: "dropped" } },
      ]);
      await narrowHandler(makeEvent());
      expect(narrowWrite).toHaveBeenCalledTimes(1);
      expect(narrowWrite.mock.calls[0][0].data).toEqual({ from: "a", to: "b" });
    });

    it("passes through log:* entry data without narrowing", async () => {
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        { level: "error", message: "oops", timestamp: 1, hook: "log:error", data: { full: "payload", all: "fields" } },
      ]);
      await handler(makeEvent());
      expect(mockWrite).toHaveBeenCalledTimes(1);
      expect(mockWrite.mock.calls[0][0].data).toEqual({ full: "payload", all: "fields" });
    });

    it("summarizes data when no fields configured for hook", async () => {
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        { level: "info", message: "test:unknown", timestamp: 1, hook: "test:unknown", data: { a: 1, b: "short" } },
      ]);
      await handler(makeEvent());
      expect(mockWrite).toHaveBeenCalledTimes(1);
      expect(mockWrite.mock.calls[0][0].data).toEqual({ a: 1, b: "short" });
    });
  });

  describe("options", () => {
    it("accepts minLevel and hookLevels options", async () => {
      const optWrite = vi.fn();
      const optHandler = defineCrucibleHandler(
        { write: optWrite },
        { minLevel: "warn", hookLevels: { "test:hook": "error" } },
      );
      mockGetHeader.mockReturnValue("application/json");
      mockReadBody.mockResolvedValue([
        { level: "info", message: "below min", timestamp: 1 },
      ]);
      await optHandler(makeEvent());
      // Entry level "info" is below "warn" minimum but handler still writes client entries
      // (minLevel filtering is for hook observation, not client batches)
      expect(optWrite).toHaveBeenCalledTimes(1);
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
