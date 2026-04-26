<script lang="ts">
import type {
  DataTableColumn,
  TableFilter,
  DataTableFiltersProps,
} from "../../../types/data-table";
import { parseShorthand } from "../../../utils/parse-shorthand";
import { validateKeywords } from "../../../utils/validate-keywords";

type Suggestion = {
  label: string;
  value: string;
  disabled?: boolean;
  hasChildren?: boolean;
  type?: string;
  icon?: IconAlias;
};
</script>

<script setup lang="ts" generic="T, K = unknown">
const { table, pt } = defineProps<DataTableFiltersProps<T, K>>();

const {
  columns,
  filters,
  addFilter,
  removeFilter,
  query,
  keywords,
  page,
  selectedFacets,
  fetch: fetchData,
} = table;

const el = useTemplateRef("el");
const inputRef = useTemplateRef<{ el: HTMLInputElement }>("input");
defineExpose({ el });

const inputValue = ref("");
const helpOpen = ref(false);
const focused = ref(false);
const highlightIndex = ref(0);

// Passthrough
const rootPT = usePassthrough(pt?.root, { props: {}, handlers: {} });
const chipsPT = usePassthrough(pt?.chips, { props: {}, handlers: {} });
const iconPT = usePassthrough(pt?.icon, {
  props: { alias: "sparkle" as IconAlias },
  handlers: {},
});
const inputWrapPT = usePassthrough(pt?.inputWrap, { props: {}, handlers: {} });
const mirrorWrapPT = usePassthrough(pt?.mirrorWrap, {
  props: {},
  handlers: {},
});
const mirrorTextPT = usePassthrough(pt?.mirrorText, {
  props: {},
  handlers: {},
});
const mirrorHintPT = usePassthrough(pt?.mirrorHint, {
  props: {},
  handlers: {},
});
const inputPT = usePassthrough(pt?.input, {
  props: { placeholder: "Filter..." },
  handlers: {},
});
const dropdownPT = usePassthrough(pt?.dropdown, { props: {}, handlers: {} });
const dropdownPanelPT = usePassthrough(pt?.dropdownPanel, {
  props: {},
  handlers: {},
});
const dropdownScrollerPT = usePassthrough(pt?.dropdownScroller, {
  props: {},
  handlers: {},
});
const dropdownEmptyPT = usePassthrough(pt?.dropdownEmpty, {
  props: {},
  handlers: {},
});
const infoIconPT = usePassthrough(pt?.infoIcon, {
  props: { alias: "info" as IconAlias },
  handlers: {},
});
const dialogPT = usePassthrough(pt?.dialog, () => ({
  props: {
    open: helpOpen.value,
    title: "Filter Shortcuts",
    description: "Use these shortcuts in the filter input",
  },
  handlers: {
    "update:open": (v: boolean) => {
      helpOpen.value = v;
    },
  },
}));
const helpTablePT = usePassthrough(pt?.helpTable, { props: {}, handlers: {} });
const helpTheadPT = usePassthrough(pt?.helpThead, { props: {}, handlers: {} });
const helpTbodyPT = usePassthrough(pt?.helpTbody, { props: {}, handlers: {} });
const helpThPT = usePassthrough(pt?.helpTh, { props: {}, handlers: {} });
const helpTdPT = usePassthrough(pt?.helpTd, { props: {}, handlers: {} });
const helpKbdPT = usePassthrough(pt?.helpKbd, { props: {}, handlers: {} });

// Locked steps — each entry is a locked selection
const lockedSteps = ref<
  { label: string; value: string; icon?: IconAlias; hasChildren?: boolean }[]
>([]);
const lockedField = ref<DataTableColumn<T> | null>(null);
const lockedOperator = ref<string | null>(null);
const lockedDate1 = ref<string | null>(null);

// Column groups
const enumColumns = computed(() =>
  (columns as DataTableColumn<T>[]).filter(
    (c) => c.type === "enum" && c.enumValues?.length,
  ),
);

