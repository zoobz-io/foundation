import { defineEventHandler, readBody, readRawBody, getRequestHeader } from "h3";
import { useNitroApp } from "nitropack/runtime";
import type { LogLevel, LogEntry, HookLevelMap, HookEntry } from "../src/types";
import { meetsLevel } from "../src/levels";
import { isLogEntry, isLogLevel, hookEntryLevel, hookEntryFields } from "../src/guards";
import { extractData, sanitizeData } from "../src/sanitize";

export interface CrucibleHandler {
  write: (entry: LogEntry) => void | Promise<void>;
}

export interface CrucibleHandlerOptions {
  minLevel?: LogLevel;
  hookLevels?: HookLevelMap;
}

let initialized = false;

export const defineCrucibleHandler = (handler: CrucibleHandler, options?: CrucibleHandlerOptions) => {
  const hookMap = (options?.hookLevels ?? {}) as Record<string, HookEntry>;
  const envLevel = process.env.LOG_LEVEL;
  const minimum: LogLevel = options?.minLevel ?? (isLogLevel(envLevel) ? envLevel : "debug");

  return defineEventHandler(async (event) => {
    // Idempotently register afterEach on the Nitro hook system
    if (!initialized) {
      initialized = true;
      const nitro = useNitroApp();
      nitro.hooks.afterEach((hookEvent: { name: string | symbol; args: unknown[] }) => {
        const name = String(hookEvent.name);

        // log:* hooks carry a full LogEntry as the first argument
        if (name.startsWith("log:") && isLogEntry(hookEvent.args[0])) {
          const entry = hookEvent.args[0];
          if (!meetsLevel(entry.level, minimum)) return;
          handler.write({ ...entry, data: sanitizeData(entry.data), source: "server" });
          return;
        }

        const entry = hookMap[name] || "debug";
        const level: LogLevel = hookEntryLevel(entry);
        if (!meetsLevel(level, minimum)) return;

        const fields = hookEntryFields(entry);
        const data = extractData(hookEvent.args[0], fields);

        handler.write({
          level,
          message: name,
          timestamp: Date.now(),
          hook: name,
          source: "server",
          ...(data ? { data } : {}),
        });
      });
    }

    // Receive client log batches
    const contentType = getRequestHeader(event, "content-type") || "";

    let entries: unknown[];
    if (contentType.includes("application/json")) {
      const body = await readBody(event);
      entries = Array.isArray(body) ? body : [];
    } else {
      const raw = await readRawBody(event, "utf-8");
      if (!raw) return { ok: true };
      try {
        const parsed: unknown = JSON.parse(raw);
        entries = Array.isArray(parsed) ? parsed : [];
      } catch {
        return { ok: true };
      }
    }

    for (const entry of entries) {
      if (!isLogEntry(entry)) continue;

      // log:* entries sanitize but don't narrow
      if (entry.hook?.startsWith("log:")) {
        await handler.write({ ...entry, data: sanitizeData(entry.data), source: "client" });
        continue;
      }

      // Apply field narrowing for hook entries
      const hookEntry = entry.hook ? hookMap[entry.hook] : undefined;
      const fields = hookEntry ? hookEntryFields(hookEntry) : undefined;
      const data = entry.data ? extractData(entry.data, fields) : undefined;

      await handler.write({
        ...entry,
        source: "client",
        data,
      });
    }

    return { ok: true };
  });
};
