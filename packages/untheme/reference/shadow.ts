// Shadow elevation tokens
export default {
  "ref-shadow-none": "none",
  "ref-shadow-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "ref-shadow-md":
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "ref-shadow-lg":
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "ref-shadow-xl":
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "ref-shadow-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",

  // Focus ring shadows
  "ref-shadow-focus-inset": "inset 0 0 0 2px var(--sys-primary)",
  "ref-shadow-focus-outset": "0 0 0",

  // Directional border shadows (inset box-shadow for borders without layout shift)
  "ref-shadow-border-top": "inset 0 2px 0 0 var(--sys-primary)",
  "ref-shadow-border-right": "inset calc(-1 * 2px) 0 0 0 var(--sys-primary)",
  "ref-shadow-border-bottom": "inset 0 calc(-1 * 2px) 0 0 var(--sys-primary)",
  "ref-shadow-border-left": "inset 2px 0 0 0 var(--sys-primary)",

  // Combined border + focus ring shadows
  "ref-shadow-border-left-focus":
    "inset 2px 0 0 0 var(--sys-primary), inset 0 0 0 2px var(--sys-primary)",
  "ref-shadow-border-bottom-focus":
    "inset 0 calc(-1 * 2px) 0 0 var(--sys-primary), inset 0 0 0 2px var(--sys-primary)",
};
