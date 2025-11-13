import type { PropertyTokenMap } from "./reference/schema";

import theme from "./theme";

// Flatten all role tokens into a single Record type
type FlattenRoleTokens<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    [SK in keyof T[K] as `${K & string}-${SK & string}`]: RefToken | ModeToken;
  };
}[keyof T];

// Utility to convert union to intersection
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type Theme = typeof theme;
type Role = Theme["roles"];

type Template = {
  reference: {
    [key: string]: string;
  };
  modes: {
    light: {
      [key: string]: string;
    };
    dark: {
      [key: string]: string;
    };
  };
  roles: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

type RefTokens<T extends Template> = keyof T["reference"];
type ModeTokens<T extends Template> = keyof T["modes"]["light"]; // light/dark are congruent
type RoleTokens<T extends Template> = keyof UnionToIntersection<
  FlattenRoleTokens<T["roles"]>
>;

export type RefToken = RefTokens<Theme>;
export type ModeToken = ModeTokens<Theme>;
export type RoleToken = RoleTokens<Theme>;

type ValidTokenFor<K> = K extends keyof PropertyTokenMap
  ? PropertyTokenMap[K]
  : RefToken | ModeToken;

export type Token = RefToken | ModeToken | RoleToken;

export type Tokens<T extends keyof Theme["roles"]> = {
  [K in T]?: Partial<Theme["roles"][K]>;
};

export type Untheme = {
  reference: {
    [T in RefToken]: string;
  };
  modes: {
    light: {
      [T in ModeToken]: RefToken;
    };
    dark: {
      [T in ModeToken]: RefToken;
    };
  };
  roles: {
    [T in keyof Role]: {
      [K in keyof Role[T]]: ValidTokenFor<K>;
    };
  };
};

export type UnthemeConfig = {
  reference?: {
    [T in RefToken]?: string;
  };
  modes?: {
    light?: {
      [T in ModeToken]?: RefToken;
    };
    dark?: {
      [T in ModeToken]?: RefToken;
    };
  };
  roles?: {
    [T in keyof Role]?: {
      [K in keyof Role[T]]?: ValidTokenFor<K>;
    };
  };
};

export const defineUntheme = (config: UnthemeConfig) => config;
