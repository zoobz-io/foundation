export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

/**
 * Log data interface. Consumers extend via module augmentation:
 *
 * declare module "@zoobz-io/crucible/types" {
 *   interface LogData {
 *     userId: string;
 *     requestId: string;
 *     duration: number;
 *   }
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogData {}

export type LogPayload = [keyof LogData] extends [never]
  ? Record<string, unknown>
  : Partial<LogData>;

/** Unified log entry. */
export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: LogPayload;
  timestamp: number;
  hook?: string;
  source?: "server" | "client";
}

/** Extended hook config — level + optional field narrowing. */
export interface HookConfig {
  level: LogLevel;
  /** When set, only these fields are included from hook arg data. */
  fields?: string[];
}

/** Hook value — shorthand level string or full config. */
export type HookEntry = LogLevel | HookConfig;

/** Maps Nuxt hook names to log levels or hook configs. */
export type HookLevelMap = Record<string, HookEntry>;

/** Config for the crucible module. */
export interface CrucibleConfig {
  /** Minimum log level to emit. Default: "debug" in dev, "info" in production. */
  level?: LogLevel;
  /** Map Nuxt hook names to log levels. Unmapped hooks default to "debug". */
  hooks?: HookLevelMap;
  /** Batch client log transmission. Default: false in dev, true in production. */
  batch?: boolean;
}
