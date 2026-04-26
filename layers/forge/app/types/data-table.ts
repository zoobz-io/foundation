/**
 * Column data type — drives rendering, filtering, and sorting behavior.
 */
export type ColumnType =
  | "text"
  | "number"
  | "date"
  | "datetime"
  | "boolean"
  | "enum"
  | "currency"
  | "url"
  | "image"
  | "action";

/**
 * Data table column definition
 */
export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  type?: ColumnType;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sortKey?: string;
  enumValues?: string[];
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
 * Filter value — discriminated by shape.
 */
export type FilterValue =
  | { type: "text"; value: string }
  | { type: "number"; value: number }
  | { type: "number_range"; value: [number, number] }
  | { type: "date"; value: Date }
  | { type: "date_range"; value: [Date, Date] }
  | { type: "enum"; value: string[] }
  | { type: "boolean"; value: boolean };

/**
 * A single filter condition.
 */
export interface TableFilter {
  field: string;
  operator: string;
  value: FilterValue;
}

/**
 * Row action — rendered per-row in an actions menu.
 */
export interface RowAction<T> {
  icon: IconAlias;
  label: string;
  action: (row: T) => void;
}

/**
 * Bulk action — rendered when rows are selected.
 */
export interface BulkAction<K> {
  icon: IconAlias;
  label: string;
  action: (selected: Set<K>) => void;
}

/**
 * The writable slice of table state.
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
 */
export interface DataTableConfig<T, K = unknown> {
  columns: DataTableColumn<T>[];
  rowKey: keyof T;
  fetch: (params: DataTableFetchParams) => Promise<DataTableFetchResult<T>>;
  actions?: RowAction<T>[];
  bulkActions?: BulkAction<K>[];
  pinnedColumns?: (keyof T)[];
  defaultColumnOrder?: (keyof T)[];
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
  pageCount: number;
  facets?: FacetGroup[];
}

/**
 * The reactive interface for a data table.
 * Returned by the table factory. Components accept this as their prop.
 */
export interface Table<T, K = unknown> {
  // Reactive state
  data: Ref<T[]>;
  loading: Ref<boolean>;

  // Static config
  readonly columns: DataTableColumn<T>[];
  readonly rowKey: keyof T;
  readonly actions: RowAction<T>[];
  readonly bulkActions: BulkAction<K>[];
  readonly pinnedColumns: (keyof T)[];

  // Pagination
  page: Ref<number>;
  pageSize: Ref<number>;
  pageCount: Ref<number>;
  total: Ref<number>;

  // Sorting
  sortField: Ref<string | null>;
  sortDirection: Ref<SortDirection>;

  // Search
  query: Ref<string>;
  keywords: Ref<string>;
  match: Ref<MatchMode>;

  // Facets
  facetGroups: Ref<FacetGroup[]>;
  selectedFacets: Ref<Set<string>>;

  // Date filters
  dateFilters: Ref<DateFilter[]>;

  // Filters
  filters: ComputedRef<TableFilter[]>;

  // Selection
  selected: Ref<Set<K>>;
  isAllSelected: Ref<boolean>;
  isIndeterminate: Ref<boolean>;

  // Columns
  columnOrder: Ref<string[]>;
  visibleColumns: Ref<DataTableColumn<T>[]>;

  // Getters
  selectAllState: Ref<boolean | "indeterminate">;
  colSpan: Ref<number>;
  dateColumns: Ref<DataTableColumn<T>[]>;

  // Actions
  goToPage: (page: number) => void;
  sortBy: (field: string) => void;
  clearFacets: () => void;
  addDateFilter: (filter: DateFilter) => void;
  removeDateFilter: (field: string) => void;
  clearDateFilters: () => void;
  toggleRow: (key: K) => void;
  toggleAll: () => void;
  clearSelection: () => void;
  sortFieldFor: (col: DataTableColumn<T>) => string;
  isSorted: (col: DataTableColumn<T>) => boolean;
  getSortIcon: () => IconAlias;
  isRowSelected: (row: T) => boolean;
  addFilter: (filter: TableFilter) => void;
  removeFilter: (index: number) => void;
  clearFilters: () => void;
  toggleColumn: (key: keyof T) => void;
  reorderColumns: (order: string[]) => void;
  resetColumns: () => void;
  isColumnPinned: (key: keyof T) => boolean;
  isColumnVisible: (key: keyof T) => boolean;
  setPageSize: (size: number) => void;
  update: (payload: Partial<DataTablePayload>) => void;
  getSnapshot: () => DataTableSnapshot;
  restoreSnapshot: (snapshot: DataTableSnapshot) => void;
  init: () => Promise<boolean>;
  initialized: Ref<boolean>;
  fetch: () => Promise<void>;
}

