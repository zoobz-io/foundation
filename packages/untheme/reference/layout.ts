/**
 * Universal layout primitives for building any interface at any scale.
 *
 * These layout patterns are composition-agnostic and can be applied to:
 * - Button internals (icon + text + badge)
 * - Card layouts (header + content + footer)
 * - Page layouts (sidebar + main + aside)
 * - Application shells (nav + content + tools)
 *
 * Use with appropriate display tokens (flex/grid) to create layouts.
 */
export default {
  // === FLEXBOX DIRECTION LAYOUTS ===
  // Vertical stacking (column)
  "ref-layout-stack": "column",
  "ref-layout-stack-reverse": "column-reverse",

  // Horizontal arrangement (row)
  "ref-layout-row": "row",
  "ref-layout-row-reverse": "row-reverse",

  // === FLEXBOX WRAPPING LAYOUTS ===
  // Items wrap to new lines as needed
  "ref-layout-cluster": "wrap",
  "ref-layout-nowrap": "nowrap",

  // === GRID COLUMN LAYOUTS ===
  // Fixed column grids
  "ref-layout-grid-2": "repeat(2, 1fr)",
  "ref-layout-grid-3": "repeat(3, 1fr)",
  "ref-layout-grid-4": "repeat(4, 1fr)",
  "ref-layout-grid-5": "repeat(5, 1fr)",
  "ref-layout-grid-6": "repeat(6, 1fr)",

  // Auto-responsive grids (auto-fit/auto-fill)
  "ref-layout-auto-fit-xs": "repeat(auto-fit, minmax(150px, 1fr))",
  "ref-layout-auto-fit-sm": "repeat(auto-fit, minmax(200px, 1fr))",
  "ref-layout-auto-fit-md": "repeat(auto-fit, minmax(250px, 1fr))",
  "ref-layout-auto-fit-lg": "repeat(auto-fit, minmax(300px, 1fr))",
  "ref-layout-auto-fit-xl": "repeat(auto-fit, minmax(400px, 1fr))",

  "ref-layout-auto-fill-xs": "repeat(auto-fill, minmax(150px, 1fr))",
  "ref-layout-auto-fill-sm": "repeat(auto-fill, minmax(200px, 1fr))",
  "ref-layout-auto-fill-md": "repeat(auto-fill, minmax(250px, 1fr))",
  "ref-layout-auto-fill-lg": "repeat(auto-fill, minmax(300px, 1fr))",
  "ref-layout-auto-fill-xl": "repeat(auto-fill, minmax(400px, 1fr))",

  // === ASYMMETRIC LAYOUTS ===
  // Sidebar patterns (narrow + wide)
  "ref-layout-sidebar-left": "auto 1fr", // Narrow left, flexible right
  "ref-layout-sidebar-right": "1fr auto", // Flexible left, narrow right
  "ref-layout-sidebar-both": "auto 1fr auto", // Narrow sides, flexible center

  // Content-focused patterns
  "ref-layout-trifold": "1fr auto 1fr", // Edges flex, center fixed
  "ref-layout-split": "1fr 1fr", // Equal halves
  "ref-layout-golden": "1.618fr 1fr", // Golden ratio split

  // App shell patterns
  "ref-layout-holy-grail": "auto 1fr auto / auto 1fr auto", // 3x3 grid shell
  "ref-layout-header-main-footer": "auto 1fr auto", // Vertical app layout
  "ref-layout-nav-content": "auto 1fr", // Horizontal app layout

  // === SPECIAL PATTERNS ===
  // Pancake stack (full-bleed header/footer, constrained content)
  "ref-layout-pancake": "1fr / auto 1fr auto",

  // RAM (Repeat, Auto, Minmax) pattern
  "ref-layout-ram": "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",

  // Masonry-style (dense packing)
  "ref-layout-dense": "repeat(auto-fill, minmax(200px, 1fr))",

  // 12-column system (traditional grid framework)
  "ref-layout-12col": "repeat(12, 1fr)",
};
