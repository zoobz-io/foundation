import { defineTheme } from "../src/config";

/**
 * Catppuccin Theme
 * Soothing pastel theme for the high-spirited
 * Mocha (dark) and Latte (light) flavours
 * https://github.com/catppuccin/catppuccin
 */
export default defineTheme({
  label: "Catppuccin",
  reference: {
    // ===== NEUTRALS (Catppuccin base/surface/overlay/text progression) =====
    // 50 = lightest (Latte Base), 950 = darkest (Mocha Crust)
    "ref-slate-50": "#eff1f5",   // Latte Base
    "ref-slate-100": "#e6e9ef",  // Latte Mantle
    "ref-slate-200": "#ccd0da",  // Latte Surface0
    "ref-slate-300": "#bcc0cc",  // Latte Surface1
    "ref-slate-400": "#9ca0b0",  // Latte Overlay0
    "ref-slate-500": "#7c7f93",  // Latte Overlay2
    "ref-slate-600": "#585b70",  // Mocha Surface2
    "ref-slate-700": "#45475a",  // Mocha Surface1
    "ref-slate-800": "#1e1e2e",  // Mocha Base
    "ref-slate-900": "#181825",  // Mocha Mantle
    "ref-slate-950": "#11111b",  // Mocha Crust

    "ref-gray-50": "#eff1f5",
    "ref-gray-100": "#e6e9ef",
    "ref-gray-200": "#ccd0da",
    "ref-gray-300": "#bcc0cc",
    "ref-gray-400": "#9ca0b0",
    "ref-gray-500": "#7c7f93",
    "ref-gray-600": "#585b70",
    "ref-gray-700": "#45475a",
    "ref-gray-800": "#1e1e2e",
    "ref-gray-900": "#181825",
    "ref-gray-950": "#11111b",

    "ref-zinc-50": "#eff1f5",
    "ref-zinc-100": "#e6e9ef",
    "ref-zinc-200": "#ccd0da",
    "ref-zinc-300": "#bcc0cc",
    "ref-zinc-400": "#9ca0b0",
    "ref-zinc-500": "#7c7f93",
    "ref-zinc-600": "#585b70",
    "ref-zinc-700": "#45475a",
    "ref-zinc-800": "#1e1e2e",
    "ref-zinc-900": "#181825",
    "ref-zinc-950": "#11111b",

    "ref-neutral-50": "#eff1f5",
    "ref-neutral-100": "#e6e9ef",
    "ref-neutral-200": "#ccd0da",
    "ref-neutral-300": "#bcc0cc",
    "ref-neutral-400": "#9ca0b0",
    "ref-neutral-500": "#7c7f93",
    "ref-neutral-600": "#585b70",
    "ref-neutral-700": "#45475a",
    "ref-neutral-800": "#1e1e2e",
    "ref-neutral-900": "#181825",
    "ref-neutral-950": "#11111b",

    "ref-stone-50": "#eff1f5",
    "ref-stone-100": "#e6e9ef",
    "ref-stone-200": "#ccd0da",
    "ref-stone-300": "#bcc0cc",
    "ref-stone-400": "#9ca0b0",
    "ref-stone-500": "#7c7f93",
    "ref-stone-600": "#585b70",
    "ref-stone-700": "#45475a",
    "ref-stone-800": "#1e1e2e",
    "ref-stone-900": "#181825",
    "ref-stone-950": "#11111b",

    // ===== RED (Catppuccin Red: Mocha #f38ba8, Latte #d20f39) =====
    "ref-red-50": "#fef1f4",
    "ref-red-100": "#fde4ea",
    "ref-red-200": "#fbcad6",
    "ref-red-300": "#f7a3b7",
    "ref-red-400": "#f38ba8",  // Mocha Red
    "ref-red-500": "#e6456e",
    "ref-red-600": "#d20f39",  // Latte Red
    "ref-red-700": "#b10d30",
    "ref-red-800": "#930b28",
    "ref-red-900": "#7a0a22",
    "ref-red-950": "#430513",

    // ===== ROSE (Catppuccin Maroon: Mocha #eba0ac, Latte #e64553) =====
    "ref-rose-50": "#fef2f4",
    "ref-rose-100": "#fde5e9",
    "ref-rose-200": "#fbcdd4",
    "ref-rose-300": "#f3b0b9",
    "ref-rose-400": "#eba0ac",  // Mocha Maroon
    "ref-rose-500": "#e67283",
    "ref-rose-600": "#e64553",  // Latte Maroon
    "ref-rose-700": "#c23345",
    "ref-rose-800": "#a12b3b",
    "ref-rose-900": "#862434",
    "ref-rose-950": "#4a121c",

    // ===== ORANGE (Catppuccin Peach: Mocha #fab387, Latte #fe640b) =====
    "ref-orange-50": "#fef6ee",
    "ref-orange-100": "#fdebd6",
    "ref-orange-200": "#fcd6ad",
    "ref-orange-300": "#fac28e",
    "ref-orange-400": "#fab387",  // Mocha Peach
    "ref-orange-500": "#fe8b3e",
    "ref-orange-600": "#fe640b",  // Latte Peach
    "ref-orange-700": "#d35209",
    "ref-orange-800": "#ab420b",
    "ref-orange-900": "#88350e",
    "ref-orange-950": "#4a1b06",

    // ===== YELLOW (Catppuccin Yellow: Mocha #f9e2af, Latte #df8e1d) =====
    "ref-yellow-50": "#fefaee",
    "ref-yellow-100": "#fdf4d6",
    "ref-yellow-200": "#fbeaaf",
    "ref-yellow-300": "#f9e2af",  // Mocha Yellow
    "ref-yellow-400": "#f0c34e",
    "ref-yellow-500": "#e8a82e",
    "ref-yellow-600": "#df8e1d",  // Latte Yellow
    "ref-yellow-700": "#ba7318",
    "ref-yellow-800": "#975b16",
    "ref-yellow-900": "#7b4a16",
    "ref-yellow-950": "#43270b",

    // ===== AMBER (same as Yellow — Catppuccin Yellow) =====
    "ref-amber-50": "#fefaee",
    "ref-amber-100": "#fdf4d6",
    "ref-amber-200": "#fbeaaf",
    "ref-amber-300": "#f9e2af",
    "ref-amber-400": "#f0c34e",
    "ref-amber-500": "#e8a82e",
    "ref-amber-600": "#df8e1d",
    "ref-amber-700": "#ba7318",
    "ref-amber-800": "#975b16",
    "ref-amber-900": "#7b4a16",
    "ref-amber-950": "#43270b",

    // ===== GREEN (Catppuccin Green: Mocha #a6e3a1, Latte #40a02b) =====
    "ref-green-50": "#f1faf0",
    "ref-green-100": "#dff5dd",
    "ref-green-200": "#c0eabc",
    "ref-green-300": "#a6e3a1",  // Mocha Green
    "ref-green-400": "#73c96b",
    "ref-green-500": "#52b448",
    "ref-green-600": "#40a02b",  // Latte Green
    "ref-green-700": "#358524",
    "ref-green-800": "#2d6a20",
    "ref-green-900": "#27571e",
    "ref-green-950": "#133010",

    // ===== LIME (same as Green — Catppuccin Green) =====
    "ref-lime-50": "#f1faf0",
    "ref-lime-100": "#dff5dd",
    "ref-lime-200": "#c0eabc",
    "ref-lime-300": "#a6e3a1",
    "ref-lime-400": "#73c96b",
    "ref-lime-500": "#52b448",
    "ref-lime-600": "#40a02b",
    "ref-lime-700": "#358524",
    "ref-lime-800": "#2d6a20",
    "ref-lime-900": "#27571e",
    "ref-lime-950": "#133010",

    // ===== EMERALD (Catppuccin Teal/Green blend) =====
    "ref-emerald-50": "#edfcf7",
    "ref-emerald-100": "#d5f7eb",
    "ref-emerald-200": "#aeedd8",
    "ref-emerald-300": "#94e2d5",  // Mocha Teal
    "ref-emerald-400": "#5ac7b4",
    "ref-emerald-500": "#2fae9a",
    "ref-emerald-600": "#179299",  // Latte Teal
    "ref-emerald-700": "#12777b",
    "ref-emerald-800": "#105f64",
    "ref-emerald-900": "#0f4e52",
    "ref-emerald-950": "#072c2f",

    // ===== TEAL (Catppuccin Teal: Mocha #94e2d5, Latte #179299) =====
    "ref-teal-50": "#eefcfa",
    "ref-teal-100": "#d5f7f2",
    "ref-teal-200": "#b0ede5",
    "ref-teal-300": "#94e2d5",  // Mocha Teal
    "ref-teal-400": "#56c9b9",
    "ref-teal-500": "#2bada0",
    "ref-teal-600": "#179299",  // Latte Teal
    "ref-teal-700": "#12777b",
    "ref-teal-800": "#105f64",
    "ref-teal-900": "#0f4e52",
    "ref-teal-950": "#072c2f",

    // ===== CYAN (Catppuccin Teal: Mocha #94e2d5, Latte #179299) =====
    "ref-cyan-50": "#eefcfa",
    "ref-cyan-100": "#d5f7f2",
    "ref-cyan-200": "#b0ede5",
    "ref-cyan-300": "#94e2d5",
    "ref-cyan-400": "#56c9b9",
    "ref-cyan-500": "#2bada0",
    "ref-cyan-600": "#179299",
    "ref-cyan-700": "#12777b",
    "ref-cyan-800": "#105f64",
    "ref-cyan-900": "#0f4e52",
    "ref-cyan-950": "#072c2f",

    // ===== SKY (Catppuccin Sky/Sapphire: Mocha #89dceb / #74c7ec, Latte #04a5e5 / #209fb5) =====
    "ref-sky-50": "#eefaff",
    "ref-sky-100": "#d5f3fe",
    "ref-sky-200": "#b0e8fb",
    "ref-sky-300": "#89dceb",  // Mocha Sky
    "ref-sky-400": "#4ec5e0",
    "ref-sky-500": "#1fb0d2",
    "ref-sky-600": "#04a5e5",  // Latte Sky
    "ref-sky-700": "#0487ba",
    "ref-sky-800": "#086d97",
    "ref-sky-900": "#0b597b",
    "ref-sky-950": "#063352",

    // ===== BLUE (Catppuccin Blue/Sapphire: Mocha #89b4fa, Latte #1e66f5) =====
    "ref-blue-50": "#f0f4ff",
    "ref-blue-100": "#dde7fe",
    "ref-blue-200": "#bbcffd",
    "ref-blue-300": "#9ab9fb",
    "ref-blue-400": "#89b4fa",  // Mocha Blue
    "ref-blue-500": "#548df7",
    "ref-blue-600": "#1e66f5",  // Latte Blue
    "ref-blue-700": "#1a55ce",
    "ref-blue-800": "#1845a8",
    "ref-blue-900": "#173a89",
    "ref-blue-950": "#0e2254",

    // ===== INDIGO (Catppuccin Lavender: Mocha #b4befe, Latte #7287fd) =====
    "ref-indigo-50": "#f2f3ff",
    "ref-indigo-100": "#e4e7fe",
    "ref-indigo-200": "#c9cffd",
    "ref-indigo-300": "#b4befe",  // Mocha Lavender
    "ref-indigo-400": "#93a0fd",
    "ref-indigo-500": "#7e8ffd",
    "ref-indigo-600": "#7287fd",  // Latte Lavender
    "ref-indigo-700": "#5c6dd4",
    "ref-indigo-800": "#4c5aad",
    "ref-indigo-900": "#404b8e",
    "ref-indigo-950": "#262c54",

    // ===== VIOLET (Catppuccin Mauve: Mocha #cba6f7, Latte #8839ef) =====
    "ref-violet-50": "#faf5ff",
    "ref-violet-100": "#f3e8fe",
    "ref-violet-200": "#e5cffd",
    "ref-violet-300": "#d5b5fb",
    "ref-violet-400": "#cba6f7",  // Mocha Mauve
    "ref-violet-500": "#a96ef3",
    "ref-violet-600": "#8839ef",  // Latte Mauve
    "ref-violet-700": "#7430c9",
    "ref-violet-800": "#6028a5",
    "ref-violet-900": "#502287",
    "ref-violet-950": "#310f5a",

    // ===== PURPLE (same as Violet — Catppuccin Mauve) =====
    "ref-purple-50": "#faf5ff",
    "ref-purple-100": "#f3e8fe",
    "ref-purple-200": "#e5cffd",
    "ref-purple-300": "#d5b5fb",
    "ref-purple-400": "#cba6f7",
    "ref-purple-500": "#a96ef3",
    "ref-purple-600": "#8839ef",
    "ref-purple-700": "#7430c9",
    "ref-purple-800": "#6028a5",
    "ref-purple-900": "#502287",
    "ref-purple-950": "#310f5a",

    // ===== FUCHSIA (same as Violet — Catppuccin Mauve) =====
    "ref-fuchsia-50": "#faf5ff",
    "ref-fuchsia-100": "#f3e8fe",
    "ref-fuchsia-200": "#e5cffd",
    "ref-fuchsia-300": "#d5b5fb",
    "ref-fuchsia-400": "#cba6f7",
    "ref-fuchsia-500": "#a96ef3",
    "ref-fuchsia-600": "#8839ef",
    "ref-fuchsia-700": "#7430c9",
    "ref-fuchsia-800": "#6028a5",
    "ref-fuchsia-900": "#502287",
    "ref-fuchsia-950": "#310f5a",

    // ===== PINK (Catppuccin Pink/Flamingo: Mocha #f5c2e7 / #f2cdcd, Latte #ea76cb / #dd7878) =====
    "ref-pink-50": "#fef4fa",
    "ref-pink-100": "#fde8f4",
    "ref-pink-200": "#f9d0e8",
    "ref-pink-300": "#f5c2e7",  // Mocha Pink
    "ref-pink-400": "#f09dd6",
    "ref-pink-500": "#ea76cb",  // Latte Pink
    "ref-pink-600": "#d35ab4",
    "ref-pink-700": "#b04796",
    "ref-pink-800": "#923c7c",
    "ref-pink-900": "#793467",
    "ref-pink-950": "#441b3a",
  },
  modes: {
    light: {
      // Surface tokens — Latte background
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

      // Primary — Mauve (Catppuccin's signature accent)
      "sys-primary": "ref-violet-600",
      "sys-primary-hover": "ref-violet-700",
      "sys-primary-active": "ref-violet-800",
      "sys-primary-container": "ref-violet-100",
      "sys-on-primary": "ref-slate-50",
      "sys-on-primary-container": "ref-violet-950",

      // Secondary — Blue
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
      "sys-focus": "ref-violet-500",
      "sys-disabled": "ref-slate-200",
      "sys-on-disabled": "ref-slate-400",

      // Special
      "sys-scrim": "ref-slate-950",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-white",

      // Shiki — Latte syntax colours
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
      // Surface tokens — Mocha background
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

      // Primary — Mauve (Catppuccin's signature accent)
      "sys-primary": "ref-violet-400",
      "sys-primary-hover": "ref-violet-300",
      "sys-primary-active": "ref-violet-200",
      "sys-primary-container": "ref-violet-900",
      "sys-on-primary": "ref-slate-950",
      "sys-on-primary-container": "ref-violet-100",

      // Secondary — Blue
      "sys-secondary": "ref-blue-400",
      "sys-secondary-hover": "ref-blue-300",
      "sys-secondary-active": "ref-blue-200",
      "sys-secondary-container": "ref-blue-900",
      "sys-on-secondary": "ref-slate-950",
      "sys-on-secondary-container": "ref-blue-100",

      // Semantic
      "sys-success": "ref-green-300",
      "sys-success-hover": "ref-green-200",
      "sys-success-active": "ref-green-100",
      "sys-success-container": "ref-green-900",
      "sys-on-success": "ref-slate-950",
      "sys-on-success-container": "ref-green-100",

      "sys-warning": "ref-yellow-300",
      "sys-warning-hover": "ref-yellow-200",
      "sys-warning-active": "ref-yellow-100",
      "sys-warning-container": "ref-yellow-900",
      "sys-on-warning": "ref-slate-950",
      "sys-on-warning-container": "ref-yellow-100",

      "sys-error": "ref-red-400",
      "sys-error-hover": "ref-red-300",
      "sys-error-active": "ref-red-200",
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
      "sys-focus": "ref-violet-400",
      "sys-disabled": "ref-slate-700",
      "sys-on-disabled": "ref-slate-500",

      // Special
      "sys-scrim": "ref-slate-200",
      "sys-shadow": "ref-slate-950",
      "sys-void": "ref-black",

      // Shiki — Mocha syntax colours
      "shiki-text": "ref-slate-200",
      "shiki-comment": "ref-slate-500",
      "shiki-keyword": "ref-violet-400",
      "shiki-number": "ref-orange-400",
      "shiki-string": "ref-green-300",
      "shiki-function": "ref-blue-400",
      "shiki-type": "ref-cyan-300",
      "shiki-parameter": "ref-red-400",
      "shiki-variable": "ref-red-300",
      "shiki-error": "ref-red-400",
      "shiki-regex": "ref-orange-400",
      "shiki-regex-constant": "ref-violet-400",
      "shiki-tag": "ref-red-400",
      "shiki-punctuation": "ref-slate-400",
      "shiki-operator": "ref-violet-400",
      "shiki-label": "ref-slate-300",
      "shiki-header": "ref-blue-300",
      "shiki-list-marker": "ref-blue-400",
      "shiki-builtin": "ref-cyan-300",
      "shiki-property": "ref-orange-400",
      "shiki-placeholder": "ref-cyan-300",
    },
  },
});
