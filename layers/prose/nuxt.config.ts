import { defineNuxtConfig } from "nuxt/config";
import highlights from "./config/highlights";
import elements from "./elements.config";

export default defineNuxtConfig({
  extends: ["@foundation/blocks"],
  modules: ["@nuxt/content"],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: highlights,
          },
        },
      },
    },
  },
  untheme: {
    elements: {
      "toc-root": elements.tocRoot({}),
      "toc-content": elements.tocContent({}),
      "toc-item": elements.tocItem({}),
      "surround-root": elements.surroundRoot({}),
      "surround-prev": elements.surroundPrev({}),
      "surround-next": elements.surroundNext({}),
      "surround-label": elements.surroundLabel({}),
      "surround-title": elements.surroundTitle({}),
      "surround-prev-description": elements.surroundPrevDescription({}),
      "surround-next-description": elements.surroundNextDescription({}),
      "content-filters-section": elements.contentFiltersSection({}),
    },
  },
});
