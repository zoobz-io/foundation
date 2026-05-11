import { defineNitroPlugin } from "nitropack/runtime";
import { useCrucibleWriter } from "@zoobz-io/crucible/server";
import type { LogLevel, LogEntry } from "@zoobz-io/crucible/types";

const entry = (level: LogLevel, message: string, data?: Record<string, unknown>): LogEntry => ({
  level,
  message,
  timestamp: Date.now(),
  source: "server",
  ...(data ? { data } : {}),
});

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("rampart:login", ({ userId }) => {
    useCrucibleWriter()?.(entry("info", "User logged in", { userId }));
  });
  nitro.hooks.hook("rampart:logout", () => {
    useCrucibleWriter()?.(entry("info", "User logged out"));
  });
  nitro.hooks.hook("rampart:refresh", () => {
    useCrucibleWriter()?.(entry("debug", "Token refreshed"));
  });
  nitro.hooks.hook("rampart:expired", () => {
    useCrucibleWriter()?.(entry("warn", "Session expired"));
  });
});
