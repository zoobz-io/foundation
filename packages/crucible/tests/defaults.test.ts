import { describe, it, expect } from "vitest";
import { defaultHookLevels } from "../src/defaults";
import { hookEntryLevel, hookEntryFields } from "../src/guards";

describe("defaultHookLevels", () => {
  it("maps app:error to error with field narrowing", () => {
    const entry = defaultHookLevels["app:error"];
    expect(hookEntryLevel(entry)).toBe("error");
    expect(hookEntryFields(entry)).toEqual(["message", "statusCode", "statusMessage", "url"]);
  });

  it("maps app:chunkError to error with field narrowing", () => {
    const entry = defaultHookLevels["app:chunkError"];
    expect(hookEntryLevel(entry)).toBe("error");
    expect(hookEntryFields(entry)).toEqual(["message", "statusCode"]);
  });

  it("maps vue:error to error with field narrowing", () => {
    const entry = defaultHookLevels["vue:error"];
    expect(hookEntryLevel(entry)).toBe("error");
    expect(hookEntryFields(entry)).toEqual(["message", "stack"]);
  });

  it("narrows request hooks to path and method", () => {
    for (const hook of ["request", "beforeResponse", "afterResponse"]) {
      const entry = defaultHookLevels[hook];
      expect(hookEntryLevel(entry)).toBe("debug");
      expect(hookEntryFields(entry)).toEqual(["path", "method"]);
    }
  });

  it("narrows error hook to useful fields", () => {
    const entry = defaultHookLevels["error"];
    expect(hookEntryLevel(entry)).toBe("error");
    expect(hookEntryFields(entry)).toEqual(["message", "statusCode", "statusMessage", "url"]);
  });

  it("narrows render:response to status fields", () => {
    const entry = defaultHookLevels["render:response"];
    expect(hookEntryLevel(entry)).toBe("debug");
    expect(hookEntryFields(entry)).toEqual(["statusCode", "statusMessage"]);
  });

  it("maps app:error:cleared to warn", () => {
    expect(defaultHookLevels["app:error:cleared"]).toBe("warn");
  });

  it("maps app:created to info", () => {
    expect(defaultHookLevels["app:created"]).toBe("info");
  });

  it("maps page:finish to info", () => {
    expect(defaultHookLevels["page:finish"]).toBe("info");
  });

  it("maps page:start to debug", () => {
    expect(defaultHookLevels["page:start"]).toBe("debug");
  });

  it("shorthand entries have no fields", () => {
    expect(hookEntryFields("info")).toBeUndefined();
    expect(hookEntryFields("debug")).toBeUndefined();
  });

  it("has entries for all runtime hooks", () => {
    const expected = [
      "app:created", "app:beforeMount", "app:mounted", "app:rendered",
      "app:redirected", "app:suspense:resolve", "app:error", "app:error:cleared",
      "app:chunkError", "app:data:refresh", "app:manifest:update",
      "page:start", "page:finish", "page:transition:finish",
      "page:view-transition:start", "page:loading:start", "page:loading:end",
      "vue:setup", "vue:error", "dev:ssr-logs", "link:prefetch",
    ];
    for (const hook of expected) {
      expect(defaultHookLevels[hook]).toBeDefined();
    }
  });
});
