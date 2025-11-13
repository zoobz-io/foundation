import type base from "./base";
import type colors from "./color";
import type spacing from "./spacing";
import type typography from "./typography";
import type radius from "./radius";
import type shadow from "./shadow";
import type animation from "./animation";
import type border from "./border";
import type cursor from "./cursor";
import type sizing from "./sizing";
import type opacity from "./opacity";
import type outline from "./outline";
import type display from "./display";
import type flexbox from "./flexbox";
import type grid from "./grid";
import type layout from "./layout";
import type interaction from "./interaction";

/**
 * Semantic token categories extracted from reference token files.
 * These provide type-safe constraints for role token properties.
 */

export type BaseToken = keyof typeof base;
export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type TypographyToken = keyof typeof typography;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadow;
export type AnimationToken = keyof typeof animation;
export type BorderToken = keyof typeof border;
export type CursorToken = keyof typeof cursor;
export type SizingToken = keyof typeof sizing;
export type OpacityToken = keyof typeof opacity;
export type OutlineToken = keyof typeof outline;
export type DisplayToken = keyof typeof display;
export type FlexboxToken = keyof typeof flexbox;
export type GridToken = keyof typeof grid;
export type LayoutToken = keyof typeof layout;
export type InteractionToken = keyof typeof interaction;
