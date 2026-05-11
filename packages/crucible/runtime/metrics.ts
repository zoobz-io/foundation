import type { MetricEntry, TelemetryEntry } from "../src/types";

type Transmit = (entry: TelemetryEntry) => void;

const metric = (name: string, value: number, unit?: string, attributes?: Record<string, string | number | boolean>): MetricEntry => ({
  kind: "metric",
  name,
  value,
  timestamp: Date.now(),
  source: "client",
  ...(unit ? { unit } : {}),
  ...(attributes ? { attributes } : {}),
});

interface MetricsOptions {
  webVitals?: boolean;
  resources?: boolean;
  longTasks?: boolean;
  connection?: boolean;
}

export const initMetrics = (transmit: Transmit, options: MetricsOptions): void => {
  const { webVitals = true, resources = false, longTasks = true, connection = true } = options;

  // --- Web Vitals (LCP, INP, CLS) ---
  if (webVitals) {
    // LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) transmit(metric("web_vital.lcp", last.startTime, "ms"));
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    // CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!shift.hadRecentInput && shift.value) {
          clsValue += shift.value;
        }
      }
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });

    // Report CLS on visibility change (final value)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && clsValue > 0) {
        transmit(metric("web_vital.cls", clsValue, "score"));
      }
    });

    // INP
    const inpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const event = entry as PerformanceEntry & { duration: number };
        transmit(metric("web_vital.inp", event.duration, "ms"));
      }
    });
    inpObserver.observe({ type: "event", buffered: true });
  }

  // --- TTFB ---
  if (webVitals) {
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navEntries[0]) {
      const nav = navEntries[0];
      transmit(metric("perf.ttfb", nav.responseStart - nav.startTime, "ms"));
      transmit(metric("perf.dom_load", nav.domContentLoadedEventEnd - nav.startTime, "ms"));
      transmit(metric("perf.full_load", nav.loadEventEnd - nav.startTime, "ms"));
    }
  }

  // --- Long Tasks ---
  if (longTasks) {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        transmit(metric("perf.long_task", entry.duration, "ms", {
          startTime: entry.startTime,
        }));
      }
    });
    longTaskObserver.observe({ type: "longtask", buffered: true });
  }

  // --- Resource Timing ---
  if (resources) {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        transmit(metric("perf.resource", resource.duration, "ms", {
          name: resource.name,
          type: resource.initiatorType,
          size: resource.transferSize,
        }));
      }
    });
    resourceObserver.observe({ type: "resource", buffered: true });
  }

  // --- Connection Info ---
  if (connection) {
    const nav = navigator as Navigator & {
      connection?: {
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
        saveData?: boolean;
      };
    };
    if (nav.connection) {
      const conn = nav.connection;
      transmit(metric("perf.connection", conn.rtt ?? 0, "ms", {
        effectiveType: conn.effectiveType ?? "unknown",
        downlink: conn.downlink ?? 0,
        ...(conn.saveData ? { saveData: true } : {}),
      }));
    }
  }
};
