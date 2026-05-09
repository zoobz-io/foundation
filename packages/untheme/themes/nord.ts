import { defineTheme } from "../src/config";

/**
 * Nord Theme
 * An arctic, north-bluish colour palette by Arctic Ice Studio
 * https://www.nordtheme.com
 */
export default defineTheme({
  label: "Nord",
  reference: {
    // ===== NEUTRALS (blue-tinted polar grays from nord0–nord6) =====
    "ref-slate-50": "#eceff4",   // nord6
    "ref-slate-100": "#e5e9f0",  // nord5
    "ref-slate-200": "#d8dee9",  // nord4
    "ref-slate-300": "#c0c8d8",
    "ref-slate-400": "#9aa5b9",
    "ref-slate-500": "#7b849a",
    "ref-slate-600": "#616a7e",
    "ref-slate-700": "#4c566a",  // nord3
    "ref-slate-800": "#434c5e",  // nord2
    "ref-slate-900": "#3b4252",  // nord1
    "ref-slate-950": "#2e3440",  // nord0

    "ref-gray-50": "#eceff4",
    "ref-gray-100": "#e5e9f0",
    "ref-gray-200": "#d8dee9",
    "ref-gray-300": "#c0c8d8",
    "ref-gray-400": "#9aa5b9",
    "ref-gray-500": "#7b849a",
    "ref-gray-600": "#616a7e",
    "ref-gray-700": "#4c566a",
    "ref-gray-800": "#434c5e",
    "ref-gray-900": "#3b4252",
    "ref-gray-950": "#2e3440",

    "ref-zinc-50": "#eceff4",
    "ref-zinc-100": "#e5e9f0",
    "ref-zinc-200": "#d8dee9",
    "ref-zinc-300": "#c0c8d8",
    "ref-zinc-400": "#9aa5b9",
    "ref-zinc-500": "#7b849a",
    "ref-zinc-600": "#616a7e",
    "ref-zinc-700": "#4c566a",
    "ref-zinc-800": "#434c5e",
    "ref-zinc-900": "#3b4252",
    "ref-zinc-950": "#2e3440",

    "ref-neutral-50": "#eceff4",
    "ref-neutral-100": "#e5e9f0",
    "ref-neutral-200": "#d8dee9",
    "ref-neutral-300": "#c0c8d8",
    "ref-neutral-400": "#9aa5b9",
    "ref-neutral-500": "#7b849a",
    "ref-neutral-600": "#616a7e",
    "ref-neutral-700": "#4c566a",
    "ref-neutral-800": "#434c5e",
    "ref-neutral-900": "#3b4252",
    "ref-neutral-950": "#2e3440",

    "ref-stone-50": "#eceff4",
    "ref-stone-100": "#e5e9f0",
    "ref-stone-200": "#d8dee9",
    "ref-stone-300": "#c0c8d8",
    "ref-stone-400": "#9aa5b9",
    "ref-stone-500": "#7b849a",
    "ref-stone-600": "#616a7e",
    "ref-stone-700": "#4c566a",
    "ref-stone-800": "#434c5e",
    "ref-stone-900": "#3b4252",
    "ref-stone-950": "#2e3440",

    // ===== RED (nord11: #bf616a) =====
    "ref-red-50": "#fdf2f3",
    "ref-red-100": "#fbe4e6",
    "ref-red-200": "#f5c5c9",
    "ref-red-300": "#eca0a6",
    "ref-red-400": "#d68087",
    "ref-red-500": "#bf616a",  // nord11
    "ref-red-600": "#a44f57",
    "ref-red-700": "#8a3f46",
    "ref-red-800": "#72353b",
    "ref-red-900": "#5e2d32",
    "ref-red-950": "#331719",

    "ref-rose-50": "#fdf2f3",
    "ref-rose-100": "#fbe4e6",
    "ref-rose-200": "#f5c5c9",
    "ref-rose-300": "#eca0a6",
    "ref-rose-400": "#d68087",
    "ref-rose-500": "#bf616a",
    "ref-rose-600": "#a44f57",
    "ref-rose-700": "#8a3f46",
    "ref-rose-800": "#72353b",
    "ref-rose-900": "#5e2d32",
    "ref-rose-950": "#331719",

    // ===== ORANGE (nord12: #d08770) =====
    "ref-orange-50": "#fdf5f1",
    "ref-orange-100": "#fae8df",
    "ref-orange-200": "#f2ccba",
    "ref-orange-300": "#e5ae94",
    "ref-orange-400": "#d99a82",
    "ref-orange-500": "#d08770",  // nord12
    "ref-orange-600": "#b36d56",
    "ref-orange-700": "#955641",
    "ref-orange-800": "#7a4635",
    "ref-orange-900": "#643a2d",
    "ref-orange-950": "#361e17",

    // ===== YELLOW (nord13: #ebcb8b) =====
    "ref-yellow-50": "#fdf9ee",
    "ref-yellow-100": "#fbf1d4",
    "ref-yellow-200": "#f3e0ab",
    "ref-yellow-300": "#efd498",
    "ref-yellow-400": "#ebcb8b",  // nord13
    "ref-yellow-500": "#d4b06a",
    "ref-yellow-600": "#b89350",
    "ref-yellow-700": "#98763c",
    "ref-yellow-800": "#7d6033",
    "ref-yellow-900": "#664e2b",
    "ref-yellow-950": "#382a16",

    "ref-amber-50": "#fdf9ee",
    "ref-amber-100": "#fbf1d4",
    "ref-amber-200": "#f3e0ab",
    "ref-amber-300": "#efd498",
    "ref-amber-400": "#ebcb8b",
    "ref-amber-500": "#d4b06a",
    "ref-amber-600": "#b89350",
    "ref-amber-700": "#98763c",
    "ref-amber-800": "#7d6033",
    "ref-amber-900": "#664e2b",
    "ref-amber-950": "#382a16",

    // ===== GREEN (nord14: #a3be8c) =====
    "ref-green-50": "#f4f8f0",
    "ref-green-100": "#e6f0dc",
    "ref-green-200": "#cce0ba",
    "ref-green-300": "#b5d1a3",
    "ref-green-400": "#a3be8c",  // nord14
    "ref-green-500": "#8ba876",
    "ref-green-600": "#73905f",
    "ref-green-700": "#5c744b",
    "ref-green-800": "#4c5f3e",
    "ref-green-900": "#3f4e34",
    "ref-green-950": "#212a1b",

    "ref-lime-50": "#f4f8f0",
    "ref-lime-100": "#e6f0dc",
    "ref-lime-200": "#cce0ba",
    "ref-lime-300": "#b5d1a3",
    "ref-lime-400": "#a3be8c",
    "ref-lime-500": "#8ba876",
    "ref-lime-600": "#73905f",
    "ref-lime-700": "#5c744b",
    "ref-lime-800": "#4c5f3e",
    "ref-lime-900": "#3f4e34",
    "ref-lime-950": "#212a1b",

    // ===== EMERALD (blend of nord7 teal + nord14 green) =====
    "ref-emerald-50": "#f0faf7",
    "ref-emerald-100": "#d8f2ea",
    "ref-emerald-200": "#b3e4d6",
    "ref-emerald-300": "#8ad3bf",
    "ref-emerald-400": "#6dbfaa",
    "ref-emerald-500": "#54a893",
    "ref-emerald-600": "#428d7a",
    "ref-emerald-700": "#357263",
    "ref-emerald-800": "#2c5d51",
    "ref-emerald-900": "#254d44",
    "ref-emerald-950": "#132b26",

    // ===== TEAL (nord7: #8fbcbb) =====
    "ref-teal-50": "#f0fafa",
    "ref-teal-100": "#d8f2f1",
    "ref-teal-200": "#b5e3e2",
    "ref-teal-300": "#a2d2d1",
    "ref-teal-400": "#8fbcbb",  // nord7
    "ref-teal-500": "#76a3a2",
    "ref-teal-600": "#5f8887",
    "ref-teal-700": "#4d6e6d",
    "ref-teal-800": "#3f5a5a",
    "ref-teal-900": "#354b4b",
    "ref-teal-950": "#1c2929",

    // ===== CYAN (nord8: #88c0d0) =====
    "ref-cyan-50": "#f0f9fc",
    "ref-cyan-100": "#d7eff7",
    "ref-cyan-200": "#b3deee",
    "ref-cyan-300": "#a0d2e3",
    "ref-cyan-400": "#88c0d0",  // nord8
    "ref-cyan-500": "#6fa8b9",
    "ref-cyan-600": "#598ea0",
    "ref-cyan-700": "#477382",
    "ref-cyan-800": "#3b5e6b",
    "ref-cyan-900": "#324e59",
    "ref-cyan-950": "#1b2b31",

    // ===== SKY (nord8: #88c0d0 — lighter cyan variant) =====
    "ref-sky-50": "#f0f9fc",
    "ref-sky-100": "#d7eff7",
    "ref-sky-200": "#b3deee",
    "ref-sky-300": "#a0d2e3",
    "ref-sky-400": "#88c0d0",  // nord8
    "ref-sky-500": "#6fa8b9",
    "ref-sky-600": "#598ea0",
    "ref-sky-700": "#477382",
    "ref-sky-800": "#3b5e6b",
    "ref-sky-900": "#324e59",
    "ref-sky-950": "#1b2b31",

    // ===== BLUE (nord9: #81a1c1, nord10: #5e81ac) =====
    "ref-blue-50": "#f0f4fa",
    "ref-blue-100": "#dbe5f2",
    "ref-blue-200": "#b8cce4",
    "ref-blue-300": "#9ab5d4",
    "ref-blue-400": "#81a1c1",  // nord9
    "ref-blue-500": "#6f91b4",
    "ref-blue-600": "#5e81ac",  // nord10
    "ref-blue-700": "#4c6b91",
    "ref-blue-800": "#3f5878",
    "ref-blue-900": "#354a63",
    "ref-blue-950": "#1d2936",

    // ===== INDIGO (derived from nord10 blue, shifted violet) =====
    "ref-indigo-50": "#f0f1fa",
    "ref-indigo-100": "#dde0f2",
    "ref-indigo-200": "#bcc2e5",
    "ref-indigo-300": "#99a1d2",
    "ref-indigo-400": "#7d87bf",
    "ref-indigo-500": "#6971ad",
    "ref-indigo-600": "#575e97",
    "ref-indigo-700": "#474c7c",
    "ref-indigo-800": "#3b3f66",
    "ref-indigo-900": "#323554",
    "ref-indigo-950": "#1c1d2f",

    // ===== VIOLET/PURPLE (nord15: #b48ead) =====
    "ref-violet-50": "#faf4f9",
    "ref-violet-100": "#f2e4ef",
    "ref-violet-200": "#e4c7de",
    "ref-violet-300": "#d1a6c8",
    "ref-violet-400": "#c29ab9",
    "ref-violet-500": "#b48ead",  // nord15
    "ref-violet-600": "#997695",
    "ref-violet-700": "#7f607b",
    "ref-violet-800": "#694f66",
    "ref-violet-900": "#574254",
    "ref-violet-950": "#30232e",

    "ref-purple-50": "#faf4f9",
    "ref-purple-100": "#f2e4ef",
    "ref-purple-200": "#e4c7de",
    "ref-purple-300": "#d1a6c8",
    "ref-purple-400": "#c29ab9",
    "ref-purple-500": "#b48ead",
    "ref-purple-600": "#997695",
    "ref-purple-700": "#7f607b",
    "ref-purple-800": "#694f66",
    "ref-purple-900": "#574254",
    "ref-purple-950": "#30232e",

    "ref-fuchsia-50": "#faf4f9",
    "ref-fuchsia-100": "#f2e4ef",
    "ref-fuchsia-200": "#e4c7de",
    "ref-fuchsia-300": "#d1a6c8",
    "ref-fuchsia-400": "#c29ab9",
    "ref-fuchsia-500": "#b48ead",
    "ref-fuchsia-600": "#997695",
    "ref-fuchsia-700": "#7f607b",
    "ref-fuchsia-800": "#694f66",
    "ref-fuchsia-900": "#574254",
    "ref-fuchsia-950": "#30232e",

    // ===== PINK (derived from nord11 red + nord15 purple) =====
    "ref-pink-50": "#fdf3f6",
    "ref-pink-100": "#fae4eb",
    "ref-pink-200": "#f3c6d5",
    "ref-pink-300": "#e8a3b8",
    "ref-pink-400": "#da849e",
    "ref-pink-500": "#c96d88",
    "ref-pink-600": "#ad576f",
    "ref-pink-700": "#90455a",
    "ref-pink-800": "#77394a",
    "ref-pink-900": "#63303e",
    "ref-pink-950": "#371a22",
  },
  modes: {
    light: {
      // Surface tokens — Snow Storm backgrounds
      "sys-surface": "ref-slate-50",
      "sys-surface-dim": "ref-slate-100",
      "sys-surface-bright": "ref-slate-50",
      "sys-surface-container": "ref-slate-100",
      "sys-surface-container-low": "ref-slate-50",
      "sys-surface-container-high": "ref-slate-200",
      "sys-surface-container-highest": "ref-slate-300",
      "sys-surface-variant": "ref-slate-100",

      // Content tokens
      "sys-on-surface": "ref-slate-950",
      "sys-on-surface-variant": "ref-slate-800",
      "sys-muted": "ref-slate-500",
      "sys-outline": "ref-slate-400",
      "sys-outline-variant": "ref-slate-300",

      // Primary — blue (nord10)
      "sys-primary": "ref-blue-600",
      "sys-primary-hover": "ref-blue-700",
      "sys-primary-active": "ref-blue-800",
      "sys-primary-container": "ref-blue-100",
      "sys-on-primary": "ref-slate-50",
      "sys-on-primary-container": "ref-blue-950",

      // Secondary — purple (nord15)
      "sys-secondary": "ref-violet-600",
      "sys-secondary-hover": "ref-violet-700",
      "sys-secondary-active": "ref-violet-800",
      "sys-secondary-container": "ref-violet-100",
      "sys-on-secondary": "ref-slate-50",
      "sys-on-secondary-container": "ref-violet-950",

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
      "sys-focus": "ref-blue-500",
      "sys-disabled": "ref-slate-200",
      "sys-on-disabled": "ref-slate-400",

      // Special
      "sys-scrim": "ref-slate-950",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-white",

      // Shiki — Nord light syntax colours
      "shiki-text": "ref-slate-950",
      "shiki-comment": "ref-slate-500",
      "shiki-keyword": "ref-violet-600",
      "shiki-number": "ref-orange-600",
      "shiki-string": "ref-green-600",
      "shiki-function": "ref-blue-600",
      "shiki-type": "ref-cyan-600",
      "shiki-parameter": "ref-red-600",
      "shiki-variable": "ref-red-500",
      "shiki-error": "ref-red-600",
      "shiki-regex": "ref-orange-600",
      "shiki-regex-constant": "ref-violet-600",
      "shiki-tag": "ref-red-600",
      "shiki-punctuation": "ref-slate-400",
      "shiki-operator": "ref-violet-600",
      "shiki-label": "ref-slate-600",
      "shiki-header": "ref-blue-500",
      "shiki-list-marker": "ref-blue-600",
      "shiki-builtin": "ref-cyan-600",
      "shiki-property": "ref-orange-500",
      "shiki-placeholder": "ref-cyan-500",
    },
    dark: {
      // Surface tokens — Polar Night backgrounds
      "sys-surface": "ref-slate-950",
      "sys-surface-dim": "ref-slate-900",
      "sys-surface-bright": "ref-slate-800",
      "sys-surface-container": "ref-slate-900",
      "sys-surface-container-low": "ref-slate-950",
      "sys-surface-container-high": "ref-slate-800",
      "sys-surface-container-highest": "ref-slate-700",
      "sys-surface-variant": "ref-slate-900",

      // Content tokens
      "sys-on-surface": "ref-slate-200",
      "sys-on-surface-variant": "ref-slate-300",
      "sys-muted": "ref-slate-500",
      "sys-outline": "ref-slate-600",
      "sys-outline-variant": "ref-slate-700",

      // Primary — blue (nord9)
      "sys-primary": "ref-blue-400",
      "sys-primary-hover": "ref-blue-300",
      "sys-primary-active": "ref-blue-200",
      "sys-primary-container": "ref-blue-900",
      "sys-on-primary": "ref-slate-950",
      "sys-on-primary-container": "ref-blue-100",

      // Secondary — purple (nord15)
      "sys-secondary": "ref-violet-500",
      "sys-secondary-hover": "ref-violet-400",
      "sys-secondary-active": "ref-violet-300",
      "sys-secondary-container": "ref-violet-900",
      "sys-on-secondary": "ref-slate-950",
      "sys-on-secondary-container": "ref-violet-100",

      // Semantic
      "sys-success": "ref-green-400",
      "sys-success-hover": "ref-green-300",
      "sys-success-active": "ref-green-200",
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

      "sys-info": "ref-cyan-400",
      "sys-info-hover": "ref-cyan-300",
      "sys-info-active": "ref-cyan-200",
      "sys-info-container": "ref-cyan-900",
      "sys-on-info": "ref-slate-950",
      "sys-on-info-container": "ref-cyan-100",

      // Interactive states
      "sys-hover": "ref-slate-800",
      "sys-pressed": "ref-slate-700",
      "sys-active": "ref-slate-700",
      "sys-active-highlight": "ref-slate-800",
      "sys-focus": "ref-blue-400",
      "sys-disabled": "ref-slate-800",
      "sys-on-disabled": "ref-slate-500",

      // Special
      "sys-scrim": "ref-slate-200",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-black",

      // Shiki — Nord dark syntax colours
      "shiki-text": "ref-slate-200",
      "shiki-comment": "ref-slate-500",
      "shiki-keyword": "ref-violet-500",
      "shiki-number": "ref-orange-500",
      "shiki-string": "ref-green-400",
      "shiki-function": "ref-blue-400",
      "shiki-type": "ref-cyan-400",
      "shiki-parameter": "ref-red-500",
      "shiki-variable": "ref-red-400",
      "shiki-error": "ref-red-500",
      "shiki-regex": "ref-orange-500",
      "shiki-regex-constant": "ref-violet-500",
      "shiki-tag": "ref-red-500",
      "shiki-punctuation": "ref-slate-400",
      "shiki-operator": "ref-violet-500",
      "shiki-label": "ref-slate-300",
      "shiki-header": "ref-blue-300",
      "shiki-list-marker": "ref-blue-400",
      "shiki-builtin": "ref-cyan-400",
      "shiki-property": "ref-orange-500",
      "shiki-placeholder": "ref-cyan-300",
    },
  },
});
