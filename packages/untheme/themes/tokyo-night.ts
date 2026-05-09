import { defineTheme } from "../src/config";

/**
 * Tokyo Night Theme
 * A clean, dark theme that celebrates the lights of downtown Tokyo
 * Based on the Storm (dark) and Day (light) variants
 * https://github.com/enkia/tokyo-night-vscode-theme
 */
export default defineTheme({
  label: "Tokyo Night",
  reference: {
    // ===== NEUTRALS (blue-tinted grays from the Tokyo Night palette) =====
    "ref-slate-50": "#d5d6db",   // Day background
    "ref-slate-100": "#c0caf5",  // Storm foreground
    "ref-slate-200": "#a9b1d6",  // Foreground dark
    "ref-slate-300": "#9699a3",  // Day comment
    "ref-slate-400": "#737aa2",  // dark5
    "ref-slate-500": "#565f89",  // comment
    "ref-slate-600": "#545c7e",  // dark3
    "ref-slate-700": "#414868",  // terminal black
    "ref-slate-800": "#24283b",  // Storm background
    "ref-slate-900": "#1a1b26",  // Night background
    "ref-slate-950": "#16161e",  // deepest dark

    "ref-gray-50": "#d5d6db",
    "ref-gray-100": "#c0caf5",
    "ref-gray-200": "#a9b1d6",
    "ref-gray-300": "#9699a3",
    "ref-gray-400": "#737aa2",
    "ref-gray-500": "#565f89",
    "ref-gray-600": "#545c7e",
    "ref-gray-700": "#414868",
    "ref-gray-800": "#24283b",
    "ref-gray-900": "#1a1b26",
    "ref-gray-950": "#16161e",

    "ref-zinc-50": "#d5d6db",
    "ref-zinc-100": "#c0caf5",
    "ref-zinc-200": "#a9b1d6",
    "ref-zinc-300": "#9699a3",
    "ref-zinc-400": "#737aa2",
    "ref-zinc-500": "#565f89",
    "ref-zinc-600": "#545c7e",
    "ref-zinc-700": "#414868",
    "ref-zinc-800": "#24283b",
    "ref-zinc-900": "#1a1b26",
    "ref-zinc-950": "#16161e",

    "ref-neutral-50": "#d5d6db",
    "ref-neutral-100": "#c0caf5",
    "ref-neutral-200": "#a9b1d6",
    "ref-neutral-300": "#9699a3",
    "ref-neutral-400": "#737aa2",
    "ref-neutral-500": "#565f89",
    "ref-neutral-600": "#545c7e",
    "ref-neutral-700": "#414868",
    "ref-neutral-800": "#24283b",
    "ref-neutral-900": "#1a1b26",
    "ref-neutral-950": "#16161e",

    "ref-stone-50": "#d5d6db",
    "ref-stone-100": "#c0caf5",
    "ref-stone-200": "#a9b1d6",
    "ref-stone-300": "#9699a3",
    "ref-stone-400": "#737aa2",
    "ref-stone-500": "#565f89",
    "ref-stone-600": "#545c7e",
    "ref-stone-700": "#414868",
    "ref-stone-800": "#24283b",
    "ref-stone-900": "#1a1b26",
    "ref-stone-950": "#16161e",

    // ===== RED (#f7768e dark, #8c4351 light) =====
    "ref-red-50": "#fef2f4",
    "ref-red-100": "#fde6ea",
    "ref-red-200": "#fbcdd5",
    "ref-red-300": "#f9a4b2",
    "ref-red-400": "#f7768e",  // Tokyo Night red
    "ref-red-500": "#e8566e",
    "ref-red-600": "#c73a54",
    "ref-red-700": "#a93048",
    "ref-red-800": "#8c4351",  // Day red
    "ref-red-900": "#6e3641",
    "ref-red-950": "#3d1a22",

    "ref-rose-50": "#fef2f4",
    "ref-rose-100": "#fde6ea",
    "ref-rose-200": "#fbcdd5",
    "ref-rose-300": "#f9a4b2",
    "ref-rose-400": "#f7768e",
    "ref-rose-500": "#e8566e",
    "ref-rose-600": "#c73a54",
    "ref-rose-700": "#a93048",
    "ref-rose-800": "#8c4351",
    "ref-rose-900": "#6e3641",
    "ref-rose-950": "#3d1a22",

    // ===== ORANGE (#ff9e64 dark, #965027 light) =====
    "ref-orange-50": "#fff5ed",
    "ref-orange-100": "#ffe8d4",
    "ref-orange-200": "#ffd1a8",
    "ref-orange-300": "#ffb886",
    "ref-orange-400": "#ff9e64",  // Tokyo Night orange
    "ref-orange-500": "#e07e44",
    "ref-orange-600": "#b86434",
    "ref-orange-700": "#965027",  // Day orange
    "ref-orange-800": "#7a421f",
    "ref-orange-900": "#633619",
    "ref-orange-950": "#361c0c",

    // ===== YELLOW/AMBER (#e0af68 dark, #8f5e15 light) =====
    "ref-yellow-50": "#fdf8ed",
    "ref-yellow-100": "#fbf0d2",
    "ref-yellow-200": "#f5dea5",
    "ref-yellow-300": "#edc97e",
    "ref-yellow-400": "#e0af68",  // Tokyo Night yellow
    "ref-yellow-500": "#c49348",
    "ref-yellow-600": "#a67a35",
    "ref-yellow-700": "#8f5e15",  // Day yellow
    "ref-yellow-800": "#764e12",
    "ref-yellow-900": "#614010",
    "ref-yellow-950": "#352208",

    "ref-amber-50": "#fdf8ed",
    "ref-amber-100": "#fbf0d2",
    "ref-amber-200": "#f5dea5",
    "ref-amber-300": "#edc97e",
    "ref-amber-400": "#e0af68",
    "ref-amber-500": "#c49348",
    "ref-amber-600": "#a67a35",
    "ref-amber-700": "#8f5e15",
    "ref-amber-800": "#764e12",
    "ref-amber-900": "#614010",
    "ref-amber-950": "#352208",

    // ===== GREEN (#9ece6a dark, #385f0d light) =====
    "ref-green-50": "#f4fbe9",
    "ref-green-100": "#e6f6cf",
    "ref-green-200": "#cceda0",
    "ref-green-300": "#b3e180",
    "ref-green-400": "#9ece6a",  // Tokyo Night green
    "ref-green-500": "#7eac4e",
    "ref-green-600": "#5f8a36",
    "ref-green-700": "#4a7320",
    "ref-green-800": "#385f0d",  // Day green
    "ref-green-900": "#2d4e0a",
    "ref-green-950": "#172b05",

    "ref-lime-50": "#f4fbe9",
    "ref-lime-100": "#e6f6cf",
    "ref-lime-200": "#cceda0",
    "ref-lime-300": "#b3e180",
    "ref-lime-400": "#9ece6a",
    "ref-lime-500": "#7eac4e",
    "ref-lime-600": "#5f8a36",
    "ref-lime-700": "#4a7320",
    "ref-lime-800": "#385f0d",
    "ref-lime-900": "#2d4e0a",
    "ref-lime-950": "#172b05",

    // ===== EMERALD/TEAL (#73daca dark, #33635c light) =====
    "ref-emerald-50": "#edfcf7",
    "ref-emerald-100": "#d5f7eb",
    "ref-emerald-200": "#aeefd7",
    "ref-emerald-300": "#8ee6c5",
    "ref-emerald-400": "#73daca",  // Tokyo Night teal
    "ref-emerald-500": "#52b8a0",
    "ref-emerald-600": "#3c9a85",
    "ref-emerald-700": "#33635c",  // Day teal
    "ref-emerald-800": "#2a524d",
    "ref-emerald-900": "#234240",
    "ref-emerald-950": "#122422",

    // ===== TEAL/CYAN (#73daca / #7dcfff dark, #0f4b6e light) =====
    "ref-teal-50": "#edfcfb",
    "ref-teal-100": "#d5f7f4",
    "ref-teal-200": "#aeeee9",
    "ref-teal-300": "#8ee5df",
    "ref-teal-400": "#73daca",  // Tokyo Night teal
    "ref-teal-500": "#52b8a8",
    "ref-teal-600": "#3c9a8c",
    "ref-teal-700": "#2f7a70",
    "ref-teal-800": "#27625a",
    "ref-teal-900": "#21504a",
    "ref-teal-950": "#112c28",

    "ref-cyan-50": "#eef8ff",
    "ref-cyan-100": "#d9efff",
    "ref-cyan-200": "#b4dfff",
    "ref-cyan-300": "#98d7ff",
    "ref-cyan-400": "#7dcfff",  // Tokyo Night blue5/cyan
    "ref-cyan-500": "#57aed8",
    "ref-cyan-600": "#3a8fb5",
    "ref-cyan-700": "#266e92",
    "ref-cyan-800": "#0f4b6e",  // Day cyan
    "ref-cyan-900": "#0c3d5a",
    "ref-cyan-950": "#062030",

    // ===== SKY (#2ac3de dark, derived light) =====
    "ref-sky-50": "#edfafd",
    "ref-sky-100": "#d5f3fa",
    "ref-sky-200": "#a8e6f5",
    "ref-sky-300": "#6dd7ee",
    "ref-sky-400": "#2ac3de",  // Tokyo Night blue1
    "ref-sky-500": "#20a3bb",
    "ref-sky-600": "#18849a",
    "ref-sky-700": "#136a7c",
    "ref-sky-800": "#105564",
    "ref-sky-900": "#0d4552",
    "ref-sky-950": "#072530",

    // ===== BLUE (#7aa2f7 dark, #34548a light) =====
    "ref-blue-50": "#f0f4fe",
    "ref-blue-100": "#dce5fd",
    "ref-blue-200": "#b8cbfb",
    "ref-blue-300": "#99b6f9",
    "ref-blue-400": "#7aa2f7",  // Tokyo Night blue
    "ref-blue-500": "#5c85d8",
    "ref-blue-600": "#456cba",
    "ref-blue-700": "#34548a",  // Day blue
    "ref-blue-800": "#2b4572",
    "ref-blue-900": "#23385e",
    "ref-blue-950": "#141f35",

    // ===== INDIGO (derived from blue, deeper) =====
    "ref-indigo-50": "#eef1fe",
    "ref-indigo-100": "#dce2fd",
    "ref-indigo-200": "#b5c2fb",
    "ref-indigo-300": "#8ea2f8",
    "ref-indigo-400": "#6b86f2",
    "ref-indigo-500": "#5570d8",
    "ref-indigo-600": "#425abb",
    "ref-indigo-700": "#344796",
    "ref-indigo-800": "#2b3a7a",
    "ref-indigo-900": "#243064",
    "ref-indigo-950": "#151c3b",

    // ===== VIOLET/PURPLE (#bb9af7 dark, #5a4a78 light) =====
    "ref-violet-50": "#f8f3ff",
    "ref-violet-100": "#f0e6fe",
    "ref-violet-200": "#e0ccfd",
    "ref-violet-300": "#ceb3fb",
    "ref-violet-400": "#bb9af7",  // Tokyo Night magenta
    "ref-violet-500": "#a07ad8",
    "ref-violet-600": "#8560ba",
    "ref-violet-700": "#6e4e9c",
    "ref-violet-800": "#5a4a78",  // Day magenta
    "ref-violet-900": "#4a3d62",
    "ref-violet-950": "#2b2239",

    "ref-purple-50": "#f7f2ff",
    "ref-purple-100": "#ede4fe",
    "ref-purple-200": "#dacafd",
    "ref-purple-300": "#c1a7fb",
    "ref-purple-400": "#9d7cd8",  // Tokyo Night purple
    "ref-purple-500": "#8564ba",
    "ref-purple-600": "#6e4f9c",
    "ref-purple-700": "#5a4a78",  // Day purple
    "ref-purple-800": "#4b3e64",
    "ref-purple-900": "#3e3352",
    "ref-purple-950": "#231d30",

    "ref-fuchsia-50": "#f8f3ff",
    "ref-fuchsia-100": "#f0e6fe",
    "ref-fuchsia-200": "#e0ccfd",
    "ref-fuchsia-300": "#ceb3fb",
    "ref-fuchsia-400": "#bb9af7",
    "ref-fuchsia-500": "#a07ad8",
    "ref-fuchsia-600": "#8560ba",
    "ref-fuchsia-700": "#6e4e9c",
    "ref-fuchsia-800": "#5a4a78",
    "ref-fuchsia-900": "#4a3d62",
    "ref-fuchsia-950": "#2b2239",

    // ===== PINK (derived from red + magenta blend) =====
    "ref-pink-50": "#fdf2f8",
    "ref-pink-100": "#fce5f0",
    "ref-pink-200": "#f9cce2",
    "ref-pink-300": "#f4a3c8",
    "ref-pink-400": "#ec82ae",
    "ref-pink-500": "#d96694",
    "ref-pink-600": "#ba4d79",
    "ref-pink-700": "#9c3f62",
    "ref-pink-800": "#803551",
    "ref-pink-900": "#6a2e44",
    "ref-pink-950": "#3d1726",
  },
  modes: {
    light: {
      // Surface tokens -- Tokyo Night Day background
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

      // Primary -- blue
      "sys-primary": "ref-blue-700",
      "sys-primary-hover": "ref-blue-800",
      "sys-primary-active": "ref-blue-900",
      "sys-primary-container": "ref-blue-100",
      "sys-on-primary": "ref-slate-50",
      "sys-on-primary-container": "ref-blue-950",

      // Secondary -- purple/magenta
      "sys-secondary": "ref-violet-800",
      "sys-secondary-hover": "ref-violet-900",
      "sys-secondary-active": "ref-violet-950",
      "sys-secondary-container": "ref-violet-100",
      "sys-on-secondary": "ref-slate-50",
      "sys-on-secondary-container": "ref-violet-950",

      // Semantic
      "sys-success": "ref-green-800",
      "sys-success-hover": "ref-green-900",
      "sys-success-active": "ref-green-950",
      "sys-success-container": "ref-green-100",
      "sys-on-success": "ref-slate-50",
      "sys-on-success-container": "ref-green-950",

      "sys-warning": "ref-yellow-700",
      "sys-warning-hover": "ref-yellow-800",
      "sys-warning-active": "ref-yellow-900",
      "sys-warning-container": "ref-yellow-100",
      "sys-on-warning": "ref-slate-950",
      "sys-on-warning-container": "ref-yellow-950",

      "sys-error": "ref-red-800",
      "sys-error-hover": "ref-red-900",
      "sys-error-active": "ref-red-950",
      "sys-error-container": "ref-red-100",
      "sys-on-error": "ref-slate-50",
      "sys-on-error-container": "ref-red-950",

      "sys-info": "ref-cyan-800",
      "sys-info-hover": "ref-cyan-900",
      "sys-info-active": "ref-cyan-950",
      "sys-info-container": "ref-cyan-100",
      "sys-on-info": "ref-slate-50",
      "sys-on-info-container": "ref-cyan-950",

      // Interactive states
      "sys-hover": "ref-slate-100",
      "sys-pressed": "ref-slate-200",
      "sys-active": "ref-slate-200",
      "sys-active-highlight": "ref-slate-100",
      "sys-focus": "ref-blue-700",
      "sys-disabled": "ref-slate-200",
      "sys-on-disabled": "ref-slate-400",

      // Special
      "sys-scrim": "ref-slate-950",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-white",

      // Shiki -- Tokyo Night Day syntax colours
      "shiki-text": "ref-slate-900",
      "shiki-comment": "ref-slate-300",
      "shiki-keyword": "ref-violet-800",
      "shiki-number": "ref-orange-700",
      "shiki-string": "ref-green-800",
      "shiki-function": "ref-blue-700",
      "shiki-type": "ref-cyan-800",
      "shiki-parameter": "ref-red-800",
      "shiki-variable": "ref-red-700",
      "shiki-error": "ref-red-800",
      "shiki-regex": "ref-orange-700",
      "shiki-regex-constant": "ref-violet-800",
      "shiki-tag": "ref-red-800",
      "shiki-punctuation": "ref-slate-400",
      "shiki-operator": "ref-violet-800",
      "shiki-label": "ref-slate-600",
      "shiki-header": "ref-blue-600",
      "shiki-list-marker": "ref-blue-700",
      "shiki-builtin": "ref-cyan-700",
      "shiki-property": "ref-orange-600",
      "shiki-placeholder": "ref-cyan-600",
    },
    dark: {
      // Surface tokens -- Tokyo Night Storm background
      "sys-surface": "ref-slate-800",
      "sys-surface-dim": "ref-slate-900",
      "sys-surface-bright": "ref-slate-700",
      "sys-surface-container": "ref-slate-900",
      "sys-surface-container-low": "ref-slate-950",
      "sys-surface-container-high": "ref-slate-700",
      "sys-surface-container-highest": "ref-slate-600",
      "sys-surface-variant": "ref-slate-900",

      // Content tokens
      "sys-on-surface": "ref-slate-100",
      "sys-on-surface-variant": "ref-slate-200",
      "sys-muted": "ref-slate-500",
      "sys-outline": "ref-slate-600",
      "sys-outline-variant": "ref-slate-700",

      // Primary -- blue
      "sys-primary": "ref-blue-400",
      "sys-primary-hover": "ref-blue-300",
      "sys-primary-active": "ref-blue-200",
      "sys-primary-container": "ref-blue-900",
      "sys-on-primary": "ref-slate-950",
      "sys-on-primary-container": "ref-blue-100",

      // Secondary -- magenta/purple
      "sys-secondary": "ref-violet-400",
      "sys-secondary-hover": "ref-violet-300",
      "sys-secondary-active": "ref-violet-200",
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

      "sys-error": "ref-red-400",
      "sys-error-hover": "ref-red-300",
      "sys-error-active": "ref-red-200",
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
      "sys-hover": "ref-slate-700",
      "sys-pressed": "ref-slate-600",
      "sys-active": "ref-slate-600",
      "sys-active-highlight": "ref-slate-700",
      "sys-focus": "ref-blue-400",
      "sys-disabled": "ref-slate-700",
      "sys-on-disabled": "ref-slate-500",

      // Special
      "sys-scrim": "ref-slate-200",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-black",

      // Shiki -- Tokyo Night Storm syntax colours
      "shiki-text": "ref-slate-100",
      "shiki-comment": "ref-slate-500",
      "shiki-keyword": "ref-violet-400",
      "shiki-number": "ref-orange-400",
      "shiki-string": "ref-green-400",
      "shiki-function": "ref-blue-400",
      "shiki-type": "ref-cyan-400",
      "shiki-parameter": "ref-red-400",
      "shiki-variable": "ref-red-500",
      "shiki-error": "ref-red-400",
      "shiki-regex": "ref-orange-400",
      "shiki-regex-constant": "ref-violet-400",
      "shiki-tag": "ref-red-400",
      "shiki-punctuation": "ref-slate-400",
      "shiki-operator": "ref-sky-400",
      "shiki-label": "ref-slate-200",
      "shiki-header": "ref-blue-300",
      "shiki-list-marker": "ref-blue-400",
      "shiki-builtin": "ref-teal-400",
      "shiki-property": "ref-orange-500",
      "shiki-placeholder": "ref-cyan-300",
    },
  },
});
