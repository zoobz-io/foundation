import { describe, it, expect, vi, beforeEach } from "vitest";
import type { RampartHandlers, RampartUser, RampartIdentity } from "../src/types";

const testConfig = {
  basePath: "/auth",
  publicRoutes: ["/", "/about"],
  refreshThreshold: 600000,
  forbiddenRoute: "",
  meCacheTTL: 0, // disable caching in tests so me() is always called
};

const mockGetSession = vi.fn();
const mockSetSession = vi.fn();
const mockClearSession = vi.fn();
const mockIsCacheFresh = vi.fn().mockReturnValue(false);
vi.mock("../runtime/session", () => ({
  isCacheFresh: (...args: unknown[]) => mockIsCacheFresh(...args),
  getSession: (...args: unknown[]) => mockGetSession(...args),
  setSession: (...args: unknown[]) => mockSetSession(...args),
  clearSession: (...args: unknown[]) => mockClearSession(...args),
}));

const mockCallHook = vi.fn();
vi.mock("nitropack/runtime", () => ({
  useNitroApp: () => ({ hooks: { callHook: mockCallHook } }),
}));

const mockRedirect = vi.fn();
vi.mock("h3", () => ({
  defineEventHandler: (fn: (event: unknown) => unknown) => fn,
  getRequestPath: (event: { path: string }) => event.path,
  sendRedirect: (...args: unknown[]) => mockRedirect(...args),
  createError: (opts: Record<string, unknown>) => {
    const err = new Error(opts.message as string) as Error & Record<string, unknown>;
    err.statusCode = opts.statusCode;
    return err;
  },
}));

const { defineAuthHandlers, ensureFreshToken } = await import("../runtime/server");

const fakeUser: RampartUser = { id: "user-1" };
const fakeIdentity: RampartIdentity = {
  user: fakeUser,
  tokens: { accessToken: "tok-123", expiresAt: Date.now() + 3600000 },
};

const makeHandlers = (meResult: RampartIdentity | null = fakeIdentity): RampartHandlers => ({
  me: vi.fn().mockResolvedValue(meResult),
  login: vi.fn(),
  callback: vi.fn(),
  logout: vi.fn(),
});

const makeEvent = (path: string, context: Record<string, unknown> = {}) => ({
  path,
  context: { ...context },
});

beforeEach(() => {
  vi.clearAllMocks();
  mockGetSession.mockResolvedValue(fakeIdentity);
});

describe("defineAuthHandlers", () => {
  describe("login", () => {
    it("calls handlers.login for /auth/login", async () => {
      const handlers = makeHandlers();
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/auth/login");
      await handler(event);
      expect(handlers.login).toHaveBeenCalledWith(event);
      expect(handlers.me).not.toHaveBeenCalled();
    });
  });

  describe("callback", () => {
    it("calls handlers.callback with session helpers for /auth/login/*", async () => {
      const handlers = makeHandlers();
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/auth/login/callback");
      await handler(event);
      expect(handlers.callback).toHaveBeenCalledWith(event, { setSession: expect.any(Function) });
      expect(handlers.login).not.toHaveBeenCalled();
    });
  });

  describe("logout", () => {
    it("clears session, calls handler, and redirects", async () => {
      const handlers = makeHandlers();
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/auth/logout");
      await handler(event);
      expect(mockClearSession).toHaveBeenCalledWith(event);
      expect(handlers.logout).toHaveBeenCalledWith(event);
      expect(mockRedirect).toHaveBeenCalledWith(event, "/auth/login");
    });
  });

  describe("public routes", () => {
    it("skips auth for configured public routes", async () => {
      const handlers = makeHandlers();
      const handler = defineAuthHandlers(handlers, testConfig);
      await handler(makeEvent("/about"));
      expect(mockGetSession).not.toHaveBeenCalled();
    });

    it("skips auth for root", async () => {
      const handlers = makeHandlers();
      const handler = defineAuthHandlers(handlers, testConfig);
      await handler(makeEvent("/"));
      expect(mockGetSession).not.toHaveBeenCalled();
    });

    it("skips /_nuxt/ and /__ paths", async () => {
      const handlers = makeHandlers();
      const handler = defineAuthHandlers(handlers, testConfig);
      await handler(makeEvent("/_nuxt/chunk.js"));
      await handler(makeEvent("/__nuxt_error"));
      expect(mockGetSession).not.toHaveBeenCalled();
    });
  });

  describe("protected routes", () => {
    it("reads session, calls me with session data, binds context", async () => {
      const handlers = makeHandlers();
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/dashboard");
      await handler(event);
      expect(mockGetSession).toHaveBeenCalledWith(event);
      expect(handlers.me).toHaveBeenCalledWith(event, fakeIdentity);
      expect(event.context.user).toEqual(fakeUser);
      expect(event.context.accessToken).toBe("tok-123");
    });

    it("redirects to login when no session", async () => {
      mockGetSession.mockResolvedValue(null);
      const handlers = makeHandlers();
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/dashboard");
      await handler(event);
      expect(mockRedirect).toHaveBeenCalledWith(event, "/auth/login");
    });

    it("throws 401 for unauthenticated API routes", async () => {
      mockGetSession.mockResolvedValue(null);
      const handlers = makeHandlers();
      const handler = defineAuthHandlers(handlers, testConfig);
      await expect(handler(makeEvent("/api/data"))).rejects.toMatchObject({ statusCode: 401 });
    });

    it("clears session and redirects when me returns null", async () => {
      const handlers = makeHandlers(null);
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/dashboard");
      await handler(event);
      expect(mockClearSession).toHaveBeenCalledWith(event);
      expect(mockRedirect).toHaveBeenCalledWith(event, "/auth/login");
    });
  });

  describe("token refresh", () => {
    it("calls refresh when token is near expiry", async () => {
      const nearExpiry: RampartIdentity = {
        user: fakeUser,
        tokens: { accessToken: "old-tok", expiresAt: Date.now() + 300000 },
      };
      mockGetSession.mockResolvedValue(nearExpiry);
      const handlers = makeHandlers(nearExpiry);
      handlers.refresh = vi.fn().mockResolvedValue({ accessToken: "new-tok", expiresAt: Date.now() + 3600000 });
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/dashboard");
      await handler(event);
      expect(handlers.refresh).toHaveBeenCalledWith(event);
      expect(event.context.accessToken).toBe("new-tok");
    });

    it("skips refresh when token is not near expiry", async () => {
      const handlers = makeHandlers();
      handlers.refresh = vi.fn();
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/dashboard");
      await handler(event);
      expect(handlers.refresh).not.toHaveBeenCalled();
    });

    it("redirects to login when refresh fails", async () => {
      const nearExpiry: RampartIdentity = {
        user: fakeUser,
        tokens: { accessToken: "old", expiresAt: Date.now() + 300000 },
      };
      mockGetSession.mockResolvedValue(nearExpiry);
      const handlers = makeHandlers(nearExpiry);
      handlers.refresh = vi.fn().mockResolvedValue(null);
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/dashboard");
      await handler(event);
      expect(mockRedirect).toHaveBeenCalledWith(event, "/auth/login");
    });

    it("works when identity has no tokens", async () => {
      const noTokens: RampartIdentity = { user: fakeUser };
      mockGetSession.mockResolvedValue(noTokens);
      const handlers = makeHandlers(noTokens);
      const handler = defineAuthHandlers(handlers, testConfig);
      const event = makeEvent("/dashboard");
      await handler(event);
      expect(event.context.user).toEqual(fakeUser);
      expect(event.context.accessToken).toBeUndefined();
    });
  });
});

