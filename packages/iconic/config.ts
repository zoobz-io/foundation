import icIcons from "@iconify-json/ic/icons.json";
import circleFlagsIcons from "@iconify-json/circle-flags/icons.json";

export type CircleFlagIcon = `circle-flags:${keyof typeof circleFlagsIcons.icons}`;
export type ICIcon = `ic:${Extract<keyof typeof icIcons.icons, `twotone-${string}`>}`;

export type IconicConfig = {
  [key: string]: ICIcon | CircleFlagIcon;
};

export const defineIcons = (config: IconicConfig) => config;
