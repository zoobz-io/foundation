import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import type { ThemeRegistry, ThemeManifest } from "./config";

import {
  defineNuxtModule,
  addTemplate,
  addTypeTemplate,
  addPlugin,
  addImports,
  addServerHandler,
  createResolver,
} from "@nuxt/kit";

export interface UnthemeModuleOptions {
  defaultTheme?: string;
  themes?: ThemeRegistry;
}

export default defineNuxtModule<UnthemeModuleOptions>({
  meta: {
    name: "untheme",
    configKey: "untheme",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const themes = options.themes || {};
    const defaultTheme = options.defaultTheme || Object.keys(themes)[0];
    const defaultThemeData = defaultTheme ? themes[defaultTheme] : null;

    // Build manifest — theme keys + labels for the client
    const manifest: ThemeManifest = Object.entries(themes).map(([key, theme]) => ({
      key,
      label: theme.label || key,
    }));

    // Global reset CSS
    nuxt.options.css.push(resolver.resolve("../runtime/reset.css"));

    // Virtual module — manifest + default theme data only
    addTemplate({
      filename: "untheme.config.mjs",
      getContents: () => [
        `export const defaultTheme = ${JSON.stringify(defaultTheme || null)};`,
        `export const manifest = ${JSON.stringify(manifest)};`,
        `export const defaultThemeData = ${JSON.stringify(defaultThemeData)};`,
      ].join("\n"),
      write: true,
    });

    addTypeTemplate({
      filename: "untheme.config.d.ts",
      getContents: () => [
        `import type { Theme, ThemeManifest } from "${resolver.resolve("../src/types")}";`,
        `export declare const defaultTheme: string;`,
        `export declare const manifest: ThemeManifest;`,
        `export declare const defaultThemeData: Theme;`,
      ].join("\n"),
    });

    // Expose hook type augmentations to consumers
    addTypeTemplate({
      filename: "untheme.hooks.d.ts",
      getContents: () => `export {} from "${resolver.resolve("./hooks")}";`,
    });

    // Register server handler for on-demand theme loading
    addServerHandler({
      route: "/api/untheme/:theme",
      handler: resolver.resolve("../runtime/server"),
    });

    // Register plugin for color mode + theme management
    addPlugin(resolver.resolve("../runtime/plugin"));

    // Auto-import useUntheme composable
    addImports([
      { name: "useUntheme", from: resolver.resolve("../runtime/composables") },
    ]);

    // Write theme artifacts to disk for the server handler
    const outputDir = join(nuxt.options.rootDir, ".untheme");
    mkdirSync(outputDir, { recursive: true });

    for (const [key, theme] of Object.entries(themes)) {
      writeFileSync(
        join(outputDir, `${key}.json`),
        JSON.stringify(theme, null, 2),
      );
    }
  },
});
