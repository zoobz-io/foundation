import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin({
  name: "foundation:crucible",
  setup(nuxtApp) {
    // rampart (client-only hook)
    nuxtApp.hook("rampart:denied", ({ roles, scopes }) => {
      log.warn("Access denied", { roles, scopes });
    });

    // rosetta
    nuxtApp.hook("rosetta:locale", ({ from, to }) => {
      log.info("Locale changed", { from, to });
    });
    nuxtApp.hook("rosetta:chunk", ({ locale, route }) => {
      log.debug("Translation chunk loaded", { locale, route });
    });

    // untheme
    nuxtApp.hook("untheme:theme", ({ from, to }) => {
      log.info("Theme changed", { from, to });
    });
    nuxtApp.hook("untheme:mode", ({ from, to }) => {
      log.info("Color mode changed", { from, to });
    });
  },
});
