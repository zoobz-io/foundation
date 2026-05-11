const randomHex = (length: number): string => {
  const bytes = new Uint8Array(length / 2);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

/** Generate a 32-character hex trace ID. */
export const generateTraceId = (): string => randomHex(32);

/** Generate a 16-character hex span ID. */
export const generateSpanId = (): string => randomHex(16);

/** Format a W3C traceparent header value. */
export const formatTraceparent = (traceId: string, spanId: string, sampled = true): string =>
  `00-${traceId}-${spanId}-${sampled ? "01" : "00"}`;

export interface ParsedTraceparent {
  traceId: string;
  spanId: string;
  sampled: boolean;
}

/** Parse a W3C traceparent header. Returns null if invalid. */
export const parseTraceparent = (header: string | null | undefined): ParsedTraceparent | null => {
  if (!header) return null;
  const parts = header.split("-");
  if (parts.length !== 4) return null;
  const [version, traceId, spanId, flags] = parts;
  if (version !== "00" || !traceId || !spanId || !flags) return null;
  if (traceId.length !== 32 || spanId.length !== 16) return null;
  return { traceId, spanId, sampled: flags === "01" };
};
