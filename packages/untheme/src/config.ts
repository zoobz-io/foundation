import type { UserTheme, Theme } from "./types";
import reference from "./tokens/reference";
import modes from "./tokens/modes";
import defu from "defu";

export type { RefToken, ModeToken, UserTheme, Theme, ThemeManifestEntry, ThemeManifest, ThemeRegistry } from "./types";

export const defineTheme = (theme: UserTheme): Theme =>
  defu(theme, { label: "", reference, modes }) as Theme;

export const isTheme = (value: unknown): value is Theme =>
  typeof value === "object" && value !== null && "reference" in value && "modes" in value;