describe("ensureFreshToken", () => {
  it("returns true when no refresh handler", async () => {
    const handlers = makeHandlers();
    const event = makeEvent("/api/data", { tokenExpiresAt: Date.now() + 100 });
    const result = await ensureFreshToken(event, handlers);
    expect(result).toBe(true);
  });

  it("returns true when no expiresAt in context", async () => {
    const handlers = makeHandlers();
    handlers.refresh = vi.fn();
    const event = makeEvent("/api/data");
    const result = await ensureFreshToken(event, handlers);
    expect(result).toBe(true);
    expect(handlers.refresh).not.toHaveBeenCalled();
  });

  it("refreshes and updates context when near expiry", async () => {
    const handlers = makeHandlers();
    const newExpiry = Date.now() + 3600000;
    handlers.refresh = vi.fn().mockResolvedValue({ accessToken: "fresh", expiresAt: newExpiry });
    mockGetSession.mockResolvedValue(fakeIdentity);
    const event = makeEvent("/api/data", { tokenExpiresAt: Date.now() + 100 });
    const result = await ensureFreshToken(event, handlers);
    expect(result).toBe(true);
    expect(event.context.accessToken).toBe("fresh");
    expect(mockSetSession).toHaveBeenCalled();
  });

  it("returns false when refresh returns null", async () => {
    const handlers = makeHandlers();
    handlers.refresh = vi.fn().mockResolvedValue(null);
    const event = makeEvent("/api/data", { tokenExpiresAt: Date.now() + 100 });
    const result = await ensureFreshToken(event, handlers);
    expect(result).toBe(false);
  });
});

describe("me caching", () => {
  it("skips me() when cache is fresh", async () => {
    mockIsCacheFresh.mockReturnValue(true);
    const handlers = makeHandlers();
    const handler = defineAuthHandlers(handlers, testConfig);
    const event = makeEvent("/dashboard");
    await handler(event);
    expect(handlers.me).not.toHaveBeenCalled();
    expect(event.context.user).toEqual(fakeUser);
    mockIsCacheFresh.mockReturnValue(false);
  });

  it("calls me() when cache is stale and persists result", async () => {
    mockIsCacheFresh.mockReturnValue(false);
    const handlers = makeHandlers();
    const handler = defineAuthHandlers(handlers, testConfig);
    const event = makeEvent("/dashboard");
    await handler(event);
    expect(handlers.me).toHaveBeenCalledWith(event, fakeIdentity);
    expect(mockSetSession).toHaveBeenCalled();
  });
});
