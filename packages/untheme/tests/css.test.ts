import { describe, it, expect } from "vitest";
import { isTokenReference, wrapValue, generateThemeCSS } from "../src/css";
import { defineTheme } from "../src/config";

describe("isTokenReference", () => {
  it("returns true for ref- prefix", () => {
    expect(isTokenReference("ref-blue-500")).toBe(true);
  });

  it("returns true for sys- prefix", () => {
    expect(isTokenReference("sys-primary")).toBe(true);
  });

  it("returns true for shiki- prefix", () => {
    expect(isTokenReference("shiki-comment")).toBe(true);
  });

  it("returns false for hex color", () => {
    expect(isTokenReference("#ff0000")).toBe(false);
  });

  it("returns false for plain value", () => {
    expect(isTokenReference("16px")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isTokenReference("")).toBe(false);
  });
});

describe("wrapValue", () => {
  it("wraps ref- token in var()", () => {
    expect(wrapValue("ref-blue-500")).toBe("var(--ref-blue-500)");
  });

  it("wraps sys- token in var()", () => {
    expect(wrapValue("sys-primary")).toBe("var(--sys-primary)");
  });

  it("wraps shiki- token in var()", () => {
    expect(wrapValue("shiki-comment")).toBe("var(--shiki-comment)");
  });

  it("leaves hex color unchanged", () => {
    expect(wrapValue("#ff0000")).toBe("#ff0000");
  });

  it("leaves plain value unchanged", () => {
    expect(wrapValue("16px")).toBe("16px");
  });
});

describe("generateThemeCSS", () => {
  it("generates :root and .dark blocks", () => {
    const css = generateThemeCSS(defineTheme({}));
    expect(css).toContain(":root {");
    expect(css).toContain(".dark {");
  });

  it("includes reference tokens as custom properties", () => {
    const css = generateThemeCSS(defineTheme({}));
    expect(css).toMatch(/--ref-slate-50: #/);
  });

  it("wraps mode token values in var()", () => {
    const css = generateThemeCSS(defineTheme({}));
    expect(css).toMatch(/--sys-primary: var\(--ref-/);
  });

  it("includes dark mode overrides", () => {
    const css = generateThemeCSS(defineTheme({}));
    const darkBlock = css.slice(css.indexOf(".dark {"));
    expect(darkBlock).toMatch(/--sys-surface: var\(--ref-/);
  });
});
