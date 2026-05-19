import { defineNuxtPlugin } from "#app";
import { useRosetta, loadChunk } from "./composables";

export default defineNuxtPlugin({
  name: "rosetta",
  async setup(nuxtApp) {
    const { locale, messages } = useRosetta();
    const router = nuxtApp.$router as { currentRoute: { value: { path: string } } };

    await loadChunk(locale.value, router.currentRoute.value.path, messages);

    nuxtApp.hook("page:start", async () => {
      await loadChunk(locale.value, router.currentRoute.value.path, messages);
    });
  },
});
