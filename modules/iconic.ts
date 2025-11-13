import type { IconicConfig } from "../packages/iconic/config";

import { defineNuxtModule, addTemplate } from "nuxt/kit";
import { availableIcons, getIconData } from "../packages/iconic/utils";

export default defineNuxtModule<IconicConfig>({
  meta: {
    name: "iconic",
    configKey: "iconic",
  },
  setup(aliases = {}) {
    // Validate that all aliases reference available icons
    Object.entries(aliases).forEach(([alias, iconName]) => {
      if (!availableIcons.includes(iconName)) {
        console.warn(
          `[iconic] Icon "${iconName}" for alias "${alias}" not found in available icon sets`,
        );
      }
    });

    const iconData: Record<string, any> = {};
    Object.entries(aliases).forEach(([alias, iconName]) => {
      const data = getIconData(iconName);
      if (data) {
        iconData[alias] = data;
      }
    });

    addTemplate({
      filename: "iconic.config.mjs",
      getContents: () => `export default ${JSON.stringify(iconData, null, 2)};`,
    });
  },
});