const dateColumns = computed(() =>
  (columns as DataTableColumn<T>[]).filter(
    (c) => c.type === "date" || c.type === "datetime",
  ),
);

// Generate recent dates
const recentDates = computed(() => {
  const dates: { label: string; value: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const value = `${y}-${m}-${day}`;
    const label = i === 0 ? `${value} (today)` : value;
    dates.push({ label, value });
  }
  return dates;
});

// Locked prefix for input tracking
const lockedPrefix = computed(() => {
  if (!lockedField.value) return "";
  const fieldLabel = lockedField.value.label;
  if (lockedField.value.type === "enum") return `${fieldLabel}=`;
  if (lockedOperator.value === "><" && lockedDate1.value)
    return `${fieldLabel}><${lockedDate1.value},`;
  if (lockedOperator.value) return `${fieldLabel}${lockedOperator.value}`;
  return fieldLabel;
});

const activeText = computed(() => {
  if (lockedPrefix.value && inputValue.value.startsWith(lockedPrefix.value)) {
    return inputValue.value.slice(lockedPrefix.value.length);
  }
  return inputValue.value;
});

const isRawMode = computed(
  () => inputValue.value.startsWith('"') || inputValue.value.startsWith("("),
);

const closingHint = computed(() => {
  const v = inputValue.value;
  if (v.startsWith('"') && (v.length === 1 || !v.endsWith('"'))) return '"';
  if (v.startsWith("(") && !v.endsWith(")")) return ")";
  return "";
});

// Phase detection
const phase = computed(() => {
  if (!lockedField.value) return "field";
  if (lockedField.value.type === "enum") return "enum-value";
  if (!lockedOperator.value) return "date-operator";
  if (lockedOperator.value === "><" && !lockedDate1.value) return "date-value";
  if (lockedOperator.value === "><" && lockedDate1.value) return "date-value-2";
  return "date-value";
});

// Already selected enum values
const selectedValues = computed(() => {
  if (!lockedField.value) return new Set<string>();
  const fieldKey = String(lockedField.value.key);
  const set = new Set<string>();
  for (const f of filters.value) {
    if (f.field === fieldKey && f.value.type === "enum") {
      for (const v of f.value.value) set.add(v);
    }
  }
  return set;
});

// Build the active (last) panel suggestions
const activePanelSuggestions = computed<Suggestion[]>(() => {
  if (!focused.value || isRawMode.value) return [];
  const search = activeText.value.toLowerCase();

  if (phase.value === "field") {
    const items: Suggestion[] = [];
    if (!search || "search".includes(search)) {
      items.push({
        label: "Search",
        value: "__search",
        type: "shortcut",
        icon: "search",
      });
    }
    if (!search || "keywords".includes(search)) {
      items.push({
        label: "Keywords",
        value: "__keywords",
        type: "shortcut",
        icon: "tag",
      });
    }
    for (const c of enumColumns.value) {
      if (!search || c.label.toLowerCase().includes(search)) {
        items.push({
          label: c.label,
          value: String(c.key),
          hasChildren: true,
          icon: "filter",
        });
      }
    }
    for (const c of dateColumns.value) {
      if (!search || c.label.toLowerCase().includes(search)) {
        items.push({
          label: c.label,
          value: String(c.key),
          hasChildren: true,
          type: "date",
          icon: "calendar",
        });
      }
    }
    return items;
  }

  if (phase.value === "enum-value" && lockedField.value?.enumValues) {
    return lockedField.value.enumValues
      .filter((v) => !search || v.toLowerCase().includes(search))
      .map((v) => ({
        label: v,
        value: v,
        disabled: selectedValues.value.has(v),
      }));
  }

  if (phase.value === "date-operator") {
    return [
      { label: "After", value: ">", hasChildren: true },
      { label: "Before", value: "<", hasChildren: true },
      { label: "Between", value: "><", hasChildren: true },
    ].filter((o) => !search || o.label.toLowerCase().includes(search));
  }

  if (phase.value === "date-value" || phase.value === "date-value-2") {
    const isBetweenFirst =
      phase.value === "date-value" && lockedOperator.value === "><";
    const isSecondDate = phase.value === "date-value-2";
    return recentDates.value
      .filter((d) => !search || d.value.includes(search))
      .map((d) => ({
        label: d.label,
        value: d.value,
        hasChildren: isBetweenFirst,
        disabled: isSecondDate && d.value === lockedDate1.value,
      }));
  }

  return [];
});

