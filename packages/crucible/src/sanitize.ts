/** Extract data from a hook arg, optionally narrowing to specific fields. JSON-safe. */
export const extractData = (arg: unknown, fields?: string[]): Record<string, unknown> | undefined => {
  if (typeof arg !== "object" || arg === null) return undefined;
  try {
    const json = JSON.stringify(arg, fields);
    const parsed: unknown = JSON.parse(json);
    if (typeof parsed !== "object" || parsed === null) return undefined;
    return parsed as Record<string, unknown>;
  } catch {
    return undefined;
  }
};

/** Sanitize a data payload — makes it JSON-safe without narrowing fields. */
export const sanitizeData = (data: unknown): Record<string, unknown> | undefined =>
  extractData(data);

// --- Display utilities (provider-level only) ---

const MAX_KEYS = 8;
const MAX_STRING = 120;

const summarizeValue = (value: unknown): unknown => {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") return value.length > MAX_STRING ? `${value.slice(0, MAX_STRING)}…` : value;
  if (typeof value !== "object") return value;
  if (Array.isArray(value)) return `[Array(${value.length})]`;
  return `[Object]`;
};

/** Shallow summary for display — truncates strings, replaces nested objects. */
export const summarize = (obj: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < Math.min(keys.length, MAX_KEYS); i++) {
    const key = keys[i];
    if (key) result[key] = summarizeValue(obj[key]);
  }
  if (keys.length > MAX_KEYS) {
    result["…"] = `+${keys.length - MAX_KEYS} more`;
  }
  return result;
};
