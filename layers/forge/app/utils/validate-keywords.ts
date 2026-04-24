/**
 * Validates a keyword string against our supported Lucene subset.
 *
 * Valid tokens:
 *   +term, -term, +"quoted phrase", -"quoted phrase"
 *
 * Valid joiners:
 *   space (AND), || (OR, between include terms only)
 *
 * Invalid:
 *   bare terms without +/-, single |, OR/AND text operators
 */
export const validateKeywords = (input: string): boolean => {
  const trimmed = input.trim();
  if (!trimmed) return false;

  // Split on || first, then validate each segment
  const orSegments = trimmed.split(/\s*\|\|\s*/);

  for (const segment of orSegments) {
    if (!segment.trim()) return false;

    // Each segment must be valid terms separated by spaces
    // Match: +term, -term, +"quoted", -"quoted"
    // Term must start with a word character (no double prefix like --foo or +-foo)
    const tokenRegex = /^[+-](?:"[^"]+"|[a-z0-9]\S*)(?:\s+[+-](?:"[^"]+"|[a-z0-9]\S*))*$/i;
    if (!tokenRegex.test(segment.trim())) return false;
  }

  // Ensure no single | (must be ||)
  if (/(?<!\|)\|(?!\|)/.test(trimmed)) return false;

  return true;
};
