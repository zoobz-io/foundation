import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/** Reads a translation chunk for a given locale and route directly from disk. */
export const readChunk = (locale: string, route: string): Record<string, string> => {
  const rosettaDir = join(process.cwd(), ".rosetta");

  const pageMapPath = join(rosettaDir, "pages.json");
  if (!existsSync(pageMapPath)) return {};

  const pageMap: Record<string, string[]> = JSON.parse(readFileSync(pageMapPath, "utf-8"));

  const routeKey = route === "index" ? "/" : `/${decodeURIComponent(route)}`;
  const hashes = pageMap[routeKey];
  if (!hashes) return {};

  const corpusPath = join(rosettaDir, `${locale}.json`);
  if (!existsSync(corpusPath)) {
    const sourcePath = join(rosettaDir, "source.json");
    if (!existsSync(sourcePath)) return {};
    const source: Record<string, string> = JSON.parse(readFileSync(sourcePath, "utf-8"));
    const result: Record<string, string> = {};
    for (const hash of hashes) {
      const value = source[hash];
      if (value) result[hash] = value;
    }
    return result;
  }

  const corpus: Record<string, string> = JSON.parse(readFileSync(corpusPath, "utf-8"));
  const result: Record<string, string> = {};
  for (const hash of hashes) {
    const value = corpus[hash];
    if (value) result[hash] = value;
  }
  return result;
};
