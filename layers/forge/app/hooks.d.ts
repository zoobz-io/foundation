import type { DataTableSnapshot } from "./schemas/data-table";

declare module "#app" {
  interface RuntimeNuxtHooks {
    "widget:table:snapshot": (event: { id: string; snapshot: DataTableSnapshot }) => void;
  }
}

export {};
