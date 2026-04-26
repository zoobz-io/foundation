import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-06",
  extends: ["@zoobz-io/alloy"],
  imports: {
    dirs: ["types", "factories", "stores", "schemas"],
  },
  modules: ["@pinia/nuxt"],
});
