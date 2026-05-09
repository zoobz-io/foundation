import { defineNuxtConfig } from "nuxt/config";
import cyberdream from "@zoobz-io/untheme/themes/cyberdream";
import oneDark from "@zoobz-io/untheme/themes/one-dark";
import catppuccin from "@zoobz-io/untheme/themes/catppuccin";
import tokyoNight from "@zoobz-io/untheme/themes/tokyo-night";
import nord from "@zoobz-io/untheme/themes/nord";
import dracula from "@zoobz-io/untheme/themes/dracula";
import solarized from "@zoobz-io/untheme/themes/solarized";
import rosePine from "@zoobz-io/untheme/themes/rose-pine";
import gruvbox from "@zoobz-io/untheme/themes/gruvbox";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-06",
  extends: ["@zoobz-io/foundry"],
  imports: {
    dirs: ["types"],
    imports: [
      { name: "status", from: "ltrl-http" },
      { name: "HTTPCode", from: "ltrl-http", type: true },
      { name: "HTTPStatus", from: "ltrl-http", type: true },
    ],
  },
  modules: [
    "@zoobz-io/untheme/module",
    "@zoobz-io/crucible/module",
    "@zoobz-io/rampart/module",
    "@zoobz-io/rosetta/module",
  ],
  crucible: {
    hooks: {
      // rampart
      "rampart:login": { level: "info", fields: ["userId"] },
      "rampart:logout": "info",
      "rampart:denied": { level: "warn", fields: ["roles", "scopes"] },
      "rampart:refresh": "debug",
      "rampart:expired": "warn",
      // rosetta
      "rosetta:locale": { level: "info", fields: ["from", "to"] },
      "rosetta:chunk": { level: "debug", fields: ["locale", "route"] },
      // untheme
      "untheme:theme": { level: "info", fields: ["from", "to"] },
      "untheme:mode": { level: "info", fields: ["from", "to"] },
    },
  },
  rampart: {
    basePath: "/auth",
  },
  rosetta: {
    defaultLocale: "en",
    locales: ["en"],
  },
  untheme: {
    defaultTheme: "cyberdream",
    themes: {
      cyberdream,
      "one-dark": oneDark,
      catppuccin,
      "tokyo-night": tokyoNight,
      nord,
      dracula,
      solarized,
      "rose-pine": rosePine,
      gruvbox,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["#build/untheme.config.mjs", "#build/rosetta.config.mjs", "#build/rampart.config.mjs", "#build/crucible.config.mjs"],
    },
  },
});
