import type reference from "../reference";
import type modes from "../modes";
import type templates from "./index";

export type RefToken = keyof typeof reference | keyof typeof modes.light;

export type Template = typeof templates;
export type Name = Exclude<keyof Template, "base">;

export type TokenSet<T> = {
  [K in keyof T]: RefToken;
};

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export type NamedTemplate<T extends readonly Name[]> = TokenSet<
  UnionToIntersection<Template[T[number]]>
>;
