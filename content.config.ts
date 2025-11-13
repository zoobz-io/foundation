import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    example: defineCollection({
      type: "page",
      source: "*.md",
    }),
  },
});
