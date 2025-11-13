import type reference from "../reference";
import type modes from "../modes";

type RefToken = keyof typeof reference | keyof typeof modes.light;

/**
 * Disabled state tokens
 */
export default {
  "background-disabled": "ref-ignore",
  "text-disabled": "ref-ignore",
  "border-color-disabled": "ref-ignore",
  "font-weight-disabled": "ref-ignore",
  "cursor-disabled": "ref-ignore",
  "opacity-disabled": "ref-ignore",
} satisfies Record<string, RefToken>;
