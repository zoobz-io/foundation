/**
 * Data table column definition
 */
export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sortKey?: string;
}

/**
 * Sort direction for table columns
 */
export type SortDirection = "asc" | "desc";

/**
 * Match mode for combining query and keywords
 */
export type MatchMode = "all" | "any";

/**
 * Date filter operator types
 */
export type DateFilterOperator = "before" | "after" | "between";

/**
 * Date filter definition
 */
export interface DateFilter {
  field: string;
  operator: DateFilterOperator;
  value: Date;
  endValue?: Date;
}

/**
 * Date field configuration
 */
export interface DateFieldConfig {
  key: string;
  label: string;
}

/**
 * Facet item with count
 */
export interface FacetItem {
  value: string;
  label: string;
  count: number;
}

/**
 * Facet group
 */
export interface FacetGroup {
  key: string;
  label: string;
  items: FacetItem[];
}

/**
 * Action available when items are selected
 */
export interface SelectionAction<K = unknown> {
  icon: IconAlias;
  label: string;
  action: (selected: Set<K>) => void;
}

/**
 * The interface that composables return and widgets accept.
 * Matches the shape of storeToRefs(store) + store methods.
 */
export interface DataTableState<T, K = unknown> {
  // Data (all Ref from storeToRefs)
  data: Ref<T[]>;
  loading: Ref<boolean>;
  columns: Ref<DataTableColumn<T>[]>;
  rowKey: Ref<keyof T>;

  // Pagination
  page: Ref<number>;
  pageSize: Ref<number>;
  pageCount: Ref<number>;
  total: Ref<number>;
  goToPage: (page: number) => void;

  // Sorting
  sortField: Ref<string | null>;
  sortDirection: Ref<SortDirection>;
  sortBy: (field: string) => void;

  // Search
  query: Ref<string>;
  keywords: Ref<string>;
  match: Ref<MatchMode>;

  // Facets
  facetGroups: Ref<FacetGroup[]>;
  selectedFacets: Ref<Set<string>>;
  clearFacets: () => void;

  // Date filters
  dateFields: Ref<DateFieldConfig[]>;
  dateFilters: Ref<DateFilter[]>;
  addDateFilter: (filter: DateFilter) => void;
  removeDateFilter: (field: string) => void;
  clearDateFilters: () => void;

  // Selection
  selected: Ref<Set<K>>;
  selectionActions: Ref<SelectionAction<K>[]>;
  isAllSelected: Ref<boolean>;
  isIndeterminate: Ref<boolean>;
  toggleRow: (key: K) => void;
  toggleAll: () => void;
  clearSelection: () => void;

  // Getters
  sortFieldFor: (col: DataTableColumn<T>) => string;
  isSorted: (col: DataTableColumn<T>) => boolean;
  getSortIcon: () => IconAlias;
  isRowSelected: (row: T) => boolean;
  selectAllState: Ref<boolean | "indeterminate">;
  colSpan: Ref<number>;
  setPageSize: (size: number) => void;

  // Mutation
  update: (payload: Partial<DataTablePayload>) => void;

  // Persistence
  getSnapshot: () => DataTableSnapshot;
  restoreSnapshot: (snapshot: DataTableSnapshot) => void;

  // Lifecycle
  fetch: () => Promise<void>;
}

/**
 * Injection key for DataTable widget config lookup.
 * Pages provide this, DataTable widgets inject it to get their defaults.
 */
export const DATA_TABLE_CONFIG: InjectionKey<(id: string) => DataTableSnapshot | undefined> = Symbol("DATA_TABLE_CONFIG");

/**
 * The writable slice of table state.
 * Passed to update() for partial deep-merge mutations.
 */
export interface DataTablePayload {
  query: string;
  keywords: string;
  match: MatchMode;
  page: number;
  pageSize: number;
  selectedFacets: Set<string>;
  dateFilters: DateFilter[];
}

/**
 * Config the consumer provides to the factory.
 * These are the app-specific implementations.
 */
export interface DataTableConfig<T, K = unknown> {
  columns: DataTableColumn<T>[];
  rowKey: keyof T;
  fetch: (params: DataTableFetchParams) => Promise<DataTableFetchResult<T>>;
  facetGroups?: (data: T[]) => FacetGroup[];
  dateFields?: DateFieldConfig[];
  selectionActions?: SelectionAction<K>[];
  defaultPageSize?: number;
}

/**
 * Parameters passed to the fetch function
 */
export interface DataTableFetchParams {
  page: number;
  pageSize: number;
  sortField: string | null;
  sortDirection: SortDirection;
  query: string;
  keywords: string;
  match: MatchMode;
  facets: Set<string>;
  dateFilters: DateFilter[];
}

/**
 * Result returned from the fetch function
 */
export interface DataTableFetchResult<T> {
  data: T[];
  total: number;
}

export type DataTablePassthrough = {
  root?: Passthrough<GroupProps>;
  toolbar?: Passthrough<GroupProps>;
  table?: Passthrough<TableProps>;
  thead?: Passthrough<TheadProps>;
  tbody?: Passthrough<TbodyProps>;
  empty?: Passthrough<TdProps>;
  pagination?: Passthrough<GroupProps>;
};

export type DataTableProps<T, K = unknown> = {
  store: DataTableState<T, K>;
  selectable?: boolean;
  pt?: DataTablePassthrough;
};
