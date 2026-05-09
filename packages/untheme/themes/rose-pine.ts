import { defineTheme } from "../src/config";

/**
 * Rose Pine Theme
 * All natural pine, faux fur and a bit of soho vibes for the classy minimalist
 * Created by the Rose Pine community
 * https://rosepinetheme.com
 */
export default defineTheme({
  label: "Rose Pine",
  reference: {
    // ===== NEUTRALS (warm purple-gray undertone) =====
    // Rose Pine's distinctive warm neutral scale derived from
    // Base (#191724) -> Surface (#1f1d2e) -> Overlay (#26233a) ->
    // Muted (#6e6a86) -> Subtle (#908caa) -> Text (#e0def4)
    "ref-slate-50": "#e0def4",   // Text
    "ref-slate-100": "#d0cee8",
    "ref-slate-200": "#b8b5cf",
    "ref-slate-300": "#908caa",  // Subtle
    "ref-slate-400": "#7f7a9a",
    "ref-slate-500": "#6e6a86",  // Muted
    "ref-slate-600": "#524f67",  // Highlight High
    "ref-slate-700": "#403d52",  // Highlight Med
    "ref-slate-800": "#26233a",  // Overlay
    "ref-slate-900": "#1f1d2e",  // Surface
    "ref-slate-950": "#191724",  // Base

    "ref-gray-50": "#e0def4",
    "ref-gray-100": "#d0cee8",
    "ref-gray-200": "#b8b5cf",
    "ref-gray-300": "#908caa",
    "ref-gray-400": "#7f7a9a",
    "ref-gray-500": "#6e6a86",
    "ref-gray-600": "#524f67",
    "ref-gray-700": "#403d52",
    "ref-gray-800": "#26233a",
    "ref-gray-900": "#1f1d2e",
    "ref-gray-950": "#191724",

    "ref-zinc-50": "#e0def4",
    "ref-zinc-100": "#d0cee8",
    "ref-zinc-200": "#b8b5cf",
    "ref-zinc-300": "#908caa",
    "ref-zinc-400": "#7f7a9a",
    "ref-zinc-500": "#6e6a86",
    "ref-zinc-600": "#524f67",
    "ref-zinc-700": "#403d52",
    "ref-zinc-800": "#26233a",
    "ref-zinc-900": "#1f1d2e",
    "ref-zinc-950": "#191724",

    "ref-neutral-50": "#e0def4",
    "ref-neutral-100": "#d0cee8",
    "ref-neutral-200": "#b8b5cf",
    "ref-neutral-300": "#908caa",
    "ref-neutral-400": "#7f7a9a",
    "ref-neutral-500": "#6e6a86",
    "ref-neutral-600": "#524f67",
    "ref-neutral-700": "#403d52",
    "ref-neutral-800": "#26233a",
    "ref-neutral-900": "#1f1d2e",
    "ref-neutral-950": "#191724",

    "ref-stone-50": "#e0def4",
    "ref-stone-100": "#d0cee8",
    "ref-stone-200": "#b8b5cf",
    "ref-stone-300": "#908caa",
    "ref-stone-400": "#7f7a9a",
    "ref-stone-500": "#6e6a86",
    "ref-stone-600": "#524f67",
    "ref-stone-700": "#403d52",
    "ref-stone-800": "#26233a",
    "ref-stone-900": "#1f1d2e",
    "ref-stone-950": "#191724",

    // ===== RED (Love: #eb6f92 dark, #b4637a light) =====
    "ref-red-50": "#fef1f4",
    "ref-red-100": "#fde4ea",
    "ref-red-200": "#f9c4d2",
    "ref-red-300": "#f4a0b6",
    "ref-red-400": "#ef879f",
    "ref-red-500": "#eb6f92",  // Rose Pine Love
    "ref-red-600": "#b4637a",  // Rose Pine Dawn Love
    "ref-red-700": "#944f64",
    "ref-red-800": "#773f51",
    "ref-red-900": "#5e3241",
    "ref-red-950": "#371c25",

    "ref-rose-50": "#fef1f4",
    "ref-rose-100": "#fde4ea",
    "ref-rose-200": "#f9c4d2",
    "ref-rose-300": "#f4a0b6",
    "ref-rose-400": "#ef879f",
    "ref-rose-500": "#eb6f92",
    "ref-rose-600": "#b4637a",
    "ref-rose-700": "#944f64",
    "ref-rose-800": "#773f51",
    "ref-rose-900": "#5e3241",
    "ref-rose-950": "#371c25",

    // ===== ORANGE (Gold-Love blend) =====
    "ref-orange-50": "#fef5ee",
    "ref-orange-100": "#fde9d5",
    "ref-orange-200": "#f9ceaa",
    "ref-orange-300": "#f4b07e",
    "ref-orange-400": "#f09858",
    "ref-orange-500": "#e88548",  // Gold-Love midpoint
    "ref-orange-600": "#c46c38",
    "ref-orange-700": "#a2562e",
    "ref-orange-800": "#834527",
    "ref-orange-900": "#6a3821",
    "ref-orange-950": "#3b1e11",

    // ===== YELLOW/AMBER (Gold: #f6c177 dark, #ea9d34 light) =====
    "ref-yellow-50": "#fefaed",
    "ref-yellow-100": "#fdf2d3",
    "ref-yellow-200": "#fae3a5",
    "ref-yellow-300": "#f6d08c",
    "ref-yellow-400": "#f6c177",  // Rose Pine Gold
    "ref-yellow-500": "#f2b45c",
    "ref-yellow-600": "#ea9d34",  // Rose Pine Dawn Gold
    "ref-yellow-700": "#c4812a",
    "ref-yellow-800": "#9e6623",
    "ref-yellow-900": "#7e511d",
    "ref-yellow-950": "#462c0f",

    "ref-amber-50": "#fefaed",
    "ref-amber-100": "#fdf2d3",
    "ref-amber-200": "#fae3a5",
    "ref-amber-300": "#f6d08c",
    "ref-amber-400": "#f6c177",
    "ref-amber-500": "#f2b45c",
    "ref-amber-600": "#ea9d34",
    "ref-amber-700": "#c4812a",
    "ref-amber-800": "#9e6623",
    "ref-amber-900": "#7e511d",
    "ref-amber-950": "#462c0f",

    // ===== GREEN (Pine + Foam blend, teal-greens) =====
    "ref-green-50": "#eef8f5",
    "ref-green-100": "#d5efe8",
    "ref-green-200": "#aedfd2",
    "ref-green-300": "#82ccba",
    "ref-green-400": "#5db9a4",
    "ref-green-500": "#44a48f",  // Pine-Foam midpoint
    "ref-green-600": "#358b78",
    "ref-green-700": "#2c7263",
    "ref-green-800": "#265c51",
    "ref-green-900": "#214c43",
    "ref-green-950": "#112b26",

    "ref-lime-50": "#eef8f5",
    "ref-lime-100": "#d5efe8",
    "ref-lime-200": "#aedfd2",
    "ref-lime-300": "#82ccba",
    "ref-lime-400": "#5db9a4",
    "ref-lime-500": "#44a48f",
    "ref-lime-600": "#358b78",
    "ref-lime-700": "#2c7263",
    "ref-lime-800": "#265c51",
    "ref-lime-900": "#214c43",
    "ref-lime-950": "#112b26",

    // ===== EMERALD (Pine-Foam secondary blend) =====
    "ref-emerald-50": "#edf8f7",
    "ref-emerald-100": "#d2efec",
    "ref-emerald-200": "#a8dfda",
    "ref-emerald-300": "#78cbc3",
    "ref-emerald-400": "#53b5ac",
    "ref-emerald-500": "#3d9e96",
    "ref-emerald-600": "#30857e",
    "ref-emerald-700": "#286c67",
    "ref-emerald-800": "#235754",
    "ref-emerald-900": "#1f4845",
    "ref-emerald-950": "#102827",

    // ===== CYAN/TEAL (Foam: #9ccfd8 dark, #56949f light) =====
    "ref-teal-50": "#effafb",
    "ref-teal-100": "#d6f2f5",
    "ref-teal-200": "#b4e6ec",
    "ref-teal-300": "#9ccfd8",  // Rose Pine Foam
    "ref-teal-400": "#79bcc6",
    "ref-teal-500": "#56949f",  // Rose Pine Dawn Foam
    "ref-teal-600": "#457a84",
    "ref-teal-700": "#38636c",
    "ref-teal-800": "#2f5158",
    "ref-teal-900": "#294348",
    "ref-teal-950": "#162628",

    "ref-cyan-50": "#effafb",
    "ref-cyan-100": "#d6f2f5",
    "ref-cyan-200": "#b4e6ec",
    "ref-cyan-300": "#9ccfd8",
    "ref-cyan-400": "#79bcc6",
    "ref-cyan-500": "#56949f",
    "ref-cyan-600": "#457a84",
    "ref-cyan-700": "#38636c",
    "ref-cyan-800": "#2f5158",
    "ref-cyan-900": "#294348",
    "ref-cyan-950": "#162628",

    // ===== SKY (Foam derivative, slightly bluer) =====
    "ref-sky-50": "#eef8fc",
    "ref-sky-100": "#d4eff7",
    "ref-sky-200": "#b0e1f0",
    "ref-sky-300": "#8ecfe4",
    "ref-sky-400": "#6bbdd8",
    "ref-sky-500": "#4dabc9",
    "ref-sky-600": "#3d8da8",
    "ref-sky-700": "#337389",
    "ref-sky-800": "#2c5d70",
    "ref-sky-900": "#274d5d",
    "ref-sky-950": "#152c35",

    // ===== BLUE (Pine: #31748f dark, #286983 light) =====
    "ref-blue-50": "#eef6f9",
    "ref-blue-100": "#d3eaf1",
    "ref-blue-200": "#a9d4e3",
    "ref-blue-300": "#74b8cf",
    "ref-blue-400": "#4e9ab8",
    "ref-blue-500": "#31748f",  // Rose Pine Pine
    "ref-blue-600": "#286983",  // Rose Pine Dawn Pine
    "ref-blue-700": "#22576d",
    "ref-blue-800": "#1e4759",
    "ref-blue-900": "#1b3b4a",
    "ref-blue-950": "#0f212a",

    // ===== INDIGO (Pine-Iris blend) =====
    "ref-indigo-50": "#f1f1fb",
    "ref-indigo-100": "#e0dff5",
    "ref-indigo-200": "#c2bfeb",
    "ref-indigo-300": "#9f9ad9",
    "ref-indigo-400": "#8279c6",
    "ref-indigo-500": "#6b61b3",
    "ref-indigo-600": "#594f9b",
    "ref-indigo-700": "#49417f",
    "ref-indigo-800": "#3c3668",
    "ref-indigo-900": "#332e56",
    "ref-indigo-950": "#1e1a33",

    // ===== VIOLET/PURPLE (Iris: #c4a7e7 dark, #907aa9 light) =====
    "ref-violet-50": "#f8f4fc",
    "ref-violet-100": "#f0e6f8",
    "ref-violet-200": "#e0cdf1",
    "ref-violet-300": "#d2b7ea",
    "ref-violet-400": "#c4a7e7",  // Rose Pine Iris
    "ref-violet-500": "#a88fcc",
    "ref-violet-600": "#907aa9",  // Rose Pine Dawn Iris
    "ref-violet-700": "#76638c",
    "ref-violet-800": "#605172",
    "ref-violet-900": "#4e425e",
    "ref-violet-950": "#2e2538",

    "ref-purple-50": "#f8f4fc",
    "ref-purple-100": "#f0e6f8",
    "ref-purple-200": "#e0cdf1",
    "ref-purple-300": "#d2b7ea",
    "ref-purple-400": "#c4a7e7",
    "ref-purple-500": "#a88fcc",
    "ref-purple-600": "#907aa9",
    "ref-purple-700": "#76638c",
    "ref-purple-800": "#605172",
    "ref-purple-900": "#4e425e",
    "ref-purple-950": "#2e2538",

    "ref-fuchsia-50": "#f8f4fc",
    "ref-fuchsia-100": "#f0e6f8",
    "ref-fuchsia-200": "#e0cdf1",
    "ref-fuchsia-300": "#d2b7ea",
    "ref-fuchsia-400": "#c4a7e7",
    "ref-fuchsia-500": "#a88fcc",
    "ref-fuchsia-600": "#907aa9",
    "ref-fuchsia-700": "#76638c",
    "ref-fuchsia-800": "#605172",
    "ref-fuchsia-900": "#4e425e",
    "ref-fuchsia-950": "#2e2538",

    // ===== PINK (Rose: #ebbcba dark, #d7827e light) =====
    "ref-pink-50": "#fef5f4",
    "ref-pink-100": "#fde8e6",
    "ref-pink-200": "#f7d0cd",
    "ref-pink-300": "#f1c0bc",
    "ref-pink-400": "#ebbcba",  // Rose Pine Rose
    "ref-pink-500": "#e1a09c",
    "ref-pink-600": "#d7827e",  // Rose Pine Dawn Rose
    "ref-pink-700": "#b56a66",
    "ref-pink-800": "#935653",
    "ref-pink-900": "#784643",
    "ref-pink-950": "#432726",
  },
  modes: {
    light: {
      // Surface tokens — Rose Pine Dawn
      "sys-surface": "ref-slate-50",
      "sys-surface-dim": "ref-slate-100",
      "sys-surface-bright": "ref-slate-50",
      "sys-surface-container": "ref-slate-100",
      "sys-surface-container-low": "ref-slate-50",
      "sys-surface-container-high": "ref-slate-200",
      "sys-surface-container-highest": "ref-slate-300",
      "sys-surface-variant": "ref-slate-100",

      // Content tokens
      "sys-on-surface": "ref-slate-900",
      "sys-on-surface-variant": "ref-slate-700",
      "sys-muted": "ref-slate-500",
      "sys-outline": "ref-slate-400",
      "sys-outline-variant": "ref-slate-300",

      // Primary — Rose (the warm half of the name)
      "sys-primary": "ref-pink-600",
      "sys-primary-hover": "ref-pink-700",
      "sys-primary-active": "ref-pink-800",
      "sys-primary-container": "ref-pink-100",
      "sys-on-primary": "ref-slate-50",
      "sys-on-primary-container": "ref-pink-950",

      // Secondary — Pine (the cool half of the name)
      "sys-secondary": "ref-blue-600",
      "sys-secondary-hover": "ref-blue-700",
      "sys-secondary-active": "ref-blue-800",
      "sys-secondary-container": "ref-blue-100",
      "sys-on-secondary": "ref-slate-50",
      "sys-on-secondary-container": "ref-blue-950",

      // Semantic
      "sys-success": "ref-green-600",
      "sys-success-hover": "ref-green-700",
      "sys-success-active": "ref-green-800",
      "sys-success-container": "ref-green-100",
      "sys-on-success": "ref-slate-50",
      "sys-on-success-container": "ref-green-950",

      "sys-warning": "ref-yellow-600",
      "sys-warning-hover": "ref-yellow-700",
      "sys-warning-active": "ref-yellow-800",
      "sys-warning-container": "ref-yellow-100",
      "sys-on-warning": "ref-slate-950",
      "sys-on-warning-container": "ref-yellow-950",

      "sys-error": "ref-red-600",
      "sys-error-hover": "ref-red-700",
      "sys-error-active": "ref-red-800",
      "sys-error-container": "ref-red-100",
      "sys-on-error": "ref-slate-50",
      "sys-on-error-container": "ref-red-950",

      "sys-info": "ref-cyan-600",
      "sys-info-hover": "ref-cyan-700",
      "sys-info-active": "ref-cyan-800",
      "sys-info-container": "ref-cyan-100",
      "sys-on-info": "ref-slate-50",
      "sys-on-info-container": "ref-cyan-950",

      // Interactive states
      "sys-hover": "ref-slate-100",
      "sys-pressed": "ref-slate-200",
      "sys-active": "ref-slate-200",
      "sys-active-highlight": "ref-slate-100",
      "sys-focus": "ref-pink-500",
      "sys-disabled": "ref-slate-200",
      "sys-on-disabled": "ref-slate-400",

      // Special
      "sys-scrim": "ref-slate-950",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-white",

      // Shiki — Rose Pine Dawn syntax colours
      "shiki-text": "ref-slate-900",
      "shiki-comment": "ref-slate-500",
      "shiki-keyword": "ref-violet-600",
      "shiki-number": "ref-yellow-600",
      "shiki-string": "ref-green-600",
      "shiki-function": "ref-blue-600",
      "shiki-type": "ref-cyan-600",
      "shiki-parameter": "ref-red-600",
      "shiki-variable": "ref-red-500",
      "shiki-error": "ref-red-600",
      "shiki-regex": "ref-yellow-600",
      "shiki-regex-constant": "ref-violet-600",
      "shiki-tag": "ref-red-600",
      "shiki-punctuation": "ref-slate-400",
      "shiki-operator": "ref-violet-600",
      "shiki-label": "ref-slate-600",
      "shiki-header": "ref-blue-500",
      "shiki-list-marker": "ref-blue-600",
      "shiki-builtin": "ref-cyan-600",
      "shiki-property": "ref-pink-600",
      "shiki-placeholder": "ref-cyan-500",
    },
    dark: {
      // Surface tokens — Rose Pine (main dark)
      "sys-surface": "ref-slate-800",
      "sys-surface-dim": "ref-slate-900",
      "sys-surface-bright": "ref-slate-700",
      "sys-surface-container": "ref-slate-900",
      "sys-surface-container-low": "ref-slate-950",
      "sys-surface-container-high": "ref-slate-700",
      "sys-surface-container-highest": "ref-slate-600",
      "sys-surface-variant": "ref-slate-900",

      // Content tokens
      "sys-on-surface": "ref-slate-50",
      "sys-on-surface-variant": "ref-slate-200",
      "sys-muted": "ref-slate-500",
      "sys-outline": "ref-slate-600",
      "sys-outline-variant": "ref-slate-700",

      // Primary — Rose (the warm half of the name)
      "sys-primary": "ref-pink-400",
      "sys-primary-hover": "ref-pink-300",
      "sys-primary-active": "ref-pink-200",
      "sys-primary-container": "ref-pink-900",
      "sys-on-primary": "ref-slate-950",
      "sys-on-primary-container": "ref-pink-100",

      // Secondary — Pine (the cool half of the name)
      "sys-secondary": "ref-blue-500",
      "sys-secondary-hover": "ref-blue-400",
      "sys-secondary-active": "ref-blue-300",
      "sys-secondary-container": "ref-blue-900",
      "sys-on-secondary": "ref-slate-950",
      "sys-on-secondary-container": "ref-blue-100",

      // Semantic
      "sys-success": "ref-green-500",
      "sys-success-hover": "ref-green-400",
      "sys-success-active": "ref-green-300",
      "sys-success-container": "ref-green-900",
      "sys-on-success": "ref-slate-950",
      "sys-on-success-container": "ref-green-100",

      "sys-warning": "ref-yellow-400",
      "sys-warning-hover": "ref-yellow-300",
      "sys-warning-active": "ref-yellow-200",
      "sys-warning-container": "ref-yellow-900",
      "sys-on-warning": "ref-slate-950",
      "sys-on-warning-container": "ref-yellow-100",

      "sys-error": "ref-red-500",
      "sys-error-hover": "ref-red-400",
      "sys-error-active": "ref-red-300",
      "sys-error-container": "ref-red-900",
      "sys-on-error": "ref-slate-950",
      "sys-on-error-container": "ref-red-100",

      "sys-info": "ref-cyan-300",
      "sys-info-hover": "ref-cyan-200",
      "sys-info-active": "ref-cyan-100",
      "sys-info-container": "ref-cyan-900",
      "sys-on-info": "ref-slate-950",
      "sys-on-info-container": "ref-cyan-100",

      // Interactive states
      "sys-hover": "ref-slate-700",
      "sys-pressed": "ref-slate-600",
      "sys-active": "ref-slate-600",
      "sys-active-highlight": "ref-slate-700",
      "sys-focus": "ref-pink-400",
      "sys-disabled": "ref-slate-700",
      "sys-on-disabled": "ref-slate-500",

      // Special
      "sys-scrim": "ref-slate-200",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-black",

      // Shiki — Rose Pine syntax colours
      "shiki-text": "ref-slate-50",
      "shiki-comment": "ref-slate-500",
      "shiki-keyword": "ref-violet-400",
      "shiki-number": "ref-yellow-400",
      "shiki-string": "ref-green-500",
      "shiki-function": "ref-blue-500",
      "shiki-type": "ref-cyan-300",
      "shiki-parameter": "ref-red-500",
      "shiki-variable": "ref-red-400",
      "shiki-error": "ref-red-500",
      "shiki-regex": "ref-yellow-400",
      "shiki-regex-constant": "ref-violet-400",
      "shiki-tag": "ref-red-500",
      "shiki-punctuation": "ref-slate-400",
      "shiki-operator": "ref-violet-400",
      "shiki-label": "ref-slate-300",
      "shiki-header": "ref-blue-400",
      "shiki-list-marker": "ref-blue-500",
      "shiki-builtin": "ref-cyan-300",
      "shiki-property": "ref-pink-400",
      "shiki-placeholder": "ref-cyan-400",
    },
  },
});