// Whether to show empty state in the last panel
const showEmptyState = computed(
  () =>
    focused.value &&
    !isRawMode.value &&
    lockedSteps.value.length > 0 &&
    activePanelSuggestions.value.length === 0 &&
    activeText.value.length > 0,
);

// All panels: locked steps (each as single-item panel) + active panel
const panels = computed(() => {
  if (!focused.value || isRawMode.value) return [];
  const result: Suggestion[][] = [];
  for (const step of lockedSteps.value) {
    result.push([{ ...step, hasChildren: true }]);
  }
  if (activePanelSuggestions.value.length) {
    result.push(activePanelSuggestions.value);
  }
  return result;
});

const activePanel = computed(() =>
  panels.value.length ? panels.value[panels.value.length - 1]! : [],
);

watch(activePanel, (items) => {
  // For second date in Between, start one past the first date (which is disabled)
  if (phase.value === "date-value-2" && lockedDate1.value) {
    const idx = items.findIndex((i) => i.value === lockedDate1.value);
    const next = idx >= 0 ? idx + 1 : 0;
    highlightIndex.value = next < items.length ? next : 0;
    return;
  }
  let idx = 0;
  while (idx < items.length && items[idx]?.disabled) idx++;
  highlightIndex.value = idx < items.length ? idx : 0;
});

// Actions
const selectField = (col: DataTableColumn<T>) => {
  lockedField.value = col;
  lockedOperator.value = null;
  const icon =
    col.type === "enum" ? ("filter" as IconAlias) : ("calendar" as IconAlias);
  lockedSteps.value = [{ label: col.label, value: String(col.key), icon }];
  if (col.type === "enum") {
    inputValue.value = `${col.label}=`;
  } else {
    inputValue.value = `${col.label}`;
  }
  nextTick(() => inputRef.value?.el?.focus());
};

const operatorLabels: Record<string, string> = {
  ">": "After",
  "<": "Before",
  "><": "Between",
};

const selectDateOperator = (op: string) => {
  if (!lockedField.value) return;
  lockedOperator.value = op;
  lockedSteps.value = [
    ...lockedSteps.value,
    { label: operatorLabels[op] ?? op, value: op, hasChildren: true },
  ];
  inputValue.value = `${lockedField.value.label}${op}`;
  nextTick(() => inputRef.value?.el?.focus());
};

const selectValue = (value: string) => {
  if (!lockedField.value) return;

  if (lockedField.value.type === "enum") {
    addFilter({
      field: String(lockedField.value.key),
      operator: "is",
      value: { type: "enum", value: [value] },
    });
    resetAutocomplete();
    return;
  }

  if (lockedOperator.value === "><") {
    if (!lockedDate1.value) {
      // First date of Between — lock it and move to second date
      lockedDate1.value = value;
      lockedSteps.value = [
        ...lockedSteps.value,
        { label: value, value, hasChildren: true },
      ];
      inputValue.value = `${lockedField.value.label}><${value},`;
      nextTick(() => inputRef.value?.el?.focus());
      return;
    }
    // Second date of Between — submit
    const dates = [lockedDate1.value, value].sort();
    table.addDateFilter({
      field: String(lockedField.value.key),
      operator: "between",
      value: new Date(dates[0]! + "T00:00:00Z"),
      endValue: new Date(dates[1]! + "T00:00:00Z"),
    });
    resetAutocomplete();
    return;
  }

  if (lockedOperator.value) {
    const date = new Date(value + "T00:00:00Z");
    table.addDateFilter({
      field: String(lockedField.value.key),
      operator: lockedOperator.value === ">" ? "after" : "before",
      value: date,
    });
    resetAutocomplete();
  }
};

