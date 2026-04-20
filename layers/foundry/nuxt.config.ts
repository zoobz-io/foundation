import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-06",
  extends: ["@zoobz-io/forge"],
  imports: {
    dirs: ["types", "factories", "schemas"],
  },
  modules: ["@pinia/nuxt"],
});