// ---------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------

export type DataTableFiltersPassthrough = {
  root?: Passthrough<GroupProps>;
  chips?: Passthrough<GroupProps>;
  icon?: Passthrough<IconProps>;
  chip?: Passthrough<ChipProps>;
  inputWrap?: Passthrough<GroupProps>;
  mirrorWrap?: Passthrough<GroupProps>;
  mirrorText?: Passthrough<SpanProps>;
  mirrorHint?: Passthrough<SpanProps>;
  input?: Passthrough<InputProps>;
  dropdown?: Passthrough<GroupProps>;
  dropdownPanel?: Passthrough<GroupProps>;
  dropdownScroller?: Passthrough<ScrollerProps, ScrollerEmits>;
  dropdownItem?: Passthrough<ButtonProps>;
  dropdownItemIcon?: Passthrough<IconProps>;
  dropdownItemLabel?: Passthrough<SpanProps>;
  dropdownItemArrow?: Passthrough<IconProps>;
  dropdownEmpty?: Passthrough<SpanProps>;
  infoIcon?: Passthrough<IconProps>;
  dialog?: Passthrough<DialogProps, DialogEmits>;
  helpTable?: Passthrough<TableProps>;
  helpThead?: Passthrough<TheadProps>;
  helpTbody?: Passthrough<TbodyProps>;
  helpTh?: Passthrough<ThProps>;
  helpTd?: Passthrough<TdProps>;
  helpKbd?: Passthrough<KbdProps>;
};

export type DataTableFiltersProps<T, K = unknown> = {
  table: Table<T, K>;
  pt?: DataTableFiltersPassthrough;
};

// ---------------------------------------------------------------------------
// Columns
// ---------------------------------------------------------------------------

export type DataTableColumnsPassthrough = {
  popover?: Passthrough<PopoverProps, PopoverEmits>;
  trigger?: Passthrough<FabProps>;
  command?: Passthrough<CommandProps, CommandEmits>;
};

export type DataTableColumnsProps<T, K = unknown> = {
  table: Table<T, K>;
  pt?: DataTableColumnsPassthrough;
};

// ---------------------------------------------------------------------------
// Widget
// ---------------------------------------------------------------------------

export type DataTablePassthrough = {
  root?: Passthrough<GroupProps>;
  toolbar?: Passthrough<GroupProps>;
  searchPopover?: Passthrough<PopoverProps, PopoverEmits>;
  searchTrigger?: Passthrough<FabProps>;
  searchWrap?: Passthrough<GroupProps>;
  searchInput?: Passthrough<InputProps>;
  keywords?: Passthrough<KeywordsProps, KeywordsEmits>;
  facets?: Passthrough<FacetsProps, FacetsEmits>;
  dateFilters?: Passthrough<DateFiltersProps, DateFiltersEmits>;
  bulkActions?: Passthrough<GroupProps>;
  bulkActionsCount?: Passthrough<SpanProps>;
  bulkAction?: Passthrough<ButtonProps>;
  bulkActionIcon?: Passthrough<IconProps>;
  bulkActionClear?: Passthrough<ButtonProps>;
  scroller?: Passthrough<ScrollerProps, ScrollerEmits>;
  table?: Passthrough<TableProps>;
  thead?: Passthrough<TheadProps>;
  theadTr?: Passthrough<TrProps>;
  th?: Passthrough<ThProps>;
  selectAllCheckbox?: Passthrough<CheckboxProps, CheckboxEmits>;
  headerWrap?: Passthrough<GroupProps>;
  sortButton?: Passthrough<ButtonProps>;
  sortIcon?: Passthrough<IconProps>;
  headerLabel?: Passthrough<SpanProps>;
  dragIcon?: Passthrough<IconProps>;
  tbody?: Passthrough<TbodyProps>;
  tr?: Passthrough<TrProps>;
  td?: Passthrough<TdProps>;
  empty?: Passthrough<TdProps>;
  rowCheckbox?: Passthrough<CheckboxProps, CheckboxEmits>;
  cellAnchor?: Passthrough<AnchorProps>;
  cellImg?: Passthrough<ImgProps>;
  cellSpan?: Passthrough<SpanProps>;
  actionsMenu?: Passthrough<MenuProps, MenuEmits>;
  actionsTrigger?: Passthrough<FabProps>;
  pagination?: Passthrough<PaginationProps, PaginationEmits>;

  // Sub-component passthrough
  filters?: DataTableFiltersPassthrough;
  columns?: DataTableColumnsPassthrough;
};

export type DataTableProps<T, K = unknown> = {
  table: Table<T, K>;
  pt?: DataTablePassthrough;
};
