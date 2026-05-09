import { defineTheme } from "../src/config";

/**
 * Gruvbox Theme
 * Retro groove color scheme with warm, earthy tones
 * Original by @morhetz: https://github.com/morhetz/gruvbox
 */
export default defineTheme({
  label: "Gruvbox",
  reference: {
    // ===== NEUTRALS (Warm gray/brown) =====
    // Using Gruvbox's light/dark background progression
    "ref-neutral-50": "#f9f5d7", // light0_hard
    "ref-neutral-100": "#fbf1c7", // light0
    "ref-neutral-200": "#ebdbb2", // light1
    "ref-neutral-300": "#d5c4a1", // light2
    "ref-neutral-400": "#bdae93", // light3
    "ref-neutral-500": "#a89984", // light4 / gray midpoint
    "ref-neutral-600": "#7c6f64", // dark4
    "ref-neutral-700": "#665c54", // dark3
    "ref-neutral-800": "#504945", // dark2
    "ref-neutral-900": "#3c3836", // dark1
    "ref-neutral-950": "#282828", // dark0

    // Using neutral as the primary gray (same as above)
    "ref-gray-50": "#f9f5d7",
    "ref-gray-100": "#fbf1c7",
    "ref-gray-200": "#ebdbb2",
    "ref-gray-300": "#d5c4a1",
    "ref-gray-400": "#bdae93",
    "ref-gray-500": "#928374", // gray_245 - true gray
    "ref-gray-600": "#7c6f64",
    "ref-gray-700": "#665c54",
    "ref-gray-800": "#504945",
    "ref-gray-900": "#3c3836",
    "ref-gray-950": "#282828",

    // Slate - cooler variant
    "ref-slate-50": "#f9f5d7",
    "ref-slate-100": "#fbf1c7",
    "ref-slate-200": "#ebdbb2",
    "ref-slate-300": "#d5c4a1",
    "ref-slate-400": "#bdae93",
    "ref-slate-500": "#a89984",
    "ref-slate-600": "#7c6f64",
    "ref-slate-700": "#665c54",
    "ref-slate-800": "#504945",
    "ref-slate-900": "#3c3836",
    "ref-slate-950": "#282828",

    // ===== RED =====
    "ref-red-50": "#fdf2f2", // very light (generated)
    "ref-red-100": "#fce8e8", // light (generated)
    "ref-red-200": "#fbd5d5", // lighter (generated)
    "ref-red-300": "#f5a8a8", // light red (generated)
    "ref-red-400": "#ea6b6b", // medium-light (generated)
    "ref-red-500": "#fb4934", // bright_red (vibrant)
    "ref-red-600": "#cc241d", // neutral_red (muted)
    "ref-red-700": "#9d0006", // faded_red (dim)
    "ref-red-800": "#7f1d1d", // dark (generated)
    "ref-red-900": "#5f0000", // darker (generated)
    "ref-red-950": "#3f0000", // darkest (generated)

    // ===== ORANGE =====
    "ref-orange-50": "#fff7ed", // very light (generated)
    "ref-orange-100": "#ffedd5", // light (generated)
    "ref-orange-200": "#fed7aa", // lighter (generated)
    "ref-orange-300": "#fdba74", // light orange (generated)
    "ref-orange-400": "#fb923c", // medium-light (generated)
    "ref-orange-500": "#fe8019", // bright_orange (vibrant)
    "ref-orange-600": "#d65d0e", // neutral_orange (muted)
    "ref-orange-700": "#af3a03", // faded_orange (dim)
    "ref-orange-800": "#8a2f03", // dark (generated)
    "ref-orange-900": "#651f00", // darker (generated)
    "ref-orange-950": "#451407", // darkest (generated)

    // ===== YELLOW =====
    "ref-yellow-50": "#fefce8", // very light (generated)
    "ref-yellow-100": "#fef9c3", // light (generated)
    "ref-yellow-200": "#fef08a", // lighter (generated)
    "ref-yellow-300": "#fde047", // light yellow (generated)
    "ref-yellow-400": "#fad24e", // medium-light (generated)
    "ref-yellow-500": "#fabd2f", // bright_yellow (vibrant)
    "ref-yellow-600": "#d79921", // neutral_yellow (muted)
    "ref-yellow-700": "#b57614", // faded_yellow (dim)
    "ref-yellow-800": "#8f5e0f", // dark (generated)
    "ref-yellow-900": "#6a4407", // darker (generated)
    "ref-yellow-950": "#422006", // darkest (generated)

    // ===== GREEN =====
    "ref-green-50": "#f7fee7", // very light (generated)
    "ref-green-100": "#ecfccb", // light (generated)
    "ref-green-200": "#d9f99d", // lighter (generated)
    "ref-green-300": "#bef264", // light green (generated)
    "ref-green-400": "#b8e664", // medium-light (generated)
    "ref-green-500": "#b8bb26", // bright_green (vibrant)
    "ref-green-600": "#98971a", // neutral_green (muted)
    "ref-green-700": "#79740e", // faded_green (dim)
    "ref-green-800": "#5f5c0a", // dark (generated)
    "ref-green-900": "#454308", // darker (generated)
    "ref-green-950": "#1a2e05", // darkest (generated)

    // ===== EMERALD/AQUA =====
    "ref-emerald-50": "#f0fdf4", // very light (generated)
    "ref-emerald-100": "#dcfce7", // light (generated)
    "ref-emerald-200": "#bbf7d0", // lighter (generated)
    "ref-emerald-300": "#86efac", // light aqua (generated)
    "ref-emerald-400": "#5dd3a0", // medium-light (generated)
    "ref-emerald-500": "#8ec07c", // bright_aqua (vibrant)
    "ref-emerald-600": "#689d6a", // neutral_aqua (muted)
    "ref-emerald-700": "#427b58", // faded_aqua (dim)
    "ref-emerald-800": "#2f5a40", // dark (generated)
    "ref-emerald-900": "#1e3d2b", // darker (generated)
    "ref-emerald-950": "#022c22", // darkest (generated)

    // ===== TEAL/CYAN (using aqua colors) =====
    "ref-teal-50": "#f0fdfa",
    "ref-teal-100": "#ccfbf1",
    "ref-teal-200": "#99f6e4",
    "ref-teal-300": "#5eead4",
    "ref-teal-400": "#2dd4bf",
    "ref-teal-500": "#8ec07c", // bright_aqua
    "ref-teal-600": "#689d6a", // neutral_aqua
    "ref-teal-700": "#427b58", // faded_aqua
    "ref-teal-800": "#2f5a40",
    "ref-teal-900": "#1e3d2b",
    "ref-teal-950": "#042f2e",

    "ref-cyan-50": "#ecfeff",
    "ref-cyan-100": "#cffafe",
    "ref-cyan-200": "#a5f3fc",
    "ref-cyan-300": "#67e8f9",
    "ref-cyan-400": "#22d3ee",
    "ref-cyan-500": "#8ec07c", // bright_aqua
    "ref-cyan-600": "#689d6a", // neutral_aqua
    "ref-cyan-700": "#427b58", // faded_aqua
    "ref-cyan-800": "#2f5a40",
    "ref-cyan-900": "#1e3d2b",
    "ref-cyan-950": "#083344",

    // ===== BLUE =====
    "ref-blue-50": "#eff6ff", // very light (generated)
    "ref-blue-100": "#dbeafe", // light (generated)
    "ref-blue-200": "#bfdbfe", // lighter (generated)
    "ref-blue-300": "#93c5fd", // light blue (generated)
    "ref-blue-400": "#60a5fa", // medium-light (generated)
    "ref-blue-500": "#83a598", // bright_blue (vibrant)
    "ref-blue-600": "#458588", // neutral_blue (muted)
    "ref-blue-700": "#076678", // faded_blue (dim)
    "ref-blue-800": "#065063", // dark (generated)
    "ref-blue-900": "#043a4a", // darker (generated)
    "ref-blue-950": "#082f49", // darkest (generated)

    // ===== INDIGO (using blue) =====
    "ref-indigo-50": "#eef2ff",
    "ref-indigo-100": "#e0e7ff",
    "ref-indigo-200": "#c7d2fe",
    "ref-indigo-300": "#a5b4fc",
    "ref-indigo-400": "#818cf8",
    "ref-indigo-500": "#83a598", // bright_blue
    "ref-indigo-600": "#458588", // neutral_blue
    "ref-indigo-700": "#076678", // faded_blue
    "ref-indigo-800": "#065063",
    "ref-indigo-900": "#043a4a",
    "ref-indigo-950": "#1e1b4b",

    // ===== VIOLET/PURPLE =====
    "ref-violet-50": "#f5f3ff", // very light (generated)
    "ref-violet-100": "#ede9fe", // light (generated)
    "ref-violet-200": "#ddd6fe", // lighter (generated)
    "ref-violet-300": "#c4b5fd", // light purple (generated)
    "ref-violet-400": "#a78bfa", // medium-light (generated)
    "ref-violet-500": "#d3869b", // bright_purple (vibrant)
    "ref-violet-600": "#b16286", // neutral_purple (muted)
    "ref-violet-700": "#8f3f71", // faded_purple (dim)
    "ref-violet-800": "#6d2f56", // dark (generated)
    "ref-violet-900": "#4c1f3a", // darker (generated)
    "ref-violet-950": "#2e1065", // darkest (generated)

    "ref-purple-50": "#faf5ff",
    "ref-purple-100": "#f3e8ff",
    "ref-purple-200": "#e9d5ff",
    "ref-purple-300": "#d8b4fe",
    "ref-purple-400": "#c084fc",
    "ref-purple-500": "#d3869b", // bright_purple
    "ref-purple-600": "#b16286", // neutral_purple
    "ref-purple-700": "#8f3f71", // faded_purple
    "ref-purple-800": "#6d2f56",
    "ref-purple-900": "#4c1f3a",
    "ref-purple-950": "#3b0764",

    // ===== PINK (using purple) =====
    "ref-pink-50": "#fdf2f8",
    "ref-pink-100": "#fce7f3",
    "ref-pink-200": "#fbcfe8",
    "ref-pink-300": "#f9a8d4",
    "ref-pink-400": "#f472b6",
    "ref-pink-500": "#d3869b", // bright_purple
    "ref-pink-600": "#b16286", // neutral_purple
    "ref-pink-700": "#8f3f71", // faded_purple
    "ref-pink-800": "#6d2f56",
    "ref-pink-900": "#4c1f3a",
    "ref-pink-950": "#500724",

    "ref-fuchsia-50": "#fdf4ff",
    "ref-fuchsia-100": "#fae8ff",
    "ref-fuchsia-200": "#f5d0fe",
    "ref-fuchsia-300": "#f0abfc",
    "ref-fuchsia-400": "#e879f9",
    "ref-fuchsia-500": "#d3869b", // bright_purple
    "ref-fuchsia-600": "#b16286", // neutral_purple
    "ref-fuchsia-700": "#8f3f71", // faded_purple
    "ref-fuchsia-800": "#6d2f56",
    "ref-fuchsia-900": "#4c1f3a",
    "ref-fuchsia-950": "#4a044e",

    // ===== ROSE (using red) =====
    "ref-rose-50": "#fff1f2",
    "ref-rose-100": "#ffe4e6",
    "ref-rose-200": "#fecdd3",
    "ref-rose-300": "#fda4af",
    "ref-rose-400": "#fb7185",
    "ref-rose-500": "#fb4934", // bright_red
    "ref-rose-600": "#cc241d", // neutral_red
    "ref-rose-700": "#9d0006", // faded_red
    "ref-rose-800": "#7f1d1d",
    "ref-rose-900": "#5f0000",
    "ref-rose-950": "#4c0519",

    // ===== AMBER (using yellow/orange blend) =====
    "ref-amber-50": "#fffbeb",
    "ref-amber-100": "#fef3c7",
    "ref-amber-200": "#fde68a",
    "ref-amber-300": "#fcd34d",
    "ref-amber-400": "#fbbf24",
    "ref-amber-500": "#fabd2f", // bright_yellow
    "ref-amber-600": "#d79921", // neutral_yellow
    "ref-amber-700": "#b57614", // faded_yellow
    "ref-amber-800": "#8f5e0f",
    "ref-amber-900": "#6a4407",
    "ref-amber-950": "#451a03",

    // ===== LIME (using green) =====
    "ref-lime-50": "#f7fee7",
    "ref-lime-100": "#ecfccb",
    "ref-lime-200": "#d9f99d",
    "ref-lime-300": "#bef264",
    "ref-lime-400": "#a3e635",
    "ref-lime-500": "#b8bb26", // bright_green
    "ref-lime-600": "#98971a", // neutral_green
    "ref-lime-700": "#79740e", // faded_green
    "ref-lime-800": "#5f5c0a",
    "ref-lime-900": "#454308",
    "ref-lime-950": "#1a2e05",

    // ===== SKY (using blue) =====
    "ref-sky-50": "#f0f9ff",
    "ref-sky-100": "#e0f2fe",
    "ref-sky-200": "#bae6fd",
    "ref-sky-300": "#7dd3fc",
    "ref-sky-400": "#38bdf8",
    "ref-sky-500": "#83a598", // bright_blue
    "ref-sky-600": "#458588", // neutral_blue
    "ref-sky-700": "#076678", // faded_blue
    "ref-sky-800": "#065063",
    "ref-sky-900": "#043a4a",
    "ref-sky-950": "#082f49",

    // ===== ZINC/STONE (using neutral) =====
    "ref-zinc-50": "#f9f5d7",
    "ref-zinc-100": "#fbf1c7",
    "ref-zinc-200": "#ebdbb2",
    "ref-zinc-300": "#d5c4a1",
    "ref-zinc-400": "#bdae93",
    "ref-zinc-500": "#a89984",
    "ref-zinc-600": "#7c6f64",
    "ref-zinc-700": "#665c54",
    "ref-zinc-800": "#504945",
    "ref-zinc-900": "#3c3836",
    "ref-zinc-950": "#282828",

    "ref-stone-50": "#f9f5d7",
    "ref-stone-100": "#fbf1c7",
    "ref-stone-200": "#ebdbb2",
    "ref-stone-300": "#d5c4a1",
    "ref-stone-400": "#bdae93",
    "ref-stone-500": "#a89984",
    "ref-stone-600": "#7c6f64",
    "ref-stone-700": "#665c54",
    "ref-stone-800": "#504945",
    "ref-stone-900": "#3c3836",
    "ref-stone-950": "#282828",
  },
  modes: {
    // ===== LIGHT MODE =====
    light: {
      // Surface tokens - use light warm backgrounds
      "sys-surface": "ref-neutral-100", // #fbf1c7 (light0)
      "sys-surface-dim": "ref-neutral-200", // #ebdbb2 (light1)
      "sys-surface-bright": "ref-neutral-50", // #f9f5d7 (light0_hard)
      "sys-surface-container": "ref-neutral-200",
      "sys-surface-container-low": "ref-neutral-100",
      "sys-surface-container-high": "ref-neutral-300",
      "sys-surface-variant": "ref-neutral-200",

      // Content tokens - use dark text
      "sys-on-surface": "ref-neutral-950", // #282828 (dark0)
      "sys-on-surface-variant": "ref-neutral-800", // #504945 (dark2)
      "sys-outline": "ref-neutral-400", // #bdae93 (light3)
      "sys-outline-variant": "ref-neutral-300", // #d5c4a1 (light2)

      // Primary - using orange (Gruvbox's warm signature accent)
      "sys-primary": "ref-orange-600", // #d65d0e (neutral_orange)
      "sys-primary-hover": "ref-orange-700", // #af3a03 (faded_orange)
      "sys-primary-active": "ref-orange-800",
      "sys-primary-container": "ref-orange-200",
      "sys-on-primary": "ref-neutral-50",
      "sys-on-primary-container": "ref-orange-950",

      // Secondary - using aqua (cool complement)
      "sys-secondary": "ref-emerald-600", // #689d6a (neutral_aqua)
      "sys-secondary-hover": "ref-emerald-700", // #427b58 (faded_aqua)
      "sys-secondary-active": "ref-emerald-800",
      "sys-secondary-container": "ref-emerald-200",
      "sys-on-secondary": "ref-neutral-50",
      "sys-on-secondary-container": "ref-emerald-950",

      // Success - using green
      "sys-success": "ref-green-600", // #98971a (neutral_green)
      "sys-success-hover": "ref-green-700", // #79740e (faded_green)
      "sys-success-active": "ref-green-800",
      "sys-success-container": "ref-green-200",
      "sys-on-success": "ref-neutral-50",
      "sys-on-success-container": "ref-green-950",

      // Warning - using yellow
      "sys-warning": "ref-yellow-600", // #d79921 (neutral_yellow)
      "sys-warning-hover": "ref-yellow-700", // #b57614 (faded_yellow)
      "sys-warning-active": "ref-yellow-800",
      "sys-warning-container": "ref-yellow-200",
      "sys-on-warning": "ref-neutral-950",
      "sys-on-warning-container": "ref-yellow-950",

      // Error - using red
      "sys-error": "ref-red-600", // #cc241d (neutral_red)
      "sys-error-hover": "ref-red-700", // #9d0006 (faded_red)
      "sys-error-active": "ref-red-800",
      "sys-error-container": "ref-red-200",
      "sys-on-error": "ref-neutral-50",
      "sys-on-error-container": "ref-red-950",

      // Info - using aqua/cyan
      "sys-info": "ref-emerald-600", // #689d6a (neutral_aqua)
      "sys-info-hover": "ref-emerald-700", // #427b58 (faded_aqua)
      "sys-info-active": "ref-emerald-800",
      "sys-info-container": "ref-emerald-200",
      "sys-on-info": "ref-neutral-50",
      "sys-on-info-container": "ref-emerald-950",

      // Interactive states
      "sys-hover": "ref-neutral-200", // #ebdbb2 (light1)
      "sys-pressed": "ref-neutral-300", // #d5c4a1 (light2)
      "sys-active": "ref-neutral-300",
      "sys-active-highlight": "ref-neutral-200",
      "sys-focus": "ref-orange-500", // #fe8019 (bright_orange)
      "sys-disabled": "ref-neutral-300",
      "sys-on-disabled": "ref-neutral-500", // #a89984 (gray)

      // Special
      "sys-scrim": "ref-neutral-950",
      "sys-shadow": "ref-neutral-950",

      // Shiki syntax highlighting (using neutral/faded variants)
      "shiki-text": "ref-neutral-950",
      "shiki-comment": "ref-green-600",
      "shiki-keyword": "ref-blue-600",
      "shiki-number": "ref-green-600",
      "shiki-string": "ref-orange-600",
      "shiki-function": "ref-yellow-600",
      "shiki-type": "ref-emerald-600",
      "shiki-parameter": "ref-blue-600",
      "shiki-variable": "ref-blue-600",
      "shiki-error": "ref-red-600",
      "shiki-regex": "ref-orange-600",
      "shiki-regex-constant": "ref-purple-600",
      "shiki-tag": "ref-yellow-700",
      "shiki-punctuation": "ref-neutral-600",
      "shiki-operator": "ref-purple-600",
      "shiki-label": "ref-neutral-700",
      "shiki-header": "ref-blue-500",
      "shiki-list-marker": "ref-blue-600",
    },

    // ===== DARK MODE =====
    dark: {
      // Surface tokens - use dark warm backgrounds
      "sys-surface": "ref-neutral-950", // #282828 (dark0)
      "sys-surface-dim": "ref-neutral-900", // #3c3836 (dark1)
      "sys-surface-bright": "ref-neutral-800", // #504945 (dark2)
      "sys-surface-container": "ref-neutral-900",
      "sys-surface-container-low": "ref-neutral-950",
      "sys-surface-container-high": "ref-neutral-800",
      "sys-surface-variant": "ref-neutral-900",

      // Content tokens - use light text
      "sys-on-surface": "ref-neutral-100", // #fbf1c7 (light0)
      "sys-on-surface-variant": "ref-neutral-300", // #d5c4a1 (light2)
      "sys-outline": "ref-neutral-700", // #665c54 (dark3)
      "sys-outline-variant": "ref-neutral-800", // #504945 (dark2)

      // Primary - using orange (Gruvbox's warm signature accent)
      "sys-primary": "ref-orange-500", // #fe8019 (bright_orange)
      "sys-primary-hover": "ref-orange-400",
      "sys-primary-active": "ref-orange-300",
      "sys-primary-container": "ref-orange-950",
      "sys-on-primary": "ref-orange-950",
      "sys-on-primary-container": "ref-orange-100",

      // Secondary - using aqua (cool complement)
      "sys-secondary": "ref-emerald-500", // #8ec07c (bright_aqua)
      "sys-secondary-hover": "ref-emerald-400",
      "sys-secondary-active": "ref-emerald-300",
      "sys-secondary-container": "ref-emerald-950",
      "sys-on-secondary": "ref-emerald-950",
      "sys-on-secondary-container": "ref-emerald-100",

      // Success - using green
      "sys-success": "ref-green-500", // #b8bb26 (bright_green)
      "sys-success-hover": "ref-green-400",
      "sys-success-active": "ref-green-300",
      "sys-success-container": "ref-green-950",
      "sys-on-success": "ref-green-950",
      "sys-on-success-container": "ref-green-100",

      // Warning - using yellow
      "sys-warning": "ref-yellow-500", // #fabd2f (bright_yellow)
      "sys-warning-hover": "ref-yellow-400",
      "sys-warning-active": "ref-yellow-300",
      "sys-warning-container": "ref-yellow-950",
      "sys-on-warning": "ref-yellow-950",
      "sys-on-warning-container": "ref-yellow-100",

      // Error - using red
      "sys-error": "ref-red-500", // #fb4934 (bright_red)
      "sys-error-hover": "ref-red-400",
      "sys-error-active": "ref-red-300",
      "sys-error-container": "ref-red-950",
      "sys-on-error": "ref-red-950",
      "sys-on-error-container": "ref-red-100",

      // Info - using aqua
      "sys-info": "ref-emerald-500", // #8ec07c (bright_aqua)
      "sys-info-hover": "ref-emerald-400",
      "sys-info-active": "ref-emerald-300",
      "sys-info-container": "ref-emerald-950",
      "sys-on-info": "ref-emerald-950",
      "sys-on-info-container": "ref-emerald-100",

      // Interactive states
      "sys-hover": "ref-neutral-800", // #504945 (dark2)
      "sys-pressed": "ref-neutral-700", // #665c54 (dark3)
      "sys-active": "ref-neutral-700",
      "sys-active-highlight": "ref-neutral-800",
      "sys-focus": "ref-orange-500", // #fe8019 (bright_orange)
      "sys-disabled": "ref-neutral-800",
      "sys-on-disabled": "ref-neutral-600", // #7c6f64 (dark4)

      // Special
      "sys-scrim": "ref-neutral-50",
      "sys-shadow": "ref-neutral-950",

      // Shiki syntax highlighting (using bright variants)
      "shiki-text": "ref-neutral-100",
      "shiki-comment": "ref-green-500",
      "shiki-keyword": "ref-blue-500",
      "shiki-number": "ref-green-500",
      "shiki-string": "ref-orange-500",
      "shiki-function": "ref-yellow-500",
      "shiki-type": "ref-emerald-500",
      "shiki-parameter": "ref-blue-400",
      "shiki-variable": "ref-blue-400",
      "shiki-error": "ref-red-500",
      "shiki-regex": "ref-orange-500",
      "shiki-regex-constant": "ref-purple-500",
      "shiki-tag": "ref-yellow-500",
      "shiki-punctuation": "ref-neutral-400",
      "shiki-operator": "ref-purple-500",
      "shiki-label": "ref-neutral-300",
      "shiki-header": "ref-blue-400",
      "shiki-list-marker": "ref-blue-500",
    },
  },
});
