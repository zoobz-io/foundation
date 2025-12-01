import type { UnthemeOptions } from "./config";

import { generateElementCSS } from "./css";
import reference from "./tokens/reference";
import modes from "./tokens/modes";

/**
 * Merge token objects with null-preservation semantics.
 * First defined value wins (including null). Unlike defu, null values
 * are treated as real values and not overridden by later sources.
 */
function mergeTokens(
  ...sources: Record<string, string | null>[]
): Record<string, string | null> {
  const result: Record<string, string | null> = {};
  for (const source of sources) {
    for (const [key, value] of Object.entries(source)) {
      if (!(key in result)) {
        result[key] = value;
      }
    }
  }
  return result;
}

import {
  defineNuxtModule,
  addTemplate,
  addImports,
  addPlugin,
  createResolver,
} from "@nuxt/kit";

// Generate TypeScript declarations for element registry
function generateElementRegistry(
  elements: Record<
    string,
    {
      defaults: Record<string, Record<string, string | null>>;
      tokens: Record<string, string | null>;
    }
  >,
): string {
  const entries = Object.entries(elements).map(([name, elementConfig]) => {
    // Extract role names from defaults (excluding "base")
    const roles = Object.keys(elementConfig.defaults).filter(
      (r) => r !== "base",
    );

    // Generate type for this element
    const rolesArray =
      roles.length > 0 ? `[${roles.map((r) => `"${r}"`).join(", ")}]` : "[]";
    return `    "${name}": Partial<ElementTokens<${rolesArray}>>;`;
  });

  return `import type { ElementTokens } from '@foundation/untheme/config';
  export interface ElementRegistry {
${entries.join("\n")}
  }
`;
}

export default defineNuxtModule<UnthemeOptions>({
  meta: {
    name: "untheme",
    configKey: "untheme",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Use provided theme or default to base system tokens
    const theme = options.theme || { reference, modes };

    // Merge elements: role tokens + user overrides (Nuxt auto-merged from all layers)
    const mergedElements: Record<string, Record<string, string | null>> = {};

    for (const [elementName, elementConfig] of Object.entries(
      options.elements || {},
    )) {
      // elementConfig contains { defaults: { base: {...}, role1: {...}, ... }, tokens: {...} }
      // Merge user tokens with role defaults (user tokens take priority)
      const roleDefaults = Object.values(elementConfig.defaults);
      mergedElements[elementName] = mergeTokens(
        elementConfig.tokens,
        ...roleDefaults,
      );
    }

    // Generate global reset CSS
    const resetCSS = `* {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}`;

    // Add global reset CSS
    const resetTemplate = addTemplate({
      filename: "untheme.reset.css",
      getContents: () => resetCSS,
      write: true,
    });

    // Inject reset CSS globally
    nuxt.options.css.push(resetTemplate.dst);

    // Generate CSS custom properties for tokens
    const generateTokenCSS = () => {
      const lines: string[] = [];

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

      // Reference tokens (hard values)
      if (theme.reference) {
        lines.push(':root {');
        Object.entries(theme.reference).forEach(([key, value]) => {
          if (value !== null) {
            lines.push(`  --${key}: ${value};`);
          }
        });
        lines.push('}');
      }

      // Light mode tokens (may reference ref- tokens)
      if (theme.modes?.light) {
        lines.push('\n:root {');
        Object.entries(theme.modes.light).forEach(([key, value]) => {
          if (value !== null) {
            lines.push(`  --${key}: ${wrapValue(value)};`);
          }
        });
        lines.push('}');
      }

      // Dark mode tokens (may reference ref- tokens)
      if (theme.modes?.dark) {
        lines.push('\n.dark {');
        Object.entries(theme.modes.dark).forEach(([key, value]) => {
          if (value !== null) {
            lines.push(`  --${key}: ${wrapValue(value)};`);
          }
        });
        lines.push('}');
      }

      // Element tokens (reference sys-/ref- tokens)
      lines.push('\n:root {');
      Object.entries(mergedElements).forEach(([elementName, tokens]) => {
        Object.entries(tokens).forEach(([key, value]) => {
          if (value !== null) {
            lines.push(`  --${elementName}-${key}: ${wrapValue(value)};`);
          }
        });
      });
      lines.push('}');

      return lines.join('\n');
    };

    // Add tokens CSS
    const tokensTemplate = addTemplate({
      filename: "untheme.tokens.css",
      getContents: generateTokenCSS,
      write: true,
    });
    nuxt.options.css.push(tokensTemplate.dst);

    // Generate individual CSS files per element
    for (const [elementName, elementTokens] of Object.entries(mergedElements)) {
      const elementCSS = generateElementCSS(elementName, elementTokens);

      addTemplate({
        filename: `untheme/${elementName}.css`,
        getContents: () => elementCSS,
        write: true,
      });
    }

    // Generate TypeScript declarations for element registry
    addTemplate({
      filename: "types/untheme.d.ts",
      getContents: () => generateElementRegistry(options.elements || {}),
      write: true,
    });

    // Generate runtime config with all tokens per element (including null)
    const runtimeConfig: Record<string, string[]> = {};
    Object.entries(mergedElements).forEach(([elementName, tokens]) => {
      const allTokens = Object.keys(tokens);
      if (allTokens.length > 0) {
        runtimeConfig[elementName] = allTokens;
      }
    });

    addTemplate({
      filename: "untheme.config.mjs",
      getContents: () => `export default ${JSON.stringify(runtimeConfig, null, 2)};`,
      write: true,
    });

    // Register plugin
    addPlugin(resolver.resolve("../runtime/plugin"));

    // Auto-import composables and utilities
    addImports([
      { name: "tokenize", from: resolver.resolve("../runtime/utils") },
      { name: "keys", from: resolver.resolve("../runtime/utils") },
      { name: "useUntheme", from: resolver.resolve("../runtime/composables") },
      {
        name: "useTokenStyle",
        from: resolver.resolve("../runtime/composables"),
      },
      {
        name: "Tokens",
        from: resolver.resolve("../runtime/types"),
        type: true,
      },
    ]);
  },
});
