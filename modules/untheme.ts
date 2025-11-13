import type { UnthemeConfig } from "../packages/untheme/config";

import { defineNuxtModule, addTemplate, addImports } from "nuxt/kit";

import defu from "defu";
import theme from "../packages/untheme/theme";

export default defineNuxtModule<UnthemeConfig>({
  meta: {
    name: "untheme",
    configKey: "untheme",
  },
  setup(options) {
    const tokens = defu(options, theme);

    addTemplate({
      filename: "untheme.config.mjs",
      getContents: () => `export default ${JSON.stringify(tokens, null, 2)};`,
    });

    // Auto-import types from untheme package
    addImports([
      { name: "RefToken", from: "~~/packages/untheme/config", type: true },
      { name: "ModeToken", from: "~~/packages/untheme/config", type: true },
      { name: "RoleToken", from: "~~/packages/untheme/config", type: true },
      { name: "Token", from: "~~/packages/untheme/config", type: true },
      { name: "Tokens", from: "~~/packages/untheme/config", type: true },
      { name: "Untheme", from: "~~/packages/untheme/config", type: true },
      { name: "UnthemeConfig", from: "~~/packages/untheme/config", type: true },
    ]);
  },
});
