import { definePreset } from "unocss";
import roles from "./roles";

// CSS property name mappings (token name -> CSS property)
const propertyMap: Record<string, string> = {
  text: "color",
  "gap-row": "row-gap",
  "gap-column": "column-gap",
  "transition-easing": "transition-timing-function",
};

const getCSSProperty = (tokenProp: string): string => {
  return propertyMap[tokenProp] || tokenProp;
};

const getRoleFeatures = (role: string) => {
  const roleTokens = roles[role as keyof typeof roles];
  const tokenKeys = Object.keys(roleTokens);

  return {
    hasInteractive: tokenKeys.some(
      (k) =>
        k.endsWith("-hover") || k.endsWith("-active") || k.endsWith("-focus"),
    ),
    hasDisabled: tokenKeys.some((k) => k.endsWith("-disabled")),
    hasSelected: tokenKeys.some((k) => k.endsWith("-selected")),
    hasAnimated:
      tokenKeys.includes("transition-duration") ||
      tokenKeys.includes("transition-easing"),
  };
};

const generateBaseCSS = (role: string) => {
  const roleTokens = roles[role as keyof typeof roles];
  const features = getRoleFeatures(role);
  const css: Record<string, string> = {};

  for (const prop of Object.keys(roleTokens)) {
    if (
      prop.endsWith("-hover") ||
      prop.endsWith("-active") ||
      prop.endsWith("-focus") ||
      prop.endsWith("-disabled") ||
      prop.endsWith("-selected") ||
      prop.includes("-selected-")
    ) {
      continue;
    }

    const cssProp = getCSSProperty(prop);
    css[cssProp] = `var(--${role}-${prop})`;
  }

  if (features.hasAnimated) {
    css["transition-property"] =
      "background, color, border-color, box-shadow, opacity";
  }

  css["will-change"] = "background-color, color";

  return css;
};

const generateStateCSS = (role: string, suffix: string) => {
  const roleTokens = roles[role as keyof typeof roles];
  const css: Record<string, string> = {};

  for (const prop of Object.keys(roleTokens)) {
    if (prop.endsWith(suffix)) {
      // Skip compound states (e.g., don't process "box-shadow-selected-hover" when generating simple ":hover")
      const baseProp = prop.slice(0, -suffix.length);
      if (baseProp.endsWith("-selected") || baseProp.endsWith("-disabled")) {
        continue;
      }

      const cssProp = getCSSProperty(baseProp);
      css[cssProp] = `var(--${role}-${prop})`;
    }
  }

  return Object.keys(css).length > 0 ? css : undefined;
};

const buildCSS = (blocks: Array<{ selector: string; props: Record<string, string> }>) => {
  return blocks
    .map(({ selector, props }) => {
      const declarations = Object.entries(props)
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join("\n");
      return `${selector} {\n${declarations}\n}`;
    })
    .join("\n");
};

export default definePreset(() => {
  return {
    name: "untheme",
    preflights: [
      {
        getCSS: () => `
          * {
            margin: 0;
            padding: 0;
            border: 0;
            font: inherit;
            vertical-align: baseline;
            box-sizing: border-box;
          }
        `,
      },
    ],
    rules: [
      [
        /^f-([a-z0-9-]+)$/,
        ([, role]: [string, string]) => {
          if (!(role in roles)) return;

          const features = getRoleFeatures(role);
          const baseCSS = generateBaseCSS(role);

          if (
            !features.hasInteractive &&
            !features.hasDisabled &&
            !features.hasSelected
          ) {
            return baseCSS;
          }

          const states = [
            features.hasDisabled && { suffix: "-disabled", pseudo: ":disabled, [aria-disabled='true']" },
            features.hasSelected && { suffix: "-selected", pseudo: "[aria-selected='true']" },
            features.hasSelected && { suffix: "-selected-hover", pseudo: "[aria-selected='true']:hover" },
            features.hasSelected && { suffix: "-selected-active", pseudo: "[aria-selected='true']:active" },
            features.hasSelected && { suffix: "-selected-focus", pseudo: "[aria-selected='true']:focus-visible" },
            features.hasInteractive && { suffix: "-hover", pseudo: ":hover" },
            features.hasInteractive && { suffix: "-active", pseudo: ":active" },
            features.hasInteractive && { suffix: "-focus", pseudo: ":focus-visible" },
          ].filter(Boolean) as Array<{ suffix: string; pseudo: string }>;

          const cssBlocks = states
            .map(({ suffix, pseudo }) => ({
              selector: `.f-${role}${pseudo}`,
              props: generateStateCSS(role, suffix),
            }))
            .filter(({ props }) => props && Object.keys(props).length > 0) as Array<{
              selector: string;
              props: Record<string, string>;
            }>;

          return buildCSS([{ selector: `.f-${role}`, props: baseCSS }, ...cssBlocks]);
        },
      ],
    ],
  };
});
