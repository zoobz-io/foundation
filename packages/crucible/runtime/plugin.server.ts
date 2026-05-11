import { defineNitroPlugin } from "nitropack/runtime";
import { getRequestHeader } from "h3";
import type { SpanEntry, SpanStatus } from "../src/types";
import { generateTraceId, generateSpanId, parseTraceparent } from "../src/trace-id";
import { useCrucibleWriter } from "./server";

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("request", (event) => {
    const traceparent = getRequestHeader(event, "traceparent");
    const parsed = parseTraceparent(traceparent);

    const traceId = parsed?.traceId ?? generateTraceId();
    const parentSpanId = parsed?.spanId;
    const spanId = generateSpanId();

    event.context._crucibleSpan = {
      traceId,
      spanId,
      parentSpanId,
      startTime: Date.now(),
    };
  });

  nitro.hooks.hook("afterResponse", (event) => {
    const span = event.context._crucibleSpan as {
      traceId: string;
      spanId: string;
      parentSpanId?: string;
      startTime: number;
    } | undefined;
    if (!span) return;

    const status: SpanStatus = (event.node?.res?.statusCode ?? 200) >= 400 ? "error" : "ok";
    const entry: SpanEntry = {
      kind: "span",
      traceId: span.traceId,
      spanId: span.spanId,
      parentSpanId: span.parentSpanId,
      name: `${event.method} ${event.path}`,
      startTime: span.startTime,
      endTime: Date.now(),
      status,
      source: "server",
      attributes: {
        "http.method": event.method ?? "GET",
        "http.path": event.path ?? "/",
        "http.status_code": event.node?.res?.statusCode ?? 200,
      },
    };

    useCrucibleWriter()?.(entry);
  });
});
