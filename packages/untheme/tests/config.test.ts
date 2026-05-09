import { describe, it, expect } from "vitest";
import { defineTheme, isTheme } from "../src/config";

describe("defineTheme", () => {
  it("returns a complete theme with defaults when given empty overrides", () => {
    const theme = defineTheme({});
    expect(theme.reference).toBeDefined();
    expect(theme.modes.light).toBeDefined();
    expect(theme.modes.dark).toBeDefined();
  });

  it("merges user reference tokens over defaults", () => {
    const theme = defineTheme({
      reference: { "ref-black": "#111111" },
    });
    expect(theme.reference["ref-black"]).toBe("#111111");
  });

  it("preserves default tokens not overridden", () => {
    const base = defineTheme({});
    const custom = defineTheme({ reference: { "ref-black": "#111111" } });
    expect(custom.reference["ref-white"]).toBe(base.reference["ref-white"]);
  });

  it("merges mode token overrides", () => {
    const theme = defineTheme({
      modes: {
        light: { "sys-primary": "ref-red-500" },
      },
    });
    expect(theme.modes.light["sys-primary"]).toBe("ref-red-500");
  });

  it("defaults label to empty string", () => {
    const theme = defineTheme({});
    expect(theme.label).toBe("");
  });

  it("preserves a custom label", () => {
    const theme = defineTheme({ label: "My Theme" });
    expect(theme.label).toBe("My Theme");
  });

  it("preserves default mode tokens not overridden", () => {
    const base = defineTheme({});
    const custom = defineTheme({
      modes: { light: { "sys-primary": "ref-red-500" } },
    });
    expect(custom.modes.light["sys-surface"]).toBe(base.modes.light["sys-surface"]);
    expect(custom.modes.dark["sys-primary"]).toBe(base.modes.dark["sys-primary"]);
  });
});

describe("isTheme", () => {
  it("returns true for a valid theme", () => {
    expect(isTheme(defineTheme({}))).toBe(true);
  });

  it("returns true for an object with reference and modes", () => {
    expect(isTheme({ reference: {}, modes: {} })).toBe(true);
  });

  it("returns false for null", () => {
    expect(isTheme(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isTheme(undefined)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isTheme("theme")).toBe(false);
  });

  it("returns false for an object missing reference", () => {
    expect(isTheme({ modes: {} })).toBe(false);
  });

  it("returns false for an object missing modes", () => {
    expect(isTheme({ reference: {} })).toBe(false);
  });
});
