import {
  defineNuxtModule,
  addTemplate,
  addPlugin,
  addImports,
  addTypeTemplate,
  createResolver,
} from "@nuxt/kit";

import type { CrucibleConfig } from "./types";
import { defaultHookLevels } from "./defaults";

export default defineNuxtModule<CrucibleConfig>({
  meta: {
    name: "crucible",
    configKey: "crucible",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const level = options.level || process.env.LOG_LEVEL || (nuxt.options.dev ? "debug" : "info");
    const hookLevels = { ...defaultHookLevels, ...options.hooks };
    const batch = options.batch ?? !nuxt.options.dev;

    // Virtual module — serializable config
    addTemplate({
      filename: "crucible.config.mjs",
      write: true,
      getContents: () => `export default ${JSON.stringify({ minLevel: level, hookLevels, batch }, null, 2)};`,
    });

    // Expose hook type augmentations to consumers
    addTypeTemplate({
      filename: "crucible.hooks.d.ts",
      getContents: () => `export {} from "${resolver.resolve("./hooks")}";`,
    });

    // Auto-import log utility
    addImports([
      { name: "log", from: resolver.resolve("../runtime/composables") },
    ]);

    // Register client plugin for batching + hook observation
    addPlugin({ src: resolver.resolve("../runtime/plugin.client"), mode: "client" });
  },
});
