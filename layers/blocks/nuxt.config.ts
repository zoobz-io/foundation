import { defineNuxtConfig } from "nuxt/config";
import { defineIconic } from "@foundation/iconic";

import elements from "./elements.config";
import icIcons from "@iconify-json/ic/icons.json";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-06",
  imports: {
    dirs: ["types", "recipes"],
  },
  modules: [
    "@foundation/iconic/module",
    "@foundation/untheme/module",
    "@pinia/nuxt",
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

    // UI
    settings: "twotone-settings",
    user: "twotone-person",
    calendar: "twotone-calendar-today",
    check: "twotone-check",
    info: "twotone-info",
    warning: "twotone-warning",
    error: "twotone-error",
  }),
  untheme: {
    elements: {
      // Interactive elements
      a: elements.a({}),
      button: elements.button({}),
      card: elements.card({}),
      link: elements.link({}),
      group: elements.group({}),

      // Accordion
      "accordion-root": elements.accordionRoot({}),
      "accordion-item": elements.accordionItem({}),
      "accordion-header": elements.accordionHeader({}),
      "accordion-trigger": elements.accordionTrigger({}),
      "accordion-trigger-content": elements.accordionTriggerContent({}),
      "accordion-content": elements.accordionContent({}),

      // Breadcrumbs
      "breadcrumbs-root": elements.breadcrumbsRoot({}),
      "breadcrumbs-list": elements.breadcrumbsList({}),
      "breadcrumbs-item": elements.breadcrumbsItem({}),
      "breadcrumbs-link": elements.breadcrumbsLink({}),
      "breadcrumbs-current": elements.breadcrumbsCurrent({}),
      "breadcrumbs-separator": elements.breadcrumbsSeparator({}),

      // Checkbox
      "checkbox-root": elements.checkboxRoot({}),
      "checkbox-indicator": elements.checkboxIndicator({}),

      // Layout
      aside: elements.aside({}),
      header: elements.header({}),
      footer: elements.footer({}),
      main: elements.main({}),
      section: elements.section({}),
      article: elements.article({}),
      nav: elements.nav({}),

      // Avatar
      "avatar-root": elements.avatarRoot({}),
      "avatar-image": elements.avatarImage({}),
      "avatar-fallback": elements.avatarFallback({}),

      // Icon
      icon: elements.icon({}),

      // Img
      img: elements.img({}),

      // Listbox
      "listbox-root": elements.listboxRoot({}),
      "listbox-content": elements.listboxContent({}),
      "listbox-item": elements.listboxItem({}),

      // Table
      table: elements.table({}),
      thead: elements.thead({}),
      tbody: elements.tbody({}),
      tr: elements.tr({}),
      th: elements.th({}),
      td: elements.td({}),

      // Tabs
      "tabs-root": elements.tabsRoot({}),
      "tabs-list": elements.tabsList({}),
      "tabs-trigger": elements.tabsTrigger({}),
      "tabs-content": elements.tabsContent({}),

      // Tree
      "tree-root": elements.treeRoot({}),
      "tree-branch": elements.treeBranch({}),
      "tree-branch-content": elements.treeBranchContent({}),
      "tree-branch-label": elements.treeBranchLabel({}),
      "tree-leaf": elements.treeLeaf({}),
      "tree-leaf-content": elements.treeLeafContent({}),

      // Tooltip
      "tooltip-content": elements.tooltipContent({}),

      // Navigator
      "navigator-root": elements.navigatorRoot({}),
      "navigator-list": elements.navigatorList({}),
      "navigator-item": elements.navigatorItem({}),
      "navigator-trigger": elements.navigatorTrigger({}),
      "navigator-link": elements.navigatorLink({}),
      "navigator-content": elements.navigatorContent({}),
      "navigator-viewport": elements.navigatorViewport({}),
      "navigator-viewport-wrapper": elements.navigatorViewportWrapper({}),
      "navigator-indicator": elements.navigatorIndicator({}),
      "navigator-grid": elements.navigatorGrid({}),
      "navigator-card": elements.navigatorCard({}),
      "navigator-featured": elements.navigatorFeatured({}),

      // Dialog
      "dialog-overlay": elements.dialogOverlay({}),
      "dialog-content": elements.dialogContent({}),

      // Popover
      "popover-trigger": elements.popoverTrigger({}),
      "popover-content": elements.popoverContent({}),
      "popover-arrow": elements.popoverArrow({}),
      "popover-close": elements.popoverClose({}),

      // Typography
      p: elements.p({}),
      h1: elements.h1({}),
      h2: elements.h2({}),
      h3: elements.h3({}),
      h4: elements.h4({}),
      h5: elements.h5({}),
      h6: elements.h6({}),
      code: elements.code({}),
      kbd: elements.kbd({}),
      pre: elements.pre({}),
      strong: elements.strong({}),
      em: elements.em({}),
      del: elements.del({}),
      blockquote: elements.blockquote({}),
      hr: elements.hr({}),
      ul: elements.ul({}),
      ol: elements.ol({}),
      li: elements.li({}),
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["#build/untheme.config.mjs", "#build/iconic.config.mjs"],
    },
  },
});
