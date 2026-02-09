import { defineNuxtConfig } from "nuxt/config";
import { defineIconic } from "@foundation/iconic";

import icIcons from "@iconify-json/ic/icons.json";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-06",
  imports: {
    dirs: ["types"],
  },
  modules: [
    "@foundation/iconic/module",
    "@foundation/untheme/module",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "reka-ui/nuxt",
  ],
  iconic: defineIconic(icIcons, {
    // Theme
    light: "twotone-light-mode",
    dark: "twotone-dark-mode",
    theme: "twotone-palette",

    // Translate
    translate: "twotone-translate",

    // Navigation
    home: "twotone-home",
    menu: "twotone-menu",
    close: "twotone-close",
    search: "twotone-search",
    filter: "twotone-filter-list",
    sort: "twotone-sort",
    explore: "twotone-explore",
    anchor: "twotone-anchor",
    "folder-open": "twotone-folder-open",

    // Actions
    add: "twotone-add",
    plus: "twotone-add",
    edit: "twotone-edit",
    delete: "twotone-delete",
    save: "twotone-save",
    copy: "twotone-content-copy",

    // Arrows
    "arrow-up": "twotone-arrow-upward",
    "arrow-down": "twotone-arrow-downward",
    "arrow-left": "twotone-arrow-back",
    "arrow-right": "twotone-arrow-forward",

    // Content
    link: "twotone-link",
    "link-copied": "twotone-check",
    toc: "twotone-format-list-bulleted",
    dot: "twotone-fiber-manual-record",

    // Chevrons
    "chevron-up": "twotone-keyboard-arrow-up",
    "chevron-down": "twotone-keyboard-arrow-down",
    "chevron-left": "twotone-keyboard-arrow-left",
    "chevron-right": "twotone-keyboard-arrow-right",

    // External
    github: "twotone-code", // placeholder until we add a brand icon set
    community: "twotone-groups",
    "edit-document": "twotone-edit-note",
    "report-issue": "twotone-bug-report",
    external: "twotone-open-in-new",

    // Alerts
    lightbulb: "twotone-lightbulb",
    important: "twotone-campaign",

    // Font
    font: "twotone-text-fields",

    // UI
    settings: "twotone-settings",
    user: "twotone-person",
    calendar: "twotone-calendar-today",
    "book-open": "twotone-menu-book",
    learn: "twotone-school",
    guides: "twotone-map",
    integration: "twotone-extension",
    reference: "twotone-library-books",
    check: "twotone-check",
    info: "twotone-info",
    warning: "twotone-warning",
    error: "twotone-error",
  }),
  vite: {
    optimizeDeps: {
      exclude: ["#build/iconic.config.mjs"],
    },
  },
});
