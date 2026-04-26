/**
 * Injection key for pre-fetched widget configs.
 * Pages provide this. Widgets inject and validate their own slice.
 */
export const WIDGET_CONFIGS: InjectionKey<Record<string, unknown>> =
  Symbol("WIDGET_CONFIGS");

export const createTable = <T, K = unknown>(
  id: string,
  config: DataTableConfig<T, K>,
) => {
  return (): Table<T, K> => {
    // Resolve defaults: inject pre-fetched configs, validate with zod defaults
    const configs = inject(WIDGET_CONFIGS, {});
    const raw = configs[id];
    const defaults = DataTableSnapshotSchema.parse(raw ?? {});

    // Initialization
    const initialized = useState<boolean>(
      `table-${id}-initialized`,
      () => false,
    );

    // State
    const data = useState<T[]>(`table-${id}-data`, () => []);
    const loading = useState<boolean>(`table-${id}-loading`, () => false);
    const page = useState<number>(`table-${id}-page`, () => defaults.page);
    const pageSize = useState<number>(
      `table-${id}-pageSize`,
      () => defaults.pageSize,
    );
    const total = useState<number>(`table-${id}-total`, () => 0);
    const pageCount = useState<number>(`table-${id}-pageCount`, () => 0);
    const sortField = useState<string | null>(
      `table-${id}-sortField`,
      () => defaults.sortField,
    );
    const sortDirection = useState<SortDirection>(
      `table-${id}-sortDirection`,
      () => defaults.sortDirection,
    );
    const query = useState<string>(`table-${id}-query`, () => defaults.query);
    const keywords = useState<string>(
      `table-${id}-keywords`,
      () => defaults.keywords,
    );
    const match = useState<MatchMode>(
      `table-${id}-match`,
      () => defaults.match,
    );
    const selectedFacets = useState<Set<string>>(
      `table-${id}-selectedFacets`,
      () => new Set(defaults.selectedFacets),
    );
    const facetGroups = useState<FacetGroup[]>(
      `table-${id}-facetGroups`,
      () => [],
    );
    const dateFilters = useState<DateFilter[]>(
      `table-${id}-dateFilters`,
      () => defaults.dateFilters,
    );
    const selected = useState<Set<K>>(`table-${id}-selected`, () => new Set());

    // Static config
    const columns = config.columns;
    const rowKey = config.rowKey;
    const actions = config.actions ?? [];
    const bulkActions = config.bulkActions ?? [];
    const pinnedColumns = config.pinnedColumns ?? [];
    const defaultColumnKeys = (
      config.defaultColumnOrder ?? columns.map((c) => c.key)
    ).map(String);

    // Column ordering
    const columnOrder = useState<string[]>(`table-${id}-columnOrder`, () =>
      defaults.columnOrder.length ? defaults.columnOrder : defaultColumnKeys,
    );

    const columnMap = new Map(columns.map((c) => [String(c.key), c]));

    const visibleColumns = computed(() =>
      columnOrder.value
        .map((key) => columnMap.get(key))
        .filter((c): c is DataTableColumn<T> => c !== undefined),
    );

    // Pagination
    const goToPage = (p: number) => {
      if (p < 1 || p > pageCount.value) return;
      page.value = p;
      fetchData();
    };

    // Sorting
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

    // Query/Keywords ordering
    watch(query, (val) => {
      if (val) touchFilterOrder("__query");
      else removeFilterOrder("__query");
    });

    watch(keywords, (val) => {
      if (val.trim()) touchFilterOrder("__keywords");
      else removeFilterOrder("__keywords");
    });

    // Facets
    watch(
      selectedFacets,
      (val, oldVal) => {
        // Determine which fields changed
        const oldFields = new Map<string, Set<string>>();
        for (const namespaced of oldVal ?? []) {
          const sep = namespaced.indexOf(":");
          if (sep === -1) continue;
          const field = namespaced.slice(0, sep);
          if (!oldFields.has(field)) oldFields.set(field, new Set());
          oldFields.get(field)!.add(namespaced);
        }

        const newFields = new Map<string, Set<string>>();
        for (const namespaced of val) {
          const sep = namespaced.indexOf(":");
          if (sep === -1) continue;
          const field = namespaced.slice(0, sep);
          if (!newFields.has(field)) newFields.set(field, new Set());
          newFields.get(field)!.add(namespaced);
        }

        // Touch only fields whose values changed
        for (const [field, values] of newFields) {
          const old = oldFields.get(field);
          if (
            !old ||
            old.size !== values.size ||
            ![...values].every((v) => old.has(v))
          ) {
            touchFilterOrder(`enum:${field}`);
          }
        }

        // Remove order for fields that were fully cleared
        for (const field of oldFields.keys()) {
          if (!newFields.has(field)) removeFilterOrder(`enum:${field}`);
        }

        page.value = 1;
        fetchData();
      },
      { deep: true },
    );

    const clearFacets = () => {
      selectedFacets.value = new Set();
      page.value = 1;
      fetchData();
    };

    // Date filters
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
      touchFilterOrder(`date:${filter.field}:${filter.operator}`);
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

    // Filter ordering — tracks insertion order by key
    const filterOrder = useState<string[]>(`table-${id}-filterOrder`, () => []);

    const touchFilterOrder = (key: string) => {
      filterOrder.value = [...filterOrder.value.filter((k) => k !== key), key];
    };

    const removeFilterOrder = (key: string) => {
      filterOrder.value = filterOrder.value.filter((k) => k !== key);
    };

    // Filters — computed view of underlying state, sorted by insertion order
    const filters = computed<TableFilter[]>(() => {
      const unordered: { key: string; filter: TableFilter }[] = [];

      if (query.value) {
        unordered.push({
          key: "__query",
          filter: {
            field: "__query",
            operator: "semantic",
            value: { type: "text", value: query.value },
          },
        });
      }

      if (keywords.value.trim()) {
        unordered.push({
          key: "__keywords",
          filter: {
            field: "__keywords",
            operator: "match",
            value: { type: "text", value: keywords.value },
          },
        });
      }

      if (selectedFacets.value.size) {
        const byField = new Map<string, string[]>();
        for (const namespaced of selectedFacets.value) {
          const sep = namespaced.indexOf(":");
          if (sep === -1) continue;
          const field = namespaced.slice(0, sep);
          const value = namespaced.slice(sep + 1);
          if (!byField.has(field)) byField.set(field, []);
          byField.get(field)!.push(value);
        }
        for (const [field, values] of byField) {
          unordered.push({
            key: `enum:${field}`,
            filter: {
              field,
              operator: "is",
              value: { type: "enum", value: values },
            },
          });
        }
      }

      for (const df of dateFilters.value) {
        const key = `date:${df.field}:${df.operator}`;
        if (df.operator === "between" && df.endValue) {
          unordered.push({
            key,
            filter: {
              field: df.field,
              operator: "between",
              value: { type: "date_range", value: [df.value, df.endValue] },
            },
          });
        } else {
          unordered.push({
            key,
            filter: {
              field: df.field,
              operator: df.operator,
              value: { type: "date", value: df.value },
            },
          });
        }
      }

      const order = filterOrder.value;
      return unordered
        .sort((a, b) => {
          const ai = order.indexOf(a.key);
          const bi = order.indexOf(b.key);
          // Items not in order go to the end
          if (ai === -1 && bi === -1) return 0;
          if (ai === -1) return 1;
          if (bi === -1) return -1;
          return ai - bi;
        })
        .map((e) => e.filter);
    });

    const addFilter = (filter: TableFilter) => {
      if (filter.value.type === "enum") {
        const existing = [...selectedFacets.value];
        const newValues = filter.value.value.map((v) => `${filter.field}:${v}`);
        selectedFacets.value = new Set([...existing, ...newValues]);
      }
      page.value = 1;
      fetchData();
    };

    const removeFilter = (index: number) => {
      const filter = filters.value[index];
      if (!filter) return;

      if (filter.field === "__query") {
        query.value = "";
      } else if (filter.field === "__keywords") {
        keywords.value = "";
      } else if (filter.value.type === "enum") {
        const toRemove = new Set(
          filter.value.value.map((v) => `${filter.field}:${v}`),
        );
        selectedFacets.value = new Set(
          [...selectedFacets.value].filter((v) => !toRemove.has(v)),
        );
      } else if (
        filter.value.type === "date" ||
        filter.value.type === "date_range"
      ) {
        dateFilters.value = dateFilters.value.filter(
          (f) => f.field !== filter.field,
        );
      }
      page.value = 1;
      fetchData();
    };

    const clearFilters = () => {
      query.value = "";
      keywords.value = "";
      selectedFacets.value = new Set();
      dateFilters.value = [];
      filterOrder.value = [];
      page.value = 1;
      fetchData();
    };

    // Selection
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
    const sortFieldFor = (col: DataTableColumn<T>) =>
      col.sortKey ?? String(col.key);
    const isSorted = (col: DataTableColumn<T>) =>
      sortField.value === sortFieldFor(col);
    const getSortIcon = (): IconAlias =>
      sortDirection.value === "asc" ? "chevron-up" : "chevron-down";
    const isRowSelected = (row: T) =>
      selected.value.has(row[config.rowKey] as K);
    const selectAllState = computed(() => {
      if (isIndeterminate.value) return "indeterminate" as const;
      return isAllSelected.value;
    });
    const colSpan = computed(
      () =>
        visibleColumns.value.length +
        (actions.length ? 1 : 0) +
        (bulkActions.length ? 1 : 0),
    );
    const dateColumns = computed(() =>
      columns.filter((c) => c.type === "date" || c.type === "datetime"),
    );

    // Column management
    const pinnedSet = new Set(pinnedColumns.map(String));
    const isColumnPinned = (key: keyof T) => pinnedSet.has(String(key));
    const isColumnVisible = (key: keyof T) =>
      columnOrder.value.includes(String(key));

    const toggleColumn = (key: keyof T) => {
      const k = String(key);
      if (pinnedSet.has(k)) return;
      if (columnOrder.value.includes(k)) {
        columnOrder.value = columnOrder.value.filter((c) => c !== k);
      } else {
        columnOrder.value = [...columnOrder.value, k];
      }
    };

    const reorderColumns = (order: string[]) => {
      columnOrder.value = order;
    };

    const resetColumns = () => {
      columnOrder.value = defaultColumnKeys;
    };

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
      if (payload.selectedFacets !== undefined)
        selectedFacets.value = payload.selectedFacets;
      if (payload.dateFilters !== undefined)
        dateFilters.value = payload.dateFilters;
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
      columnOrder: columnOrder.value,
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
      columnOrder.value = snapshot.columnOrder;
      fetchData();
    };

    // Init — idempotent, returns true for useAsyncData
    const init = async () => {
      if (initialized.value) return true;
      initialized.value = true;
      await fetchData();
      return true;
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
        pageCount.value = result.pageCount;
        if (result.facets) facetGroups.value = result.facets;
      } finally {
        loading.value = false;
        useNuxtApp().callHook("widget:table:snapshot", {
          id,
          snapshot: getSnapshot(),
        });
      }
    };

    return {
      data,
      loading,
      columns,
      rowKey,
      actions,
      bulkActions,
      pinnedColumns,
      columnOrder,
      visibleColumns,
      page,
      pageSize,
      pageCount,
      total,
      sortField,
      sortDirection,
      query,
      keywords,
      match,
      facetGroups,
      selectedFacets,
      dateFilters,
      filters,
      selected,
      isAllSelected,
      isIndeterminate,
      selectAllState,
      colSpan,
      dateColumns,
      goToPage,
      sortBy,
      clearFacets,
      addDateFilter,
      removeDateFilter,
      clearDateFilters,
      toggleRow,
      toggleAll,
      clearSelection,
      sortFieldFor,
      isSorted,
      getSortIcon,
      isRowSelected,
      addFilter,
      removeFilter,
      clearFilters,
      toggleColumn,
      reorderColumns,
      resetColumns,
      isColumnPinned,
      isColumnVisible,
      setPageSize,
      update,
      getSnapshot,
      restoreSnapshot,
      init,
      initialized,
      fetch: fetchData,
    };
  };
};
