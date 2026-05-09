import { describe, it, expect, vi, beforeEach } from "vitest";

const mockExistsSync = vi.fn();
const mockReadFileSync = vi.fn();

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  const mocked = {
    ...actual,
    existsSync: (...args: unknown[]) => mockExistsSync(...args),
    readFileSync: (...args: unknown[]) => mockReadFileSync(...args),
  };
  return { ...mocked, default: mocked };
});

vi.mock("h3", () => ({
  defineEventHandler: (fn: (event: unknown) => unknown) => fn,
  getRouterParams: (event: { params: Record<string, string> }) => event.params,
}));

const handler = (await import("../runtime/server")).default;

const makeEvent = (theme?: string) => ({
  params: theme ? { theme } : {},
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("untheme server handler", () => {
  it("returns {} when no theme param", () => {
    const result = handler(makeEvent());
    expect(result).toEqual({});
  });

  it("returns {} when theme file does not exist", () => {
    mockExistsSync.mockReturnValue(false);
    const result = handler(makeEvent("missing"));
    expect(result).toEqual({});
  });

  it("returns parsed theme JSON when file exists", () => {
    const themeData = { label: "Test", reference: {}, modes: { light: {}, dark: {} } };
    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(JSON.stringify(themeData));
    const result = handler(makeEvent("test"));
    expect(result).toEqual(themeData);
  });

  it("reads from .untheme/{theme}.json path", () => {
    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue("{}");
    handler(makeEvent("cyberdream"));
    const readPath = mockReadFileSync.mock.calls[0][0] as string;
    expect(readPath).toContain(".untheme");
    expect(readPath).toContain("cyberdream.json");
  });
});
