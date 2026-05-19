import { defineEventHandler, getRouterParams } from "h3";
import { readChunk } from "./chunk";

export default defineEventHandler((event) => {
  const params = getRouterParams(event);
  const locale = params.locale || "en";
  const route = params.route || "index";
  return readChunk(locale, route);
});
