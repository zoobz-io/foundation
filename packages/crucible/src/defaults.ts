import type { HookLevelMap } from "./types";

/** Default log level and field mapping for Nuxt runtime hooks. */
export const defaultHookLevels: HookLevelMap = {
  // App lifecycle
  "app:created": "info",
  "app:beforeMount": "debug",
  "app:mounted": "info",
  "app:rendered": "debug",
  "app:redirected": "info",
  "app:suspense:resolve": "debug",

  // App errors
  "app:error": { level: "error", fields: ["message", "statusCode", "statusMessage", "url"] },
  "app:error:cleared": "warn",
  "app:chunkError": { level: "error", fields: ["message", "statusCode"] },

  // Data
  "app:data:refresh": "debug",
  "app:manifest:update": "info",

  // Page navigation
  "page:start": "debug",
  "page:finish": "info",
  "page:transition:finish": "debug",
  "page:view-transition:start": "debug",
  "page:loading:start": "debug",
  "page:loading:end": "debug",

  // Vue internals
  "vue:setup": "debug",
  "vue:error": { level: "error", fields: ["message", "stack"] },

  // Dev
  "dev:ssr-logs": "debug",

  // Prefetch
  "link:prefetch": "debug",

  // Nitro server hooks — narrow to useful request metadata
  "request": { level: "debug", fields: ["path", "method"] },
  "beforeResponse": { level: "debug", fields: ["path", "method"] },
  "afterResponse": { level: "debug", fields: ["path", "method"] },
  "error": { level: "error", fields: ["message", "statusCode", "statusMessage", "url"] },
  "close": "info",
  "render:before": "debug",
  "render:response": { level: "debug", fields: ["statusCode", "statusMessage"] },
};
