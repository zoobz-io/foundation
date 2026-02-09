import type { Theme } from "./config";

import reference from "./tokens/reference";
import modes from "./tokens/modes";
import defu from "defu";

import {
  defineNuxtModule,
  addTemplate,
  addPlugin,
  addImports,
  createResolver,
} from "@nuxt/kit";

export interface UnthemeModuleOptions {
  theme?: Partial<Theme>;
}

export default defineNuxtModule<UnthemeModuleOptions>({
  meta: {
    name: "untheme",
    configKey: "untheme",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Merge provided theme with defaults
    const theme = defu(options.theme || {}, { reference, modes });

    // Generate global reset CSS
    // Using :where() for zero specificity so component classes always win
    const resetCSS = `/* Box sizing and base reset */
:where(*),
:where(*::before),
:where(*::after) {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}

/* Remove default list styles */
:where(ol, ul, menu) {
  list-style: none;
}

/* Interactive elements */
:where(button, [type="button"], [type="reset"], [type="submit"]) {
  appearance: none;
  background: transparent;
  cursor: pointer;
}

:where(input, textarea, select) {
  appearance: none;
  background: transparent;
}

/* Remove outline - components should provide their own focus styles */
:where(*:focus) {
  outline: none;
}

/* Links */
:where(a) {
  color: inherit;
  text-decoration: inherit;
}

/* Media elements */
:where(img, picture, video, canvas, svg) {
  display: block;
  max-width: 100%;
}

/* Tables */
:where(table) {
  border-collapse: collapse;
  border-spacing: 0;
}

/* Remove default quote styles */
:where(blockquote, q) {
  quotes: none;
}

:where(blockquote::before, blockquote::after, q::before, q::after) {
  content: '';
  content: none;
}

/* Text selection */
::selection {
  background: var(--sys-secondary);
  color: var(--sys-on-secondary);
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

      return lines.join('\n');
    };

    // Add tokens CSS
    const tokensTemplate = addTemplate({
      filename: "untheme.tokens.css",
      getContents: generateTokenCSS,
      write: true,
    });
    nuxt.options.css.push(tokensTemplate.dst);

    // Register plugin for color mode management
    addPlugin(resolver.resolve("../runtime/plugin"));

    // Auto-import useUntheme composable
    addImports([
      { name: "useUntheme", from: resolver.resolve("../runtime/composables") },
    ]);
  },
});
