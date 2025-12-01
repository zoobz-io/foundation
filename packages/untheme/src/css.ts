/**
 * CSS generation utilities for element tokens
 */

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

// State suffixes that indicate animatable properties
const stateSuffixes = ["-hover", "-active", "-focus"] as const;

/**
 * Extract transition properties from tokens that have state variants.
 */
const getTransitionProperties = (roleTokens: Record<string, string | null>): string[] => {
  const transitionProps = new Set<string>();

  for (const prop of Object.keys(roleTokens)) {
    // Check if this is a state token
    for (const suffix of stateSuffixes) {
      if (prop.endsWith(suffix)) {
        // Extract base property (e.g., "background-hover" → "background")
        const baseProp = prop.slice(0, -suffix.length);
        // Skip compound states (e.g., "background-selected-hover")
        if (baseProp.endsWith("-selected") || baseProp.endsWith("-disabled") || baseProp.endsWith("-open")) {
          continue;
        }
        // Map to CSS property name
        const cssProp = getCSSProperty(baseProp);
        transitionProps.add(cssProp);
        break;
      }
    }
  }

  return [...transitionProps];
};

const getRoleFeatures = (roleTokens: Record<string, string | null>) => {
  const tokenKeys = Object.keys(roleTokens);

  return {
    hasInteractive: tokenKeys.some(
      (k) =>
        k.endsWith("-hover") || k.endsWith("-active") || k.endsWith("-focus"),
    ),
    hasDisabled: tokenKeys.some((k) => k.endsWith("-disabled")),
    hasSelected: tokenKeys.some((k) => k.endsWith("-selected")),
    hasOpen: tokenKeys.some((k) => k.endsWith("-open") || k.includes("-open-")),
    hasAnimated:
      tokenKeys.includes("transition-duration") ||
      tokenKeys.includes("transition-easing"),
  };
};

const generateBaseCSS = (elementName: string, roleTokens: Record<string, string | null>) => {
  const features = getRoleFeatures(roleTokens);
  const css: Record<string, string> = {};

  for (const prop of Object.keys(roleTokens)) {
    if (
      prop.endsWith("-hover") ||
      prop.endsWith("-active") ||
      prop.endsWith("-focus") ||
      prop.endsWith("-disabled") ||
      prop.endsWith("-selected") ||
      prop.includes("-selected-") ||
      prop.endsWith("-open") ||
      prop.includes("-open-")
    ) {
      continue;
    }

    const cssProp = getCSSProperty(prop);
    css[cssProp] = `var(--${elementName}-${prop})`;
  }

  if (features.hasAnimated) {
    const transitionProps = getTransitionProperties(roleTokens);
    if (transitionProps.length > 0) {
      css["transition-property"] = transitionProps.join(", ");
    }
  }

  return css;
};

const generateStateCSS = (elementName: string, suffix: string, roleTokens: Record<string, string | null>) => {
  const css: Record<string, string> = {};

  for (const prop of Object.keys(roleTokens)) {
    if (prop.endsWith(suffix)) {
      // Skip compound states (e.g., don't process "box-shadow-selected-hover" when generating simple ":hover")
      const baseProp = prop.slice(0, -suffix.length);
      if (baseProp.endsWith("-selected") || baseProp.endsWith("-disabled") || baseProp.endsWith("-open")) {
        continue;
      }

      const cssProp = getCSSProperty(baseProp);
      css[cssProp] = `var(--${elementName}-${prop})`;
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

/**
 * Generate CSS for a single element
 */
export const generateElementCSS = (elementName: string, elementTokens: Record<string, string | null>): string => {
  const features = getRoleFeatures(elementTokens);
  const baseCSS = generateBaseCSS(elementName, elementTokens);

  if (
    !features.hasInteractive &&
    !features.hasDisabled &&
    !features.hasSelected &&
    !features.hasOpen
  ) {
    return buildCSS([{ selector: `.f-${elementName}`, props: baseCSS }]);
  }

  const states = [
    features.hasDisabled && { suffix: "-disabled", pseudos: [":disabled", "[aria-disabled='true']", "[data-disabled]"] },
    features.hasSelected && { suffix: "-selected", pseudos: ["[aria-selected='true']", "[data-state='checked']", "[data-selected]"] },
    features.hasSelected && { suffix: "-selected-hover", pseudos: ["[aria-selected='true']:hover", "[data-state='checked']:hover", "[data-selected]:hover"] },
    features.hasSelected && { suffix: "-selected-active", pseudos: ["[aria-selected='true']:active", "[data-state='checked']:active", "[data-selected]:active"] },
    features.hasSelected && { suffix: "-selected-focus", pseudos: ["[aria-selected='true']:focus-visible", "[data-state='checked']:focus-visible", "[data-selected]:focus-visible"] },
    features.hasOpen && { suffix: "-open", pseudos: ["[data-state='open']", "[data-expanded]"] },
    features.hasOpen && { suffix: "-open-hover", pseudos: ["[data-state='open']:hover", "[data-expanded]:hover"] },
    features.hasOpen && { suffix: "-open-active", pseudos: ["[data-state='open']:active", "[data-expanded]:active"] },
    features.hasOpen && { suffix: "-open-focus", pseudos: ["[data-state='open']:focus-visible", "[data-expanded]:focus-visible"] },
    features.hasInteractive && { suffix: "-hover", pseudos: [":hover"] },
    features.hasInteractive && { suffix: "-active", pseudos: [":active"] },
    features.hasInteractive && { suffix: "-focus", pseudos: [":focus-visible"] },
  ].filter(Boolean) as Array<{ suffix: string; pseudos: string[] }>;

  const cssBlocks = states
    .map(({ suffix, pseudos }) => ({
      selector: pseudos.map(p => `.f-${elementName}${p}`).join(", "),
      props: generateStateCSS(elementName, suffix, elementTokens),
    }))
    .filter(({ props }) => props && Object.keys(props).length > 0) as Array<{
      selector: string;
      props: Record<string, string>;
    }>;

  return buildCSS([{ selector: `.f-${elementName}`, props: baseCSS }, ...cssBlocks]);
};

