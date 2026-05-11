import {
  defineNuxtModule,
  addTemplate,
  addPlugin,
  addServerPlugin,
  addImports,
  addTypeTemplate,
  createResolver,
} from "@nuxt/kit";

import type { CrucibleConfig } from "./types";

export default defineNuxtModule<CrucibleConfig>({
  meta: {
    name: "crucible",
    configKey: "crucible",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const level = options.level || process.env.LOG_LEVEL || (nuxt.options.dev ? "debug" : "info");
    const batch = options.batch ?? !nuxt.options.dev;
    const traces = options.traces ?? true;
    const metrics = options.metrics ?? true;

    // Virtual module — serializable config
    addTemplate({
      filename: "crucible.config.mjs",
      write: true,
      getContents: () => `export default ${JSON.stringify({ minLevel: level, batch, traces, metrics }, null, 2)};`,
    });

    // Expose $transmit type augmentation to consumers
    addTypeTemplate({
      filename: "crucible.types.d.ts",
      getContents: () => `export {} from "${resolver.resolve("./types")}";`,
    });

    // Auto-import observability utilities
    addImports([
      { name: "log", from: resolver.resolve("../runtime/composables") },
      { name: "startSpan", from: resolver.resolve("../runtime/composables") },
    ]);

    // Register client plugin for batching + log transmission
    addPlugin({ src: resolver.resolve("../runtime/plugin.client"), mode: "client" });

    // Register Nitro plugin for server request tracing
    if (traces !== false) {
      const serverTracing = traces === true || (typeof traces === "object" && traces.server !== false);
      if (serverTracing) {
        addServerPlugin(resolver.resolve("../runtime/plugin.server"));
      }
    }
  },
});
