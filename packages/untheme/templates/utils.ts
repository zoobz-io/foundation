import defu from "defu";
import templates from "./index";
import type { TokenSet, Name, NamedTemplate } from "./types";

/**
 * Creates base tokens with selected templates and optional overrides.
 * Base group is always included.
 */
export function createBaseTokens<T extends readonly Name[]>(...extend: T) {
  return defu(templates.base, ...extend.map((group) => templates[group])) as TokenSet<
    typeof templates.base & NamedTemplate<T>
  >;
}
