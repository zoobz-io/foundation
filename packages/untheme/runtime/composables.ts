// @ts-ignore only available at runtime within a module
import config from "#build/untheme.config.mjs";
import { useState } from "#app";
import { computed } from "vue";

export const useUntheme = () => {
  const mode = useState<"light" | "dark">("untheme-mode", () => "dark");

  const setMode = (newMode: "light" | "dark") => {
    mode.value = newMode;
  };

  return {
    mode,
    setMode,
  };
};

// Helper to check if a value is a token reference
const isTokenReference = (value: string): boolean => {
  return value.startsWith('ref-') || value.startsWith('sys-') || value.startsWith('shiki-');
};

// Helper to wrap token references in var()
const wrapValue = (value: string): string => {
  if (isTokenReference(value)) {
    return `var(--${value})`;
  }
  return value;
};

// Runtime token style overrides - only supports tokens defined in the registry
export const useTokenStyle = (
  tokens?: Record<string, Record<string, string | null>>,
) => {
  return computed(() => {
    const styles: Record<string, Record<string, string>> = {};

    if (!tokens) return styles;

    Object.entries(tokens).forEach(([elementName, elementTokens]) => {
      if (!elementTokens) return;

      // Get the list of defined tokens for this element from config
      const definedTokens = config[elementName] as string[] | undefined;
      if (!definedTokens) return;

      const elementStyles: Record<string, string> = {};

      Object.entries(elementTokens).forEach(([tokenKey, value]) => {
        // Only allow overrides for tokens that are defined in the registry
        if (value !== null && definedTokens.includes(tokenKey)) {
          elementStyles[`--${elementName}-${tokenKey}`] = wrapValue(value);
        }
      });

      if (Object.keys(elementStyles).length > 0) {
        styles[elementName] = elementStyles;
      }
    });

    return styles;
  });
};
