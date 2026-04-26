import { z } from "zod";

export const DateFilterSchema = z.object({
  field: z.string(),
  operator: z.enum(["before", "after", "between"]),
  value: z.coerce.date(),
  endValue: z.coerce.date().optional(),
});

export const DataTableSnapshotSchema = z.object({
  query: z.string().default(""),
  keywords: z.string().default(""),
  match: z.enum(["all", "any"]).default("all"),
  page: z.number().default(1),
  pageSize: z.number().default(25),
  selectedFacets: z.array(z.string()).default([]),
  dateFilters: z.array(DateFilterSchema).default([]),
  sortField: z.string().nullable().default(null),
  sortDirection: z.enum(["asc", "desc"]).default("asc"),
  columnOrder: z.array(z.string()).default([]),
});

export type DataTableSnapshot = z.infer<typeof DataTableSnapshotSchema>;
