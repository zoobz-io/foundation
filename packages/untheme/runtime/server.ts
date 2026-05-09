import { defineEventHandler, getRouterParams } from "h3";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export default defineEventHandler((event) => {
  const params = getRouterParams(event);
  const theme = params.theme;

  if (!theme) {
    return {};
  }

  const unthemeDir = join(process.cwd(), ".untheme");
  const themePath = join(unthemeDir, `${theme}.json`);

  if (!existsSync(themePath)) {
    return {};
  }

  return JSON.parse(readFileSync(themePath, "utf-8"));
});
