import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "#build/crucible.config.mjs": resolve(__dirname, "packages/crucible/runtime/stubs/config.ts"),
      "#build/rampart.config.mjs": resolve(__dirname, "packages/rampart/runtime/stubs/config.ts"),
      "#build/rosetta.config.mjs": resolve(__dirname, "packages/rosetta/runtime/stubs/config.ts"),
      "#build/untheme.config.mjs": resolve(__dirname, "packages/untheme/runtime/stubs/config.ts"),
    },
  },
  test: {
    environment: "happy-dom",
    include: ["layers/*/tests/**/*.test.ts", "packages/*/tests/**/*.test.ts"],
    setupFiles: [
      resolve(__dirname, "layers/ore/tests/setup.ts"),
      resolve(__dirname, "layers/alloy/tests/setup.ts"),
      resolve(__dirname, "layers/forge/tests/setup.ts"),
      resolve(__dirname, "layers/foundry/tests/setup.ts"),
      resolve(__dirname, "layers/foundation/tests/setup.ts"),
    ],
    coverage: {
      include: [
        "layers/ore/app/**/*.{ts,vue}",
        "layers/alloy/app/**/*.{ts,vue}",
        "layers/forge/app/**/*.{ts,vue}",
        "layers/foundry/app/**/*.{ts,vue}",
        "layers/foundation/app/**/*.{ts,vue}",
      ],
      reportsDirectory: ".coverage",
    },
  },
});
