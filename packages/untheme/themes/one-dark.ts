import { defineTheme } from "../src/config";

/**
 * One Dark Theme
 * The iconic Atom editor theme by GitHub
 * https://github.com/atom/atom/tree/master/packages/one-dark-syntax
 */
export default defineTheme({
  label: "One Dark",
  reference: {
    // ===== NEUTRALS (cool slate-blue grays) =====
    "ref-slate-50": "#e8eaed",
    "ref-slate-100": "#d1d4da",
    "ref-slate-200": "#abb2bf",  // mono-1 (foreground)
    "ref-slate-300": "#828997",  // mono-2
    "ref-slate-400": "#636d83",  // gutter
    "ref-slate-500": "#5c6370",  // mono-3 (comments)
    "ref-slate-600": "#4b5263",
    "ref-slate-700": "#3e4451",  // selection
    "ref-slate-800": "#282c34",  // editor background
    "ref-slate-900": "#21252b",  // darker background
    "ref-slate-950": "#181a1f",  // darkest

    "ref-gray-50": "#e8eaed",
    "ref-gray-100": "#d1d4da",
    "ref-gray-200": "#abb2bf",
    "ref-gray-300": "#828997",
    "ref-gray-400": "#636d83",
    "ref-gray-500": "#5c6370",
    "ref-gray-600": "#4b5263",
    "ref-gray-700": "#3e4451",
    "ref-gray-800": "#282c34",
    "ref-gray-900": "#21252b",
    "ref-gray-950": "#181a1f",

    "ref-zinc-50": "#e8eaed",
    "ref-zinc-100": "#d1d4da",
    "ref-zinc-200": "#abb2bf",
    "ref-zinc-300": "#828997",
    "ref-zinc-400": "#636d83",
    "ref-zinc-500": "#5c6370",
    "ref-zinc-600": "#4b5263",
    "ref-zinc-700": "#3e4451",
    "ref-zinc-800": "#282c34",
    "ref-zinc-900": "#21252b",
    "ref-zinc-950": "#181a1f",

    "ref-neutral-50": "#e8eaed",
    "ref-neutral-100": "#d1d4da",
    "ref-neutral-200": "#abb2bf",
    "ref-neutral-300": "#828997",
    "ref-neutral-400": "#636d83",
    "ref-neutral-500": "#5c6370",
    "ref-neutral-600": "#4b5263",
    "ref-neutral-700": "#3e4451",
    "ref-neutral-800": "#282c34",
    "ref-neutral-900": "#21252b",
    "ref-neutral-950": "#181a1f",

    "ref-stone-50": "#e8eaed",
    "ref-stone-100": "#d1d4da",
    "ref-stone-200": "#abb2bf",
    "ref-stone-300": "#828997",
    "ref-stone-400": "#636d83",
    "ref-stone-500": "#5c6370",
    "ref-stone-600": "#4b5263",
    "ref-stone-700": "#3e4451",
    "ref-stone-800": "#282c34",
    "ref-stone-900": "#21252b",
    "ref-stone-950": "#181a1f",

    // ===== RED (hue-5: #e06c75) =====
    "ref-red-50": "#fdf2f3",
    "ref-red-100": "#fce4e6",
    "ref-red-200": "#f9cdd1",
    "ref-red-300": "#f2a4ab",
    "ref-red-400": "#e8838b",
    "ref-red-500": "#e06c75",  // One Dark red
    "ref-red-600": "#be5046",  // hue-5-2
    "ref-red-700": "#a3423a",
    "ref-red-800": "#893832",
    "ref-red-900": "#6e2e2a",
    "ref-red-950": "#3d1614",

    "ref-rose-50": "#fdf2f3",
    "ref-rose-100": "#fce4e6",
    "ref-rose-200": "#f9cdd1",
    "ref-rose-300": "#f2a4ab",
    "ref-rose-400": "#e8838b",
    "ref-rose-500": "#e06c75",
    "ref-rose-600": "#be5046",
    "ref-rose-700": "#a3423a",
    "ref-rose-800": "#893832",
    "ref-rose-900": "#6e2e2a",
    "ref-rose-950": "#3d1614",

    // ===== ORANGE (hue-6: #d19a66) =====
    "ref-orange-50": "#fdf6ef",
    "ref-orange-100": "#faebd8",
    "ref-orange-200": "#f4d5af",
    "ref-orange-300": "#e8bc88",
    "ref-orange-400": "#daa873",
    "ref-orange-500": "#d19a66",  // One Dark orange
    "ref-orange-600": "#b07a48",
    "ref-orange-700": "#935f38",
    "ref-orange-800": "#7a4e30",
    "ref-orange-900": "#644029",
    "ref-orange-950": "#352014",

    // ===== YELLOW/AMBER (hue-6-2: #e5c07b) =====
    "ref-yellow-50": "#fdfaed",
    "ref-yellow-100": "#fbf3d2",
    "ref-yellow-200": "#f5e4a2",
    "ref-yellow-300": "#edd177",
    "ref-yellow-400": "#e9c97b",
    "ref-yellow-500": "#e5c07b",  // One Dark yellow
    "ref-yellow-600": "#c4a05a",
    "ref-yellow-700": "#a38142",
    "ref-yellow-800": "#856837",
    "ref-yellow-900": "#6d5530",
    "ref-yellow-950": "#3d2e17",

    "ref-amber-50": "#fdfaed",
    "ref-amber-100": "#fbf3d2",
    "ref-amber-200": "#f5e4a2",
    "ref-amber-300": "#edd177",
    "ref-amber-400": "#e9c97b",
    "ref-amber-500": "#e5c07b",
    "ref-amber-600": "#c4a05a",
    "ref-amber-700": "#a38142",
    "ref-amber-800": "#856837",
    "ref-amber-900": "#6d5530",
    "ref-amber-950": "#3d2e17",

    // ===== GREEN (hue-4: #98c379) =====
    "ref-green-50": "#f3faf0",
    "ref-green-100": "#e4f4dc",
    "ref-green-200": "#c9e8ba",
    "ref-green-300": "#aed998",
    "ref-green-400": "#a0cf87",
    "ref-green-500": "#98c379",  // One Dark green
    "ref-green-600": "#7aa35e",
    "ref-green-700": "#5f8348",
    "ref-green-800": "#4e6a3c",
    "ref-green-900": "#415834",
    "ref-green-950": "#22301b",

    "ref-lime-50": "#f3faf0",
    "ref-lime-100": "#e4f4dc",
    "ref-lime-200": "#c9e8ba",
    "ref-lime-300": "#aed998",
    "ref-lime-400": "#a0cf87",
    "ref-lime-500": "#98c379",
    "ref-lime-600": "#7aa35e",
    "ref-lime-700": "#5f8348",
    "ref-lime-800": "#4e6a3c",
    "ref-lime-900": "#415834",
    "ref-lime-950": "#22301b",

    // ===== EMERALD/TEAL (mapped to cyan/green blend) =====
    "ref-emerald-50": "#edfcf6",
    "ref-emerald-100": "#d5f7e8",
    "ref-emerald-200": "#aeedd4",
    "ref-emerald-300": "#79deba",
    "ref-emerald-400": "#59c9a2",
    "ref-emerald-500": "#56b6c2",
    "ref-emerald-600": "#449590",
    "ref-emerald-700": "#357773",
    "ref-emerald-800": "#2d5f5e",
    "ref-emerald-900": "#274e4e",
    "ref-emerald-950": "#132c2d",

    // ===== CYAN/TEAL (hue-1: #56b6c2) =====
    "ref-teal-50": "#effcfb",
    "ref-teal-100": "#d5f6f5",
    "ref-teal-200": "#b0edec",
    "ref-teal-300": "#7adede",
    "ref-teal-400": "#62cace",
    "ref-teal-500": "#56b6c2",  // One Dark cyan
    "ref-teal-600": "#3d929f",
    "ref-teal-700": "#317681",
    "ref-teal-800": "#2b6069",
    "ref-teal-900": "#274f57",
    "ref-teal-950": "#142e34",

    "ref-cyan-50": "#effcfb",
    "ref-cyan-100": "#d5f6f5",
    "ref-cyan-200": "#b0edec",
    "ref-cyan-300": "#7adede",
    "ref-cyan-400": "#62cace",
    "ref-cyan-500": "#56b6c2",
    "ref-cyan-600": "#3d929f",
    "ref-cyan-700": "#317681",
    "ref-cyan-800": "#2b6069",
    "ref-cyan-900": "#274f57",
    "ref-cyan-950": "#142e34",

    // ===== SKY/BLUE (hue-2: #61afef, accent: #528bff) =====
    "ref-sky-50": "#f0f7ff",
    "ref-sky-100": "#dceefe",
    "ref-sky-200": "#b9ddfe",
    "ref-sky-300": "#8dc8fc",
    "ref-sky-400": "#74bbf7",
    "ref-sky-500": "#61afef",  // One Dark blue
    "ref-sky-600": "#4a8fd4",
    "ref-sky-700": "#3a72ab",
    "ref-sky-800": "#305e8d",
    "ref-sky-900": "#2b4f74",
    "ref-sky-950": "#1a3148",

    "ref-blue-50": "#f0f4ff",
    "ref-blue-100": "#dce6fe",
    "ref-blue-200": "#b8cdfe",
    "ref-blue-300": "#8badfb",
    "ref-blue-400": "#6d9bf8",
    "ref-blue-500": "#528bff",  // One Dark accent blue
    "ref-blue-600": "#4070d8",
    "ref-blue-700": "#3359b0",
    "ref-blue-800": "#2c4a91",
    "ref-blue-900": "#283f74",
    "ref-blue-950": "#192748",

    // ===== INDIGO (derived from accent blue) =====
    "ref-indigo-50": "#f0f2ff",
    "ref-indigo-100": "#e0e4ff",
    "ref-indigo-200": "#c0c9fe",
    "ref-indigo-300": "#99a6fb",
    "ref-indigo-400": "#7b8af6",
    "ref-indigo-500": "#6272e8",
    "ref-indigo-600": "#4f5bcc",
    "ref-indigo-700": "#4049a6",
    "ref-indigo-800": "#373e87",
    "ref-indigo-900": "#31376c",
    "ref-indigo-950": "#1e2040",

    // ===== VIOLET/PURPLE (hue-3: #c678dd) =====
    "ref-violet-50": "#faf5ff",
    "ref-violet-100": "#f3e7fe",
    "ref-violet-200": "#e8d1fd",
    "ref-violet-300": "#d7aefb",
    "ref-violet-400": "#cf93ec",
    "ref-violet-500": "#c678dd",  // One Dark purple
    "ref-violet-600": "#a85cbf",
    "ref-violet-700": "#8d489f",
    "ref-violet-800": "#753d83",
    "ref-violet-900": "#60336b",
    "ref-violet-950": "#3e1a48",

    "ref-purple-50": "#faf5ff",
    "ref-purple-100": "#f3e7fe",
    "ref-purple-200": "#e8d1fd",
    "ref-purple-300": "#d7aefb",
    "ref-purple-400": "#cf93ec",
    "ref-purple-500": "#c678dd",
    "ref-purple-600": "#a85cbf",
    "ref-purple-700": "#8d489f",
    "ref-purple-800": "#753d83",
    "ref-purple-900": "#60336b",
    "ref-purple-950": "#3e1a48",

    "ref-fuchsia-50": "#faf5ff",
    "ref-fuchsia-100": "#f3e7fe",
    "ref-fuchsia-200": "#e8d1fd",
    "ref-fuchsia-300": "#d7aefb",
    "ref-fuchsia-400": "#cf93ec",
    "ref-fuchsia-500": "#c678dd",
    "ref-fuchsia-600": "#a85cbf",
    "ref-fuchsia-700": "#8d489f",
    "ref-fuchsia-800": "#753d83",
    "ref-fuchsia-900": "#60336b",
    "ref-fuchsia-950": "#3e1a48",

    // ===== PINK (derived from red + purple) =====
    "ref-pink-50": "#fdf2f7",
    "ref-pink-100": "#fce4ee",
    "ref-pink-200": "#f9cce0",
    "ref-pink-300": "#f2a3c7",
    "ref-pink-400": "#e880ad",
    "ref-pink-500": "#d96590",
    "ref-pink-600": "#be4d76",
    "ref-pink-700": "#9f3d5e",
    "ref-pink-800": "#83354f",
    "ref-pink-900": "#6e3044",
    "ref-pink-950": "#401724",
  },
  modes: {
    light: {
      // Surface tokens — One Light background
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

      // Primary — blue
      "sys-primary": "ref-blue-600",
      "sys-primary-hover": "ref-blue-700",
      "sys-primary-active": "ref-blue-800",
      "sys-primary-container": "ref-blue-100",
      "sys-on-primary": "ref-slate-50",
      "sys-on-primary-container": "ref-blue-950",

      // Secondary — purple
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

      // Shiki — One Light syntax colours
      "shiki-text": "ref-slate-900",
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
      // Surface tokens — One Dark background
      "sys-surface": "ref-slate-800",
      "sys-surface-dim": "ref-slate-900",
      "sys-surface-bright": "ref-slate-700",
      "sys-surface-container": "ref-slate-900",
      "sys-surface-container-low": "ref-slate-950",
      "sys-surface-container-high": "ref-slate-700",
      "sys-surface-container-highest": "ref-slate-600",
      "sys-surface-variant": "ref-slate-900",

      // Content tokens
      "sys-on-surface": "ref-slate-200",
      "sys-on-surface-variant": "ref-slate-300",
      "sys-muted": "ref-slate-500",
      "sys-outline": "ref-slate-600",
      "sys-outline-variant": "ref-slate-700",

      // Primary — blue
      "sys-primary": "ref-sky-500",
      "sys-primary-hover": "ref-sky-400",
      "sys-primary-active": "ref-sky-300",
      "sys-primary-container": "ref-sky-900",
      "sys-on-primary": "ref-slate-950",
      "sys-on-primary-container": "ref-sky-100",

      // Secondary — purple
      "sys-secondary": "ref-violet-500",
      "sys-secondary-hover": "ref-violet-400",
      "sys-secondary-active": "ref-violet-300",
      "sys-secondary-container": "ref-violet-900",
      "sys-on-secondary": "ref-slate-950",
      "sys-on-secondary-container": "ref-violet-100",

      // Semantic
      "sys-success": "ref-green-500",
      "sys-success-hover": "ref-green-400",
      "sys-success-active": "ref-green-300",
      "sys-success-container": "ref-green-900",
      "sys-on-success": "ref-slate-950",
      "sys-on-success-container": "ref-green-100",

      "sys-warning": "ref-yellow-500",
      "sys-warning-hover": "ref-yellow-400",
      "sys-warning-active": "ref-yellow-300",
      "sys-warning-container": "ref-yellow-900",
      "sys-on-warning": "ref-slate-950",
      "sys-on-warning-container": "ref-yellow-100",

      "sys-error": "ref-red-500",
      "sys-error-hover": "ref-red-400",
      "sys-error-active": "ref-red-300",
      "sys-error-container": "ref-red-900",
      "sys-on-error": "ref-slate-950",
      "sys-on-error-container": "ref-red-100",

      "sys-info": "ref-cyan-500",
      "sys-info-hover": "ref-cyan-400",
      "sys-info-active": "ref-cyan-300",
      "sys-info-container": "ref-cyan-900",
      "sys-on-info": "ref-slate-950",
      "sys-on-info-container": "ref-cyan-100",

      // Interactive states
      "sys-hover": "ref-slate-700",
      "sys-pressed": "ref-slate-600",
      "sys-active": "ref-slate-600",
      "sys-active-highlight": "ref-slate-700",
      "sys-focus": "ref-sky-500",
      "sys-disabled": "ref-slate-700",
      "sys-on-disabled": "ref-slate-500",

      // Special
      "sys-scrim": "ref-slate-200",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-black",

      // Shiki — One Dark syntax colours
      "shiki-text": "ref-slate-200",
      "shiki-comment": "ref-slate-500",
      "shiki-keyword": "ref-violet-500",
      "shiki-number": "ref-orange-500",
      "shiki-string": "ref-green-500",
      "shiki-function": "ref-sky-500",
      "shiki-type": "ref-cyan-500",
      "shiki-parameter": "ref-red-500",
      "shiki-variable": "ref-red-400",
      "shiki-error": "ref-red-500",
      "shiki-regex": "ref-orange-500",
      "shiki-regex-constant": "ref-violet-500",
      "shiki-tag": "ref-red-500",
      "shiki-punctuation": "ref-slate-400",
      "shiki-operator": "ref-violet-500",
      "shiki-label": "ref-slate-300",
      "shiki-header": "ref-sky-400",
      "shiki-list-marker": "ref-sky-500",
      "shiki-builtin": "ref-cyan-500",
      "shiki-property": "ref-orange-500",
      "shiki-placeholder": "ref-cyan-400",
    },
  },
});
