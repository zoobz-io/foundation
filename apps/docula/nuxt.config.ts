import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-17",
  extends: ["@foundation/prose", "@foundation/giscus"],
  modules: ["nuxt-typed-router"],
  app: {
    head: {
      title: "Docula",
      meta: [
        {
          name: "description",
          content: "Documentation site built with Foundation",
        },
      ],
    },
  },
  css: [
    // Component styles
    "@foundation/docula/assets/components/index.css",
  ],
});
