import type reference from "../reference";
import type modes from "../modes";

type RefToken = keyof typeof reference | keyof typeof modes.light;

/**
 * Transform tokens
 */
export default {
  transform: "ref-ignore",
  "transform-origin": "ref-ignore",
} satisfies Record<string, RefToken>;
