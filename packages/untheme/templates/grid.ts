import type reference from "../reference";
import type modes from "../modes";

type RefToken = keyof typeof reference | keyof typeof modes.light;

/**
 * Grid container tokens
 */
export default {
  "grid-template-columns": "ref-ignore",
  "grid-template-rows": "ref-ignore",
  "align-items": "ref-ignore",
  "justify-content": "ref-ignore",
} satisfies Record<string, RefToken>;
