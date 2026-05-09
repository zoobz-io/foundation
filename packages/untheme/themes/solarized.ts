import { defineTheme } from "../src/config";

/**
 * Solarized Theme
 * Precision colors for machines and people by Ethan Schoonover
 * https://ethanschoonover.com/solarized/
 */
export default defineTheme({
  label: "Solarized",
  reference: {
    // ===== NEUTRALS (warm cream/teal-gray, base03 through base3) =====
    "ref-slate-50": "#fdf6e3",   // base3 (lightest background)
    "ref-slate-100": "#eee8d5",  // base2 (light background highlights)
    "ref-slate-200": "#d5ceba",
    "ref-slate-300": "#b9b49f",
    "ref-slate-400": "#93a1a1",  // base1
    "ref-slate-500": "#839496",  // base0
    "ref-slate-600": "#657b83",  // base00
    "ref-slate-700": "#586e75",  // base01
    "ref-slate-800": "#073642",  // base02 (dark background highlights)
    "ref-slate-900": "#002b36",  // base03 (darkest background)
    "ref-slate-950": "#001e26",

    "ref-gray-50": "#fdf6e3",
    "ref-gray-100": "#eee8d5",
    "ref-gray-200": "#d5ceba",
    "ref-gray-300": "#b9b49f",
    "ref-gray-400": "#93a1a1",
    "ref-gray-500": "#839496",
    "ref-gray-600": "#657b83",
    "ref-gray-700": "#586e75",
    "ref-gray-800": "#073642",
    "ref-gray-900": "#002b36",
    "ref-gray-950": "#001e26",

    "ref-zinc-50": "#fdf6e3",
    "ref-zinc-100": "#eee8d5",
    "ref-zinc-200": "#d5ceba",
    "ref-zinc-300": "#b9b49f",
    "ref-zinc-400": "#93a1a1",
    "ref-zinc-500": "#839496",
    "ref-zinc-600": "#657b83",
    "ref-zinc-700": "#586e75",
    "ref-zinc-800": "#073642",
    "ref-zinc-900": "#002b36",
    "ref-zinc-950": "#001e26",

    "ref-neutral-50": "#fdf6e3",
    "ref-neutral-100": "#eee8d5",
    "ref-neutral-200": "#d5ceba",
    "ref-neutral-300": "#b9b49f",
    "ref-neutral-400": "#93a1a1",
    "ref-neutral-500": "#839496",
    "ref-neutral-600": "#657b83",
    "ref-neutral-700": "#586e75",
    "ref-neutral-800": "#073642",
    "ref-neutral-900": "#002b36",
    "ref-neutral-950": "#001e26",

    "ref-stone-50": "#fdf6e3",
    "ref-stone-100": "#eee8d5",
    "ref-stone-200": "#d5ceba",
    "ref-stone-300": "#b9b49f",
    "ref-stone-400": "#93a1a1",
    "ref-stone-500": "#839496",
    "ref-stone-600": "#657b83",
    "ref-stone-700": "#586e75",
    "ref-stone-800": "#073642",
    "ref-stone-900": "#002b36",
    "ref-stone-950": "#001e26",

    // ===== RED (#dc322f) =====
    "ref-red-50": "#fef2f1",
    "ref-red-100": "#fde3e2",
    "ref-red-200": "#fbc9c8",
    "ref-red-300": "#f7a3a2",
    "ref-red-400": "#ef6e6c",
    "ref-red-500": "#dc322f",  // Solarized red
    "ref-red-600": "#c42b28",
    "ref-red-700": "#a42321",
    "ref-red-800": "#881d1b",
    "ref-red-900": "#6e1917",
    "ref-red-950": "#3d0c0b",

    "ref-rose-50": "#fef2f1",
    "ref-rose-100": "#fde3e2",
    "ref-rose-200": "#fbc9c8",
    "ref-rose-300": "#f7a3a2",
    "ref-rose-400": "#ef6e6c",
    "ref-rose-500": "#dc322f",
    "ref-rose-600": "#c42b28",
    "ref-rose-700": "#a42321",
    "ref-rose-800": "#881d1b",
    "ref-rose-900": "#6e1917",
    "ref-rose-950": "#3d0c0b",

    // ===== ORANGE (#cb4b16) =====
    "ref-orange-50": "#fdf3ec",
    "ref-orange-100": "#fbe5d4",
    "ref-orange-200": "#f6c9a6",
    "ref-orange-300": "#efa573",
    "ref-orange-400": "#e17a42",
    "ref-orange-500": "#cb4b16",  // Solarized orange
    "ref-orange-600": "#b04012",
    "ref-orange-700": "#92350f",
    "ref-orange-800": "#772c0d",
    "ref-orange-900": "#60240b",
    "ref-orange-950": "#341206",

    // ===== YELLOW/AMBER (#b58900) =====
    "ref-yellow-50": "#fdfaeb",
    "ref-yellow-100": "#fbf2cc",
    "ref-yellow-200": "#f5e298",
    "ref-yellow-300": "#edcf5f",
    "ref-yellow-400": "#d4a820",
    "ref-yellow-500": "#b58900",  // Solarized yellow
    "ref-yellow-600": "#9a7400",
    "ref-yellow-700": "#7f5f00",
    "ref-yellow-800": "#664c00",
    "ref-yellow-900": "#523d00",
    "ref-yellow-950": "#2e2200",

    "ref-amber-50": "#fdfaeb",
    "ref-amber-100": "#fbf2cc",
    "ref-amber-200": "#f5e298",
    "ref-amber-300": "#edcf5f",
    "ref-amber-400": "#d4a820",
    "ref-amber-500": "#b58900",
    "ref-amber-600": "#9a7400",
    "ref-amber-700": "#7f5f00",
    "ref-amber-800": "#664c00",
    "ref-amber-900": "#523d00",
    "ref-amber-950": "#2e2200",

    // ===== GREEN/LIME (#859900) =====
    "ref-green-50": "#f5f9e8",
    "ref-green-100": "#eaf3cc",
    "ref-green-200": "#d3e599",
    "ref-green-300": "#b8d360",
    "ref-green-400": "#9dba2e",
    "ref-green-500": "#859900",  // Solarized green
    "ref-green-600": "#718200",
    "ref-green-700": "#5d6b00",
    "ref-green-800": "#4b5600",
    "ref-green-900": "#3c4500",
    "ref-green-950": "#212600",

    "ref-lime-50": "#f5f9e8",
    "ref-lime-100": "#eaf3cc",
    "ref-lime-200": "#d3e599",
    "ref-lime-300": "#b8d360",
    "ref-lime-400": "#9dba2e",
    "ref-lime-500": "#859900",
    "ref-lime-600": "#718200",
    "ref-lime-700": "#5d6b00",
    "ref-lime-800": "#4b5600",
    "ref-lime-900": "#3c4500",
    "ref-lime-950": "#212600",

    // ===== EMERALD (blended from cyan + green) =====
    "ref-emerald-50": "#f0fcf5",
    "ref-emerald-100": "#d9f7e6",
    "ref-emerald-200": "#b0edcc",
    "ref-emerald-300": "#7cdead",
    "ref-emerald-400": "#4fcc8e",
    "ref-emerald-500": "#37a870",
    "ref-emerald-600": "#2a8d5c",
    "ref-emerald-700": "#22724a",
    "ref-emerald-800": "#1c5c3c",
    "ref-emerald-900": "#184b32",
    "ref-emerald-950": "#0c291b",

    // ===== CYAN/TEAL (#2aa198) =====
    "ref-teal-50": "#effcfb",
    "ref-teal-100": "#d5f6f3",
    "ref-teal-200": "#a8ece6",
    "ref-teal-300": "#73ddd3",
    "ref-teal-400": "#44c9be",
    "ref-teal-500": "#2aa198",  // Solarized cyan
    "ref-teal-600": "#238880",
    "ref-teal-700": "#1c6f69",
    "ref-teal-800": "#175a55",
    "ref-teal-900": "#134945",
    "ref-teal-950": "#0a2928",

    "ref-cyan-50": "#effcfb",
    "ref-cyan-100": "#d5f6f3",
    "ref-cyan-200": "#a8ece6",
    "ref-cyan-300": "#73ddd3",
    "ref-cyan-400": "#44c9be",
    "ref-cyan-500": "#2aa198",
    "ref-cyan-600": "#238880",
    "ref-cyan-700": "#1c6f69",
    "ref-cyan-800": "#175a55",
    "ref-cyan-900": "#134945",
    "ref-cyan-950": "#0a2928",

    // ===== SKY/BLUE (#268bd2) =====
    "ref-sky-50": "#f0f7fe",
    "ref-sky-100": "#dcedfd",
    "ref-sky-200": "#b6d9fb",
    "ref-sky-300": "#86c0f7",
    "ref-sky-400": "#52a5f0",
    "ref-sky-500": "#268bd2",  // Solarized blue
    "ref-sky-600": "#2076b4",
    "ref-sky-700": "#1a6194",
    "ref-sky-800": "#164f79",
    "ref-sky-900": "#134063",
    "ref-sky-950": "#0b2640",

    "ref-blue-50": "#f0f7fe",
    "ref-blue-100": "#dcedfd",
    "ref-blue-200": "#b6d9fb",
    "ref-blue-300": "#86c0f7",
    "ref-blue-400": "#52a5f0",
    "ref-blue-500": "#268bd2",  // Solarized blue
    "ref-blue-600": "#2076b4",
    "ref-blue-700": "#1a6194",
    "ref-blue-800": "#164f79",
    "ref-blue-900": "#134063",
    "ref-blue-950": "#0b2640",

    // ===== INDIGO (derived from violet, shifted toward blue) =====
    "ref-indigo-50": "#f2f2fe",
    "ref-indigo-100": "#e3e4fd",
    "ref-indigo-200": "#c6c9fb",
    "ref-indigo-300": "#a2a7f5",
    "ref-indigo-400": "#858aec",
    "ref-indigo-500": "#6c71c4",  // Solarized violet
    "ref-indigo-600": "#5b5faa",
    "ref-indigo-700": "#4b4e8e",
    "ref-indigo-800": "#3e4075",
    "ref-indigo-900": "#333560",
    "ref-indigo-950": "#1e1f3a",

    // ===== VIOLET/PURPLE (#6c71c4) =====
    "ref-violet-50": "#f4f3ff",
    "ref-violet-100": "#e8e7fe",
    "ref-violet-200": "#d1cffd",
    "ref-violet-300": "#b1aefb",
    "ref-violet-400": "#918df6",
    "ref-violet-500": "#6c71c4",  // Solarized violet
    "ref-violet-600": "#5a5eaa",
    "ref-violet-700": "#4a4d8e",
    "ref-violet-800": "#3d3f75",
    "ref-violet-900": "#323460",
    "ref-violet-950": "#1d1e3a",

    "ref-purple-50": "#f4f3ff",
    "ref-purple-100": "#e8e7fe",
    "ref-purple-200": "#d1cffd",
    "ref-purple-300": "#b1aefb",
    "ref-purple-400": "#918df6",
    "ref-purple-500": "#6c71c4",
    "ref-purple-600": "#5a5eaa",
    "ref-purple-700": "#4a4d8e",
    "ref-purple-800": "#3d3f75",
    "ref-purple-900": "#323460",
    "ref-purple-950": "#1d1e3a",

    "ref-fuchsia-50": "#fdf3fa",
    "ref-fuchsia-100": "#fbe5f4",
    "ref-fuchsia-200": "#f6c9e7",
    "ref-fuchsia-300": "#efa3d3",
    "ref-fuchsia-400": "#e473b8",
    "ref-fuchsia-500": "#d33682",  // Solarized magenta
    "ref-fuchsia-600": "#b52d6e",
    "ref-fuchsia-700": "#96255b",
    "ref-fuchsia-800": "#7b1e4a",
    "ref-fuchsia-900": "#64193d",
    "ref-fuchsia-950": "#380d22",

    // ===== PINK/MAGENTA (#d33682) =====
    "ref-pink-50": "#fdf3f8",
    "ref-pink-100": "#fbe5f0",
    "ref-pink-200": "#f6c9df",
    "ref-pink-300": "#efa3c8",
    "ref-pink-400": "#e473aa",
    "ref-pink-500": "#d33682",  // Solarized magenta
    "ref-pink-600": "#b52d6e",
    "ref-pink-700": "#96255b",
    "ref-pink-800": "#7b1e4a",
    "ref-pink-900": "#64193d",
    "ref-pink-950": "#380d22",
  },
  modes: {
    light: {
      // Surface tokens — Solarized Light: base3 background
      "sys-surface": "ref-slate-50",
      "sys-surface-dim": "ref-slate-100",
      "sys-surface-bright": "ref-slate-50",
      "sys-surface-container": "ref-slate-100",
      "sys-surface-container-low": "ref-slate-50",
      "sys-surface-container-high": "ref-slate-200",
      "sys-surface-container-highest": "ref-slate-300",
      "sys-surface-variant": "ref-slate-100",

      // Content tokens — base00 as primary text
      "sys-on-surface": "ref-slate-900",
      "sys-on-surface-variant": "ref-slate-700",
      "sys-muted": "ref-slate-400",
      "sys-outline": "ref-slate-400",
      "sys-outline-variant": "ref-slate-300",

      // Primary — blue (#268bd2)
      "sys-primary": "ref-blue-500",
      "sys-primary-hover": "ref-blue-600",
      "sys-primary-active": "ref-blue-700",
      "sys-primary-container": "ref-blue-100",
      "sys-on-primary": "ref-slate-50",
      "sys-on-primary-container": "ref-blue-950",

      // Secondary — violet (#6c71c4)
      "sys-secondary": "ref-violet-500",
      "sys-secondary-hover": "ref-violet-600",
      "sys-secondary-active": "ref-violet-700",
      "sys-secondary-container": "ref-violet-100",
      "sys-on-secondary": "ref-slate-50",
      "sys-on-secondary-container": "ref-violet-950",

      // Semantic
      "sys-success": "ref-green-500",
      "sys-success-hover": "ref-green-600",
      "sys-success-active": "ref-green-700",
      "sys-success-container": "ref-green-100",
      "sys-on-success": "ref-slate-50",
      "sys-on-success-container": "ref-green-950",

      "sys-warning": "ref-yellow-500",
      "sys-warning-hover": "ref-yellow-600",
      "sys-warning-active": "ref-yellow-700",
      "sys-warning-container": "ref-yellow-100",
      "sys-on-warning": "ref-slate-950",
      "sys-on-warning-container": "ref-yellow-950",

      "sys-error": "ref-red-500",
      "sys-error-hover": "ref-red-600",
      "sys-error-active": "ref-red-700",
      "sys-error-container": "ref-red-100",
      "sys-on-error": "ref-slate-50",
      "sys-on-error-container": "ref-red-950",

      "sys-info": "ref-cyan-500",
      "sys-info-hover": "ref-cyan-600",
      "sys-info-active": "ref-cyan-700",
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

      // Shiki — Solarized Light syntax colours
      "shiki-text": "ref-slate-600",
      "shiki-comment": "ref-slate-400",
      "shiki-keyword": "ref-green-500",
      "shiki-number": "ref-violet-500",
      "shiki-string": "ref-cyan-500",
      "shiki-function": "ref-blue-500",
      "shiki-type": "ref-yellow-500",
      "shiki-parameter": "ref-blue-500",
      "shiki-variable": "ref-blue-500",
      "shiki-error": "ref-red-500",
      "shiki-regex": "ref-orange-500",
      "shiki-regex-constant": "ref-violet-500",
      "shiki-tag": "ref-blue-500",
      "shiki-punctuation": "ref-slate-400",
      "shiki-operator": "ref-green-500",
      "shiki-label": "ref-slate-600",
      "shiki-header": "ref-orange-500",
      "shiki-list-marker": "ref-blue-500",
      "shiki-builtin": "ref-cyan-500",
      "shiki-property": "ref-orange-500",
      "shiki-placeholder": "ref-cyan-500",
    },
    dark: {
      // Surface tokens — Solarized Dark: base03 background
      "sys-surface": "ref-slate-900",
      "sys-surface-dim": "ref-slate-950",
      "sys-surface-bright": "ref-slate-800",
      "sys-surface-container": "ref-slate-900",
      "sys-surface-container-low": "ref-slate-950",
      "sys-surface-container-high": "ref-slate-800",
      "sys-surface-container-highest": "ref-slate-700",
      "sys-surface-variant": "ref-slate-800",

      // Content tokens — base0 as primary text
      "sys-on-surface": "ref-slate-500",
      "sys-on-surface-variant": "ref-slate-400",
      "sys-muted": "ref-slate-700",
      "sys-outline": "ref-slate-700",
      "sys-outline-variant": "ref-slate-800",

      // Primary — blue (#268bd2)
      "sys-primary": "ref-blue-500",
      "sys-primary-hover": "ref-blue-400",
      "sys-primary-active": "ref-blue-300",
      "sys-primary-container": "ref-blue-900",
      "sys-on-primary": "ref-slate-950",
      "sys-on-primary-container": "ref-blue-100",

      // Secondary — violet (#6c71c4)
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
      "sys-hover": "ref-slate-800",
      "sys-pressed": "ref-slate-700",
      "sys-active": "ref-slate-700",
      "sys-active-highlight": "ref-slate-800",
      "sys-focus": "ref-blue-500",
      "sys-disabled": "ref-slate-800",
      "sys-on-disabled": "ref-slate-600",

      // Special
      "sys-scrim": "ref-slate-400",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-black",

      // Shiki — Solarized Dark syntax colours (same accents, flipped base)
      "shiki-text": "ref-slate-500",
      "shiki-comment": "ref-slate-700",
      "shiki-keyword": "ref-green-500",
      "shiki-number": "ref-violet-500",
      "shiki-string": "ref-cyan-500",
      "shiki-function": "ref-blue-500",
      "shiki-type": "ref-yellow-500",
      "shiki-parameter": "ref-blue-500",
      "shiki-variable": "ref-blue-500",
      "shiki-error": "ref-red-500",
      "shiki-regex": "ref-orange-500",
      "shiki-regex-constant": "ref-violet-500",
      "shiki-tag": "ref-blue-500",
      "shiki-punctuation": "ref-slate-700",
      "shiki-operator": "ref-green-500",
      "shiki-label": "ref-slate-400",
      "shiki-header": "ref-orange-500",
      "shiki-list-marker": "ref-blue-500",
      "shiki-builtin": "ref-cyan-500",
      "shiki-property": "ref-orange-500",
      "shiki-placeholder": "ref-cyan-500",
    },
  },
});
