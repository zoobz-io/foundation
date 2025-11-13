import type reference from "../reference";
import type modes from "../modes";

type RefToken = keyof typeof reference | keyof typeof modes.light;

/**
 * Overflow tokens
 */
export default {
  "overflow-x": "ref-ignore",
  "overflow-y": "ref-ignore",
} satisfies Record<string, RefToken>;
