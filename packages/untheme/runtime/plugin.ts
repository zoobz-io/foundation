import { defineNuxtPlugin, useHead } from "#app";
import { watch } from "vue";
import { useUntheme } from "./composables";

export default defineNuxtPlugin(() => {
  const { mode } = useUntheme();

  // Set initial class via useHead for SSR
  useHead({
    htmlAttrs: {
      class: mode.value === "dark" ? "dark" : "",
    },
  });

  // Direct DOM updates on client for instant mode switching
  if (import.meta.client) {
    watch(mode, (newMode) => {
      if (newMode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, { flush: 'sync' });
  }
});
