import type {
  DataTableColumn,
  DataTableConfig,
  DataTableFetchParams,
  DataTablePayload,
  DateFilter,
  FacetGroup,
} from "../types/data-table";
import { DATA_TABLE_CONFIG } from "../types/data-table";
import { DataTableSnapshotSchema } from "../schemas/data-table";
import type { DataTableSnapshot } from "../schemas/data-table";

export const createTableStore = <T, K = unknown>(
  id: string,
  config: Omit<DataTableConfig<T, K>, "id">,
) => {
  return defineStore(`table-${id}`, () => {
    // Resolve defaults from page config via inject
    const getConfig = inject(DATA_TABLE_CONFIG, undefined);
    const raw = getConfig?.(id);
    const defaults = raw ? DataTableSnapshotSchema.partial().parse(raw) : undefined;

    // Data
    const data = ref<T[]>([]) as Ref<T[]>;
    const loading = ref(false);
    const columns = config.columns;
    const rowKey = config.rowKey;

    // Pagination
    const page = ref(defaults?.page ?? 1);
    const pageSize = ref(defaults?.pageSize ?? config.defaultPageSize ?? 10);
    const total = ref(0);
    const pageCount = computed(() =>
      Math.max(1, Math.ceil(total.value / pageSize.value)),
    );

    const goToPage = (p: number) => {
      if (p < 1 || p > pageCount.value) return;
      page.value = p;
      fetchData();
    };

    // Sorting
    const sortField = ref<string | null>(defaults?.sortField ?? null);
    const sortDirection = ref<"asc" | "desc">(defaults?.sortDirection ?? "asc");

    const sortBy = (field: string) => {
      if (sortField.value === field) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
      } else {
        sortField.value = field;
        sortDirection.value = "asc";
      }
      page.value = 1;
      fetchData();
    };

    // Search
    const query = ref(defaults?.query ?? "");
    const keywords = ref(defaults?.keywords ?? "");
    const match = ref<"all" | "any">(defaults?.match ?? "all");

    // Facets
    const selectedFacets = ref(new Set<string>(defaults?.selectedFacets));
    const facetGroups = computed<FacetGroup[]>(() =>
      config.facetGroups ? config.facetGroups(data.value) : [],
    );

    const clearFacets = () => {
      selectedFacets.value = new Set();
      page.value = 1;
      fetchData();
    };

    // Date filters
    const dateFields = config.dateFields ?? [];
    const dateFilters = ref<DateFilter[]>(defaults?.dateFilters ?? []);

    const addDateFilter = (filter: DateFilter) => {
      const existing = dateFilters.value.findIndex(
        (f) => f.field === filter.field,
      );
      if (existing >= 0) {
        const next = [...dateFilters.value];
        next[existing] = filter;
        dateFilters.value = next;
      } else {
        dateFilters.value = [...dateFilters.value, filter];
      }
      page.value = 1;
      fetchData();
    };

    const removeDateFilter = (field: string) => {
      dateFilters.value = dateFilters.value.filter((f) => f.field !== field);
      page.value = 1;
      fetchData();
    };

    const clearDateFilters = () => {
      dateFilters.value = [];
      page.value = 1;
      fetchData();
    };

    // Selection
    const selected = ref(new Set<K>()) as Ref<Set<K>>;
    const selectionActions = config.selectionActions ?? [];

    const isAllSelected = computed(() => {
      if (!data.value.length) return false;
      return data.value.every((row) =>
        selected.value.has(row[config.rowKey] as K),
      );
    });

    const isIndeterminate = computed(() => {
      if (!selected.value.size) return false;
      return !isAllSelected.value;
    });

    const toggleRow = (key: K) => {
      const next = new Set(selected.value);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      selected.value = next;
    };

    const toggleAll = () => {
      if (isAllSelected.value) {
        selected.value = new Set();
      } else {
        selected.value = new Set(
          data.value.map((row) => row[config.rowKey] as K),
        );
      }
    };

    const clearSelection = () => {
      selected.value = new Set();
    };

    // Getters
    const sortFieldFor = (col: DataTableColumn<T>) => col.sortKey ?? String(col.key);
    const isSorted = (col: DataTableColumn<T>) => sortField.value === sortFieldFor(col);
    const getSortIcon = (): IconAlias =>
      sortDirection.value === "asc" ? "chevron-up" : "chevron-down";
    const isRowSelected = (row: T) => selected.value.has(row[config.rowKey] as K);
    const selectAllState = computed(() => {
      if (isIndeterminate.value) return "indeterminate" as const;
      return isAllSelected.value;
    });
    const colSpan = computed(() => columns.length);

    const setPageSize = (size: number) => {
      pageSize.value = size;
      page.value = 1;
      fetchData();
    };

    // Mutation
    const update = (payload: Partial<DataTablePayload>) => {
      if (payload.query !== undefined) query.value = payload.query;
      if (payload.keywords !== undefined) keywords.value = payload.keywords;
      if (payload.match !== undefined) match.value = payload.match;
      if (payload.page !== undefined) page.value = payload.page;
      if (payload.pageSize !== undefined) pageSize.value = payload.pageSize;
      if (payload.selectedFacets !== undefined) selectedFacets.value = payload.selectedFacets;
      if (payload.dateFilters !== undefined) dateFilters.value = payload.dateFilters;
      fetchData();
    };

    // Persistence
    const getSnapshot = (): DataTableSnapshot => ({
      query: query.value,
      keywords: keywords.value,
      match: match.value,
      page: page.value,
      pageSize: pageSize.value,
      selectedFacets: [...selectedFacets.value],
      dateFilters: dateFilters.value,
      sortField: sortField.value,
      sortDirection: sortDirection.value,
    });

    const restoreSnapshot = (snapshot: DataTableSnapshot) => {
      query.value = snapshot.query;
      keywords.value = snapshot.keywords;
      match.value = snapshot.match;
      page.value = snapshot.page;
      pageSize.value = snapshot.pageSize;
      selectedFacets.value = new Set(snapshot.selectedFacets);
      dateFilters.value = snapshot.dateFilters;
      sortField.value = snapshot.sortField;
      sortDirection.value = snapshot.sortDirection;
      fetchData();
    };

    // Fetch
    const fetchData = async () => {
      loading.value = true;
      try {
        const params: DataTableFetchParams = {
          page: page.value,
          pageSize: pageSize.value,
          sortField: sortField.value,
          sortDirection: sortDirection.value,
          query: query.value,
          keywords: keywords.value,
          match: match.value,
          facets: selectedFacets.value,
          dateFilters: dateFilters.value,
        };
        const result = await config.fetch(params);
        data.value = result.data;
        total.value = result.total;
      } finally {
        loading.value = false;
        useNuxtApp().callHook("widget:table:snapshot", { id, snapshot: getSnapshot() });
      }
    };

    return {
      data,
      loading,
      columns,
      rowKey,
      page,
      pageSize,
      pageCount,
      total,
      goToPage,
      sortField,
      sortDirection,
      sortBy,
      query,
      keywords,
      match,
      facetGroups,
      selectedFacets,
      clearFacets,
      dateFields,
      dateFilters,
      addDateFilter,
      removeDateFilter,
      clearDateFilters,
      selected,
      selectionActions,
      isAllSelected,
      isIndeterminate,
      toggleRow,
      toggleAll,
      clearSelection,
      sortFieldFor,
      isSorted,
      getSortIcon,
      isRowSelected,
      selectAllState,
      colSpan,
      setPageSize,
      update,
      getSnapshot,
      restoreSnapshot,
      fetch: fetchData,
    };
  });
};
