import type { LogEntry, LogLevel, HookEntry, HookConfig } from "./types";

const LOG_LEVELS: Set<string> = new Set(["debug", "info", "warn", "error", "fatal"]);

/** Type guard for LogEntry — validates shape without casting. */
export const isLogEntry = (value: unknown): value is LogEntry => {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.level === "string" &&
    LOG_LEVELS.has(obj.level) &&
    typeof obj.message === "string" &&
    typeof obj.timestamp === "number"
  );
};

/** Type guard for LogLevel. */
export const isLogLevel = (value: unknown): value is LogLevel =>
  typeof value === "string" && LOG_LEVELS.has(value);

/** Type guard for HookConfig (object form). */
export const isHookConfig = (value: unknown): value is HookConfig =>
  typeof value === "object" && value !== null && "level" in value && isLogLevel((value as HookConfig).level);

/** Normalize a HookEntry to its level. */
export const hookEntryLevel = (entry: HookEntry): LogLevel =>
  isLogLevel(entry) ? entry : entry.level;

/** Extract the fields filter from a HookEntry, if any. */
export const hookEntryFields = (entry: HookEntry): string[] | undefined =>
  isHookConfig(entry) ? entry.fields : undefined;