const selectSuggestion = (item: Suggestion) => {
  if (item.disabled) return;

  if (item.value === "__search") {
    inputValue.value = '"';
    return;
  }
  if (item.value === "__keywords") {
    inputValue.value = "(";
    return;
  }

  if (lockedField.value) {
    if (phase.value === "date-operator") {
      selectDateOperator(item.value);
    } else {
      selectValue(item.value);
    }
    return;
  }

  const allCols = columns as DataTableColumn<T>[];
  const col = allCols.find((c) => String(c.key) === item.value);
  if (col) selectField(col);
};

const unwindToPanel = (panelIndex: number) => {
  if (panelIndex === 0) {
    // Back to field selection
    lockedField.value = null;
    lockedOperator.value = null;
    lockedDate1.value = null;
    lockedSteps.value = [];
    inputValue.value = "";
  } else if (panelIndex === 1 && lockedField.value) {
    // Back to operator/value selection (keep field locked)
    lockedOperator.value = null;
    lockedDate1.value = null;
    lockedSteps.value = lockedSteps.value.slice(0, 1);
    inputValue.value =
      lockedField.value.type === "enum"
        ? `${lockedField.value.label}=`
        : `${lockedField.value.label}`;
  } else if (panelIndex === 2 && lockedField.value && lockedOperator.value) {
    // Back to first date value (keep field + operator locked)
    lockedDate1.value = null;
    lockedSteps.value = lockedSteps.value.slice(0, 2);
    inputValue.value = `${lockedField.value.label}${lockedOperator.value}`;
  }
  nextTick(() => inputRef.value?.el?.focus());
};

const resetAutocomplete = () => {
  inputValue.value = "";
  lockedField.value = null;
  lockedOperator.value = null;
  lockedDate1.value = null;
  lockedSteps.value = [];
  highlightIndex.value = 0;
};

// Input handler
const onInput = (event: Event) => {
  const raw = (event.target as HTMLInputElement).value;
  inputValue.value = raw;

  // Auto-submit on closing character
  if (raw.startsWith('"') && raw.endsWith('"') && raw.length > 2) {
    query.value = raw.slice(1, -1);
    page.value = 1;
    fetchData();
    resetAutocomplete();
    return;
  }
  if (raw.startsWith("(") && raw.endsWith(")") && raw.length > 2) {
    const kw = raw.slice(1, -1);
    if (validateKeywords(kw)) {
      keywords.value = kw;
      page.value = 1;
      fetchData();
      resetAutocomplete();
    }
    return;
  }

  if (lockedField.value) {
    if (!raw.startsWith(lockedPrefix.value)) {
      if (lockedDate1.value) {
        lockedDate1.value = null;
        lockedSteps.value = lockedSteps.value.slice(0, 2);
      } else if (lockedOperator.value) {
        lockedOperator.value = null;
        lockedSteps.value = lockedSteps.value.slice(0, 1);
      } else {
        lockedField.value = null;
        lockedSteps.value = [];
      }
    }
  }

  if (!lockedField.value) {
    const eqIndex = raw.indexOf("=");
    if (eqIndex > 0) {
      const fieldText = raw.slice(0, eqIndex);
      const col = enumColumns.value.find(
        (c) => c.label.toLowerCase() === fieldText.toLowerCase(),
      );
      if (col) {
        lockedField.value = col;
        lockedSteps.value = [
          { label: col.label, value: String(col.key), icon: "filter" },
        ];
        inputValue.value = `${col.label}=${raw.slice(eqIndex + 1)}`;
      }
    }

    const opMatch = raw.match(/^([^><]+)([><])(.*)$/);
    if (opMatch) {
      const [, fieldText, op, rest] = opMatch;
      const col = dateColumns.value.find(
        (c) => c.label.toLowerCase() === fieldText!.toLowerCase(),
      );
      if (col) {
        lockedField.value = col;
        lockedOperator.value = op!;
        lockedSteps.value = [
          { label: col.label, value: String(col.key), icon: "calendar" },
          { label: op === ">" ? "> After" : "< Before", value: op! },
        ];
        inputValue.value = `${col.label}${op}${rest}`;
      }
    }
  }

  if (!lockedField.value) {
    const allFilterable = [...enumColumns.value, ...dateColumns.value];
    const search = raw.toLowerCase();
    const exactMatch = allFilterable.find(
      (c) => c.label.toLowerCase() === search,
    );
    if (exactMatch && activePanelSuggestions.value.length === 1) {
      selectField(exactMatch);
    }
  }
};

