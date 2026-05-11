export interface TraceContext {
  traceId: string;
  rootSpanId: string;
  activeSpanId: string;
}

let current: TraceContext | null = null;

export const getTraceContext = (): TraceContext | null => current;

export const setTraceContext = (ctx: TraceContext | null): void => {
  current = ctx;
};
