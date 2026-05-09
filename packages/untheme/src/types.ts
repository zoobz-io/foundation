import type reference from "./tokens/reference";
import type modes from "./tokens/modes";

export type RefToken = keyof typeof reference;
export type ModeToken = keyof typeof modes.light;

export type UserTheme = {
  label?: string;
  reference?: {
    [R in keyof typeof reference]?: string;
  };
  modes?: {
    light?: {
      [M in ModeToken]?: RefToken;
    };
    dark?: {
      [M in ModeToken]?: RefToken;
    };
  };
};

export type Theme = {
  label: string;
  reference: {
    [R in keyof typeof reference]: string;
  };
  modes: {
    light: {
      [M in ModeToken]: RefToken;
    };
    dark: {
      [M in ModeToken]: RefToken;
    };
  };
};

export type ThemeManifestEntry = { key: string; label: string };
export type ThemeManifest = ThemeManifestEntry[];

export type ThemeRegistry = Record<string, Theme>;
