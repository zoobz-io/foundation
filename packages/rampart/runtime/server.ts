import { defineEventHandler, getRequestPath, sendRedirect, createError } from "h3";
import type { H3Event } from "h3";
import { useNitroApp } from "nitropack/runtime";
import type { RampartHandlers, RampartConfig } from "../src/types";
import { getSession, setSession, clearSession, isCacheFresh } from "./session";
import "../src/hooks";

const nitro = () => useNitroApp();

const INTERNAL_PREFIXES = ["/_nuxt/", "/__", "/api/_"];

/**
 * Checks if the access token is near expiry and refreshes if needed.
 * Exported so API proxy routes can call it before forwarding requests.
 *
 * Updates event.context and persists to the session on success.
 * Returns true if the token is valid, false if refresh failed.
 */
export const ensureFreshToken = async (
  event: H3Event,
  handlers: RampartHandlers,
  threshold = 600000,
): Promise<boolean> => {
  if (!handlers.refresh) return true;

  const expiresAt = event.context.tokenExpiresAt as number | undefined;
  if (!expiresAt) return true;

  if (Date.now() + threshold < expiresAt) return true;

  const tokens = await handlers.refresh(event);
  if (!tokens) {
    nitro().hooks.callHook("rampart:expired");
    return false;
  }

  event.context.accessToken = tokens.accessToken;
  event.context.tokenExpiresAt = tokens.expiresAt;

  // Persist refreshed tokens to the session
  const session = await getSession(event);
  if (session) {
    await setSession(event, { ...session, tokens });
  }

  nitro().hooks.callHook("rampart:refresh");
  return true;
};

/**
 * Single entry point for auth. Handles middleware, login, logout, and token refresh.
 * Rampart owns the session and context binding — consumer provides callbacks.
 */
export const defineAuthHandlers = (handlers: RampartHandlers, config?: Partial<RampartConfig>) => {
  const basePath = config?.basePath || "/auth";
  const publicRoutes = config?.publicRoutes || [];
  const refreshThreshold = config?.refreshThreshold || 600000;
  const meCacheTTL = config?.meCacheTTL ?? 300000;

  const loginPath = `${basePath}/login`;
  const logoutPath = `${basePath}/logout`;

  const isPublic = (path: string): boolean => {
    if (INTERNAL_PREFIXES.some((p) => path.startsWith(p))) return true;
    if (path.startsWith(`${basePath}/`)) return true;
    return publicRoutes.some((route) =>
      path === route || path.startsWith(`${route}/`),
    );
  };

  return defineEventHandler(async (event) => {
    const path = getRequestPath(event);

    // Login — redirect to auth provider
    if (path === loginPath) {
      return handlers.login(event);
    }

    // Callback — handle OAuth return, persist session
    if (path.startsWith(`${loginPath}/`)) {
      return handlers.callback(event, {
        setSession: async (identity) => {
          await setSession(event, identity);
          nitro().hooks.callHook("rampart:login", { userId: identity.user.id });
        },
      });
    }

    // Logout — clear session first, then let consumer do provider cleanup
    if (path === logoutPath || path.startsWith(`${logoutPath}/`)) {
      await clearSession(event);
      await handlers.logout(event);
      nitro().hooks.callHook("rampart:logout");
      return sendRedirect(event, loginPath);
    }

    // Public routes — no auth required
    if (isPublic(path)) return;

    // Read session from sealed cookie
    const session = await getSession(event);

    if (!session) {
      if (path.startsWith("/api/")) {
        throw createError({ statusCode: 401, message: "Unauthorized" });
      }
      return sendRedirect(event, loginPath);
    }

    // Use cached identity if fresh, otherwise call me() and cache the result
    let identity = session;

    if (!isCacheFresh(session, meCacheTTL)) {
      const enriched = await handlers.me(event, session);

      if (!enriched) {
        await clearSession(event);
        if (path.startsWith("/api/")) {
          throw createError({ statusCode: 401, message: "Unauthorized" });
        }
        return sendRedirect(event, loginPath);
      }

      identity = enriched;
      await setSession(event, identity);
    }

    // Rampart owns context binding
    event.context.user = identity.user;
    if (identity.tokens) {
      event.context.accessToken = identity.tokens.accessToken;
      event.context.tokenExpiresAt = identity.tokens.expiresAt;
    }

    // Proactively refresh token if near expiry
    const tokenFresh = await ensureFreshToken(event, handlers, refreshThreshold);
    if (!tokenFresh) {
      if (path.startsWith("/api/")) {
        throw createError({ statusCode: 401, message: "Session expired" });
      }
      return sendRedirect(event, loginPath);
    }
  });
};
