import { describe, it, expect } from "vitest";
import { defineIconic } from "../src/config";
import type { IconifyJSON } from "../src/config";

const testIconSet: IconifyJSON = {
  prefix: "test",
  icons: {
    home: {
      body: '<path d="M10 20v-6h4v6" fill="currentColor"/>',
      width: 24,
      height: 24,
    },
    star: {
      body: '<path d="M12 2l3 7h7l-5 5 2 7-7-4"/>',
    },
    empty: {
      body: "",
    },
  },
};

describe("defineIconic", () => {
  it("returns icon data for valid aliases", () => {
    const result = defineIconic(testIconSet, { home: "home" });
    expect(result.home).toBeDefined();
    expect(result.home.uri).toContain("data:image/svg+xml;utf8,");
    expect(result.home.mode).toBe("mask");
  });

  it("generates data URI containing the SVG body", () => {
    const result = defineIconic(testIconSet, { home: "home" });
    const decoded = decodeURIComponent(result.home.uri);
    expect(decoded).toContain("<path");
    expect(decoded).toContain("currentColor");
  });

  it("uses default 24x24 dimensions when not specified", () => {
    const result = defineIconic(testIconSet, { star: "star" });
    const decoded = decodeURIComponent(result.star.uri);
    expect(decoded).toContain('viewBox="0 0 24 24"');
  });

  it("uses icon-specified dimensions", () => {
    const customSet: IconifyJSON = {
      prefix: "custom",
      icons: {
        wide: { body: "<rect/>", width: 48, height: 32 },
      },
    };
    const result = defineIconic(customSet, { wide: "wide" });
    const decoded = decodeURIComponent(result.wide.uri);
    expect(decoded).toContain('viewBox="0 0 48 32"');
  });

  it("maps multiple aliases", () => {
    const result = defineIconic(testIconSet, {
      nav: "home",
      favorite: "star",
    });
    expect(result.nav).toBeDefined();
    expect(result.favorite).toBeDefined();
  });

  it("skips aliases that reference missing icons", () => {
    const result = defineIconic(testIconSet, {
      home: "home",
      missing: "nonexistent" as keyof typeof testIconSet.icons & string,
    });
    expect(result.home).toBeDefined();
    expect(result.missing).toBeUndefined();
  });

  it("wraps SVG with proper namespace and viewBox", () => {
    const result = defineIconic(testIconSet, { home: "home" });
    const decoded = decodeURIComponent(result.home.uri);
    expect(decoded).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(decoded).toContain('viewBox="0 0 24 24"');
  });

  it("returns empty record for empty aliases", () => {
    const result = defineIconic(testIconSet, {});
    expect(result).toEqual({});
  });
});
