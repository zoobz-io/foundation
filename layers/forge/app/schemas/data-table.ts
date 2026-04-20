import { z } from "zod";

export const DateFilterSchema = z.object({
  field: z.string(),
  operator: z.enum(["before", "after", "between"]),
  value: z.coerce.date(),
  endValue: z.coerce.date().optional(),
});

export const DataTableSnapshotSchema = z.object({
  query: z.string(),
  keywords: z.string(),
  match: z.enum(["all", "any"]),
  page: z.number(),
  pageSize: z.number(),
  selectedFacets: z.array(z.string()),
  dateFilters: z.array(DateFilterSchema),
  sortField: z.string().nullable(),
  sortDirection: z.enum(["asc", "desc"]),
});

export type DataTableSnapshot = z.infer<typeof DataTableSnapshotSchema>;
