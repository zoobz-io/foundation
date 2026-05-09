import { describe, it, expect } from "vitest";
import { isLogEntry, isLogLevel, isHookConfig, hookEntryLevel, hookEntryFields } from "../src/guards";

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
  it("accepts a valid entry", () => {
    expect(isLogEntry({
      level: "info",
      message: "hello",
      timestamp: Date.now(),
    })).toBe(true);
  });

  it("accepts entry with optional fields", () => {
    expect(isLogEntry({
      level: "error",
      message: "fail",
      timestamp: Date.now(),
      data: { userId: "123" },
      hook: "app:error",
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

describe("isHookConfig", () => {
  it("accepts object with level", () => {
    expect(isHookConfig({ level: "info" })).toBe(true);
  });

  it("accepts object with level and fields", () => {
    expect(isHookConfig({ level: "warn", fields: ["from", "to"] })).toBe(true);
  });

  it("rejects string", () => {
    expect(isHookConfig("info")).toBe(false);
  });

  it("rejects object with invalid level", () => {
    expect(isHookConfig({ level: "trace" })).toBe(false);
  });

  it("rejects null", () => {
    expect(isHookConfig(null)).toBe(false);
  });
});

describe("hookEntryLevel", () => {
  it("extracts level from shorthand string", () => {
    expect(hookEntryLevel("debug")).toBe("debug");
    expect(hookEntryLevel("error")).toBe("error");
  });

  it("extracts level from config object", () => {
    expect(hookEntryLevel({ level: "warn" })).toBe("warn");
    expect(hookEntryLevel({ level: "info", fields: ["a"] })).toBe("info");
  });
});

describe("hookEntryFields", () => {
  it("returns undefined for shorthand string", () => {
    expect(hookEntryFields("info")).toBeUndefined();
  });

  it("returns undefined for config without fields", () => {
    expect(hookEntryFields({ level: "info" })).toBeUndefined();
  });

  it("returns fields array from config", () => {
    expect(hookEntryFields({ level: "info", fields: ["from", "to"] })).toEqual(["from", "to"]);
  });
});