// Scroll highlighted item into view
watch(highlightIndex, () => {
  nextTick(() => {
    const container = el.value?.$el ?? el.value;
    const highlighted = (container as HTMLElement | undefined)?.querySelector(
      ".f-data-table-filters-dropdown-item--highlighted",
    );
    highlighted?.scrollIntoView({ block: "nearest" });
  });
});

// Keyboard navigation
const onKeydown = (event: KeyboardEvent) => {
  const hasDropdown = panels.value.length > 0;
  if (hasDropdown) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      let next = highlightIndex.value + 1;
      while (
        next < activePanel.value.length &&
        activePanel.value[next]?.disabled
      )
        next++;
      if (next < activePanel.value.length) highlightIndex.value = next;
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      let next = highlightIndex.value - 1;
      while (next >= 0 && activePanel.value[next]?.disabled) next--;
      if (next >= 0) highlightIndex.value = next;
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      // Only select from the suggestions panel, not from locked step panels
      if (activePanelSuggestions.value.length) {
        const item = activePanelSuggestions.value[highlightIndex.value];
        if (item && !item.disabled) selectSuggestion(item);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      resetAutocomplete();
      inputRef.value?.el?.blur();
      return;
    }
  }

  if (event.key === "Enter") {
    if (
      inputValue.value.startsWith('"') &&
      inputValue.value.endsWith('"') &&
      inputValue.value.length > 2
    ) {
      query.value = inputValue.value.slice(1, -1);
      page.value = 1;
      fetchData();
      resetAutocomplete();
      return;
    }
    if (
      inputValue.value.startsWith("(") &&
      inputValue.value.endsWith(")") &&
      inputValue.value.length > 2
    ) {
      const kw = inputValue.value.slice(1, -1);
      if (!validateKeywords(kw)) return;
      keywords.value = kw;
      page.value = 1;
      fetchData();
      resetAutocomplete();
      return;
    }
    const result = parseShorthand(
      inputValue.value,
      columns as DataTableColumn<T>[],
    );
    if (result) {
      addFilter(result.filter);
      resetAutocomplete();
    }
  }

  if (event.key === "Escape") {
    resetAutocomplete();
    inputRef.value?.el?.blur();
  }

  if (event.key === "Backspace") {
    if (lockedField.value) {
      // Between: backspace from second date
      if (lockedDate1.value) {
        const prefix = lockedPrefix.value;
        if (inputValue.value === prefix) {
          event.preventDefault();
          lockedDate1.value = null;
          lockedSteps.value = lockedSteps.value.slice(0, 2);
          inputValue.value = `${lockedField.value.label}${lockedOperator.value}`;
        }
      } else if (lockedOperator.value) {
        const prefix = `${lockedField.value.label}${lockedOperator.value}`;
        if (inputValue.value === prefix) {
          event.preventDefault();
          lockedOperator.value = null;
          lockedSteps.value = lockedSteps.value.slice(0, 1);
          inputValue.value = prefix.slice(0, -1);
        }
      } else {
        const prefix = lockedPrefix.value;
        if (inputValue.value === prefix) {
          event.preventDefault();
          lockedField.value = null;
          lockedSteps.value = [];
          inputValue.value = prefix.slice(0, -2);
        }
      }
    } else if (!inputValue.value && filters.value.length) {
      event.preventDefault();
      const lastFilter = filters.value[filters.value.length - 1]!;

      // Enum — peel off the last value and unravel it
      if (lastFilter.value.type === "enum") {
        const col = (columns as DataTableColumn<T>[]).find(
          (c) => String(c.key) === lastFilter.field,
        );
        if (col) {
          const values = [...lastFilter.value.value];
          const lastVal = values.pop()!;
          // Remove the last value from selectedFacets
          const namespacedKey = `${lastFilter.field}:${lastVal}`;
          selectedFacets.value = new Set(
            [...selectedFacets.value].filter((v) => v !== namespacedKey),
          );
          // Unravel into input
          lockedField.value = col;
          lockedSteps.value = [
            { label: col.label, value: String(col.key), icon: "filter" },
          ];
          inputValue.value = `${col.label}=${lastVal.slice(0, -1)}`;
          return;
        }
      }

      // Date filter — unravel into input
      if (lastFilter.value.type === "date") {
        const col = (columns as DataTableColumn<T>[]).find(
          (c) => String(c.key) === lastFilter.field,
        );
        if (col) {
          const op = lastFilter.operator === "before" ? "<" : ">";
          const dateStr = formatDate(lastFilter.value.value);
          removeFilter(filters.value.length - 1);
          lockedField.value = col;
          lockedOperator.value = op;
          lockedSteps.value = [
            { label: col.label, value: String(col.key), icon: "calendar" },
            {
              label: op === ">" ? "After" : "Before",
              value: op,
              hasChildren: true,
            },
          ];
          inputValue.value = `${col.label}${op}${dateStr.slice(0, -1)}`;
          return;
        }
      }

      // Date range filter — unravel the second date
      if (lastFilter.value.type === "date_range") {
        const col = (columns as DataTableColumn<T>[]).find(
          (c) => String(c.key) === lastFilter.field,
        );
        if (col) {
          const date1 = formatDate(lastFilter.value.value[0]);
          const date2 = formatDate(lastFilter.value.value[1]);
          removeFilter(filters.value.length - 1);
          lockedField.value = col;
          lockedOperator.value = "><";
          lockedDate1.value = date1;
          lockedSteps.value = [
            { label: col.label, value: String(col.key), icon: "calendar" },
            { label: "Between", value: "><", hasChildren: true },
            { label: date1, value: date1, hasChildren: true },
          ];
          inputValue.value = `${col.label}><${date1},${date2.slice(0, -1)}`;
          return;
        }
      }

      // Query — unravel (just remove the closing ")
      if (lastFilter.field === "__query" && lastFilter.value.type === "text") {
        const val = lastFilter.value.value;
        removeFilter(filters.value.length - 1);
        inputValue.value = `"${val}`;
        return;
      }

      // Keywords — unravel (just remove the closing ))
      if (
        lastFilter.field === "__keywords" &&
        lastFilter.value.type === "text"
      ) {
        const val = lastFilter.value.value;
        removeFilter(filters.value.length - 1);
        inputValue.value = `(${val}`;
        return;
      }

      // Fallback
      removeFilter(filters.value.length - 1);
    }
  }
};

