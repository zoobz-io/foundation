import { useNuxtApp } from "#app";
import type { LogLevel, LogPayload, LogEntry, SpanEntry, SpanStatus } from "../src/types";
import { generateSpanId } from "../src/trace-id";
import { getTraceContext } from "./trace-context";

type NuxtApp = ReturnType<typeof useNuxtApp>;

let app: NuxtApp | null = null;

const getApp = (): NuxtApp => {
  if (!app) app = useNuxtApp();
  return app;
};

const emit = (level: LogLevel, message: string, data?: LogPayload): void => {
  const ctx = getTraceContext();
  const entry: LogEntry = {
    level,
    message,
    timestamp: Date.now(),
    ...(data ? { data } : {}),
    ...(ctx ? { traceId: ctx.traceId, spanId: ctx.activeSpanId } : {}),
  };
  getApp().$transmit(entry);
};

export const log = {
  debug: (message: string, data?: LogPayload) => emit("debug", message, data),
  info: (message: string, data?: LogPayload) => emit("info", message, data),
  warn: (message: string, data?: LogPayload) => emit("warn", message, data),
  error: (message: string, data?: LogPayload) => emit("error", message, data),
  fatal: (message: string, data?: LogPayload) => emit("fatal", message, data),
};

export interface Span {
  spanId: string;
  end: (status?: SpanStatus) => void;
}

/** Start a custom span linked to the active trace. */
export const startSpan = (name: string, attributes?: Record<string, string | number | boolean>): Span => {
  const ctx = getTraceContext();
  const spanId = generateSpanId();
  const entry: SpanEntry = {
    kind: "span",
    traceId: ctx?.traceId ?? generateSpanId() + generateSpanId(),
    spanId,
    parentSpanId: ctx?.activeSpanId,
    name,
    startTime: Date.now(),
    status: "unset",
    ...(attributes ? { attributes } : {}),
  };

  return {
    spanId,
    end(status: SpanStatus = "ok") {
      getApp().$transmit({ ...entry, endTime: Date.now(), status });
    },
  };
};
