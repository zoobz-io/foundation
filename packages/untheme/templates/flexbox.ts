import type reference from "../reference";
import type modes from "../modes";

type RefToken = keyof typeof reference | keyof typeof modes.light;

/**
 * Flex container tokens
 */
export default {
  "flex-direction": "ref-ignore",
  "align-items": "ref-ignore",
  "justify-content": "ref-ignore",
} satisfies Record<string, RefToken>;