const onBlur = () => {
  window.setTimeout(() => {
    focused.value = false;
  }, 150);
};

const keys = useMagicKeys();
const combo = computed(() => keys["Meta+/"]?.value || keys["Ctrl+/"]?.value);
whenever(combo, () => {
  inputRef.value?.el?.focus();
});

const formatDate = (d: Date) => {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const formatFilter = (filter: TableFilter) => {
  if (filter.field === "__query" && filter.value.type === "text") {
    return `"${filter.value.value}"`;
  }
  if (filter.field === "__keywords" && filter.value.type === "text") {
    return `(${filter.value.value})`;
  }
  const col = columns.find((c) => String(c.key) === filter.field);
  const label = col?.label ?? filter.field;
  const v = filter.value;
  switch (v.type) {
    case "text":
      return `${label}=${v.value}`;
    case "number":
      return `${label}${filter.operator === "eq" ? "=" : filter.operator === "gt" ? ">" : "<"}${v.value}`;
    case "number_range":
      return `${label}><${v.value[0]},${v.value[1]}`;
    case "date":
      return `${label}${filter.operator === "before" ? "<" : ">"}${formatDate(v.value)}`;
    case "date_range":
      return `${label}><${formatDate(v.value[0])},${formatDate(v.value[1])}`;
    case "enum":
      return `${label}=${v.value.join(",")}`;
    case "boolean":
      return `${label}=${v.value}`;
  }
};

const helpRows = computed(() => {
  const rows = [
    { syntax: '"your query here"', description: "Semantic search" },
    { syntax: "(+include -exclude)", description: "Keyword search (AND)" },
    { syntax: "(+term1 || +term2)", description: "Keyword search (OR)" },
  ];
  for (const col of columns as DataTableColumn<T>[]) {
    if (col.type === "enum" && col.enumValues) {
      rows.push({
        syntax: `${col.label}=${col.enumValues[0] ?? "value"}`,
        description: `Filter by ${col.label}`,
      });
    }
    if (col.type === "date" || col.type === "datetime") {
      rows.push({
        syntax: `${col.label}>2025-01-01`,
        description: `${col.label} after date`,
      });
      rows.push({
        syntax: `${col.label}<2025-01-01`,
        description: `${col.label} before date`,
      });
    }
  }
  return rows;
});
</script>

<template>
  <Group
    ref="el"
    v-bind="rootPT.props"
    class="f-data-table-filters"
    v-on="rootPT.handlers"
  >
    <Group
      v-bind="chipsPT.props"
      class="f-data-table-filters-chips"
      v-on="chipsPT.handlers"
    >
      <Icon
        v-bind="iconPT.props"
        class="f-data-table-filters-icon"
        v-on="iconPT.handlers"
      />
      <Chip
        v-for="(filter, index) in filters"
        :key="index"
        v-bind="
          passthrough(pt?.chip, {
            props: { label: formatFilter(filter), closable: true },
            handlers: {},
          }).props
        "
        @click="removeFilter(index)"
      />
      <Group
        v-bind="inputWrapPT.props"
        class="f-data-table-filters-input-wrap"
        v-on="inputWrapPT.handlers"
      >
        <ClientOnly>
          <Group
            v-show="closingHint"
            v-bind="mirrorWrapPT.props"
            class="f-data-table-filters-mirror"
            aria-hidden="true"
            v-on="mirrorWrapPT.handlers"
          >
            <Span
              v-bind="mirrorTextPT.props"
              class="f-data-table-filters-mirror-text"
              v-on="mirrorTextPT.handlers"
              >{{ inputValue }}</Span
            >
            <Span
              v-bind="mirrorHintPT.props"
              class="f-data-table-filters-mirror-hint"
              v-on="mirrorHintPT.handlers"
              >{{ closingHint }}</Span
            >
          </Group>
        </ClientOnly>
        <Input
          ref="input"
          v-bind="inputPT.props"
          :value="inputValue"
          :class="[
            'f-data-table-filters-input',
            { 'f-data-table-filters-input--ghost': closingHint },
          ]"
          @input="onInput"
          @keydown="onKeydown"
          @focus="focused = true"
          @blur="onBlur"
        />
        <Group
          v-if="panels.length || showEmptyState"
          v-bind="dropdownPT.props"
          class="f-data-table-filters-dropdown"
          v-on="dropdownPT.handlers"
        >
          <Group
            v-for="(panel, panelIndex) in panels"
            :key="panelIndex"
            v-bind="dropdownPanelPT.props"
            class="f-data-table-filters-dropdown-panel"
            v-on="dropdownPanelPT.handlers"
          >
            <Scroller
              v-bind="dropdownScrollerPT.props"
              v-on="dropdownScrollerPT.handlers"
            >
              <template #content>
              <Button
                v-for="(item, i) in panel"
                :key="item.value"
                v-bind="
                  passthrough(pt?.dropdownItem, {
                    props: { disabled: item.disabled },
                    handlers: {},
                  }).props
                "
                :class="[
                  'f-data-table-filters-dropdown-item',
                  {
                    'f-data-table-filters-dropdown-item--highlighted':
                      panelIndex === panels.length - 1 && i === highlightIndex,
                  },
                  {
                    'f-data-table-filters-dropdown-item--locked':
                      panel.length === 1 && panelIndex < panels.length - 1,
                  },
                  {
                    'f-data-table-filters-dropdown-item--disabled':
                      item.disabled,
                  },
                ]"
                @mousedown.prevent="
                  panelIndex < panels.length - 1
                    ? unwindToPanel(panelIndex)
                    : !item.disabled && selectSuggestion(item)
                "
              >
                <Icon
                  v-if="item.icon"
                  v-bind="
                    passthrough(pt?.dropdownItemIcon, {
                      props: { alias: item.icon },
                      handlers: {},
                    }).props
                  "
                  class="f-data-table-filters-dropdown-item-icon"
                />
                <Span
                  v-bind="
                    passthrough(pt?.dropdownItemLabel, {
                      props: {},
                      handlers: {},
                    }).props
                  "
                  class="f-data-table-filters-dropdown-item-label"
                  >{{ item.label }}</Span
                >
                <Icon
                  v-if="item.hasChildren"
                  v-bind="
                    passthrough(pt?.dropdownItemArrow, {
                      props: { alias: 'chevron-right' as IconAlias },
                      handlers: {},
                    }).props
                  "
                  class="f-data-table-filters-dropdown-item-arrow"
                />
              </Button>
              </template>
            </Scroller>
          </Group>
          <Group
            v-if="showEmptyState"
            v-bind="dropdownPanelPT.props"
            class="f-data-table-filters-dropdown-panel"
            v-on="dropdownPanelPT.handlers"
          >
            <Span
              v-bind="dropdownEmptyPT.props"
              class="f-data-table-filters-dropdown-empty"
              v-on="dropdownEmptyPT.handlers"
              >No matches</Span
            >
          </Group>
        </Group>
      </Group>
      <Icon
        v-bind="infoIconPT.props"
        class="f-data-table-filters-info"
        v-on="infoIconPT.handlers"
        @click="helpOpen = true"
      />
    </Group>

    <Dialog v-bind="dialogPT.props" v-on="dialogPT.handlers">
      <Table v-bind="helpTablePT.props" v-on="helpTablePT.handlers">
        <Thead v-bind="helpTheadPT.props" v-on="helpTheadPT.handlers">
          <Tr>
            <Th v-bind="helpThPT.props" v-on="helpThPT.handlers">Syntax</Th>
            <Th v-bind="helpThPT.props" v-on="helpThPT.handlers"
              >Description</Th
            >
          </Tr>
        </Thead>
        <Tbody v-bind="helpTbodyPT.props" v-on="helpTbodyPT.handlers">
          <Tr v-for="row in helpRows" :key="row.syntax">
            <Td v-bind="helpTdPT.props" v-on="helpTdPT.handlers"
              ><Kbd v-bind="helpKbdPT.props" v-on="helpKbdPT.handlers">{{
                row.syntax
              }}</Kbd></Td
            >
            <Td v-bind="helpTdPT.props" v-on="helpTdPT.handlers">{{
              row.description
            }}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Dialog>
  </Group>
</template>
