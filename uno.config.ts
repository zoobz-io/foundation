import { defineConfig } from "unocss";
import unthemePreset from "./packages/untheme/preset";

export default defineConfig({
  presets: [unthemePreset()],
  theme: {},
});
