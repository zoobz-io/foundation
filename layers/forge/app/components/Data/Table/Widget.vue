<script lang="ts">
import type { DataTableProps } from "../../../types/data-table";
</script>

<script setup lang="ts" generic="T, K = unknown">
const { table, pt } = defineProps<DataTableProps<T, K>>();

useLazyAsyncData("init-table", table.init, { server: false });

const el = useTemplateRef("el");
defineExpose({ el });

const {
  data,
  visibleColumns,
  actions,
  bulkActions,
  selected,
  colSpan,
  selectAllState,
  sortBy,
  sortFieldFor,
  isSorted,
  getSortIcon,
  toggleAll,
  toggleRow,
  isRowSelected,
  clearSelection,
  selectedFacets,
  query,
  keywords,
  dateFilters,
  page,
  fetch: fetchData,
} = table;

const getRowKey = (row: T) => row[table.rowKey] as K;

const { columnOrder, reorderColumns } = table;

const isSelectable = computed(() => bulkActions.length > 0);
const hasActions = computed(() => actions.length > 0);
const hasSelection = computed(() => selected.value.size > 0);

// Semantic search
const searchOpen = ref(false);
const searchInput = ref("");
const hasQuery = computed(() => !!query.value);

watch(searchOpen, (open) => {
  if (open) searchInput.value = query.value;
});

const searchDebounce = ref<ReturnType<typeof setTimeout> | null>(null);

watch(searchInput, (val) => {
  if (searchDebounce.value) clearTimeout(searchDebounce.value);
  searchDebounce.value = setTimeout(() => {
    query.value = val;
    page.value = 1;
    fetchData();
  }, 300);
});

const actionMenuGroups = computed(() => [
  {
    key: "actions",
    items: actions.map((a) => ({
      icon: a.icon,
      label: a.label,
    })),
  },
]);

const actionMap = new Map(actions.map((a) => [a.label, a]));

const onActionSelect = (row: T, item: { label: string }) => {
  actionMap.get(item.label)?.action(row);
};

const ctx = computed(() => ({ table }));

// Column header drag reorder
const draggableKey = ref<string | null>(null);
const dragKey = ref<string | null>(null);
const dropKey = ref<string | null>(null);

const onDragHandleEnter = (key: string) => {
  draggableKey.value = key;
};

const onDragHandleLeave = (key: string) => {
  if (!dragKey.value) {
    draggableKey.value = null;
  }
};

const onHeaderDragStart = (key: string, event: DragEvent) => {
  dragKey.value = key;
  dropKey.value = null;
  event.dataTransfer!.effectAllowed = "move";
};

const onHeaderDragOver = (key: string, event: DragEvent) => {
  event.preventDefault();
  if (!dragKey.value || dragKey.value === key) return;
  dropKey.value = key;
};

const dropDirection = computed(() => {
  if (!dragKey.value || !dropKey.value) return null;
  const order = columnOrder.value;
  const fromIdx = order.indexOf(dragKey.value);
  const toIdx = order.indexOf(dropKey.value);
  if (fromIdx === -1 || toIdx === -1) return null;
  return fromIdx < toIdx ? "right" : "left";
});

const onHeaderDragLeave = () => {
  dropKey.value = null;
};

const onHeaderDrop = (key: string, event: DragEvent) => {
  event.preventDefault();
  if (!dragKey.value || dragKey.value === key) return;

  const order = [...columnOrder.value];
  const fromIdx = order.indexOf(dragKey.value);
  const toIdx = order.indexOf(key);
  if (fromIdx === -1 || toIdx === -1) return;

  order.splice(fromIdx, 1);
  order.splice(toIdx, 0, dragKey.value);
  reorderColumns(order);
};

const onHeaderDragEnd = () => {
  dragKey.value = null;
  dropKey.value = null;
  draggableKey.value = null;
};

const formatCell = (value: unknown, type?: ColumnType) => {
  if (value == null) return "";
  switch (type) {
    case "date":
      return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(String(value)),
      );
    case "datetime":
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(String(value)));
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Number(value));
    case "number":
      return new Intl.NumberFormat("en-US").format(Number(value));
    case "boolean":
      return value ? "Yes" : "No";
    default:
      return String(value);
  }
};

// Passthrough
const rootPT = usePassthrough(pt?.root, { props: {}, handlers: {} });
const toolbarPT = usePassthrough(pt?.toolbar, { props: {}, handlers: {} });
const searchPopoverPT = usePassthrough(pt?.searchPopover, () => ({
  props: { open: searchOpen.value, align: "end" as const },
  handlers: {
    "update:open": (v: boolean) => {
      searchOpen.value = v;
    },
  },
}));
const searchTriggerPT = usePassthrough(pt?.searchTrigger, () => ({
  props: {
    icon: "search" as IconAlias,
    badge: hasQuery.value ? "" : undefined,
  },
  handlers: {},
}));
const searchWrapPT = usePassthrough(pt?.searchWrap, {
  props: {},
  handlers: {},
});
const searchInputPT = usePassthrough(pt?.searchInput, {
  props: { placeholder: "Search..." },
  handlers: {},
});
const namespacedFacetGroups = computed(() =>
  table.facetGroups.value.map((g) => ({
    ...g,
    items: g.items.map((item) => ({
      ...item,
      value: `${g.key}:${item.value}`,
    })),
  })),
);
const dateFieldConfigs = computed(() =>
  table.dateColumns.value.map((c) => ({
    key: String(c.key),
    label: c.label,
  })),
);
const keywordsPT = usePassthrough(pt?.keywords, { props: {}, handlers: {} });
const facetsPT = usePassthrough(pt?.facets, () => ({
  props: { groups: namespacedFacetGroups.value },
  handlers: {},
}));
const dateFiltersPT = usePassthrough(pt?.dateFilters, () => ({
  props: {
    fields: dateFieldConfigs.value,
    addFilter: table.addDateFilter,
    removeFilter: table.removeDateFilter,
  },
  handlers: {},
}));
const bulkActionsPT = usePassthrough(pt?.bulkActions, {
  props: {},
  handlers: {},
});
const bulkActionsCountPT = usePassthrough(pt?.bulkActionsCount, {
  props: {},
  handlers: {},
});
const bulkActionClearPT = usePassthrough(pt?.bulkActionClear, {
  props: {},
  handlers: {},
});
const scrollerPT = usePassthrough(pt?.scroller, { props: {}, handlers: {} });
const tablePT = usePassthrough(pt?.table, { props: {}, handlers: {} });
const theadPT = usePassthrough(pt?.thead, { props: {}, handlers: {} });
const theadTrPT = usePassthrough(pt?.theadTr, { props: {}, handlers: {} });
const selectAllCheckboxPT = usePassthrough(pt?.selectAllCheckbox, () => ({
  props: { modelValue: selectAllState.value },
  handlers: { "update:modelValue": () => toggleAll() },
}));
const headerWrapPT = usePassthrough(pt?.headerWrap, {
  props: {},
  handlers: {},
});
const headerLabelPT = usePassthrough(pt?.headerLabel, {
  props: {},
  handlers: {},
});
const tbodyPT = usePassthrough(pt?.tbody, { props: {}, handlers: {} });
const emptyPT = usePassthrough(pt?.empty, { props: {}, handlers: {} });
const actionsMenuPT = usePassthrough(pt?.actionsMenu, () => ({
  props: { groups: actionMenuGroups.value, align: "end" as const },
  handlers: {},
}));
const actionsTriggerPT = usePassthrough(pt?.actionsTrigger, {
  props: { icon: "actions" as IconAlias },
  handlers: {},
});
const paginationPT = usePassthrough(pt?.pagination, () => ({
  props: {
    page: table.page.value,
    pageSize: table.pageSize.value,
    pageCount: table.pageCount.value,
    total: table.total.value,
    goToPage: table.goToPage,
  },
  handlers: {
    "update:pageSize": table.setPageSize,
  },
}));
</script>

<template>
  <Group
    ref="el"
    v-bind="rootPT.props"
    class="f-data-table"
    v-on="rootPT.handlers"
  >
    <slot name="toolbar" v-bind="ctx">
      <Group
        v-bind="toolbarPT.props"
        class="f-data-table-toolbar"
        v-on="toolbarPT.handlers"
      >
        <DataTableFilters :table="table" :pt="pt?.filters" />
        <Popover v-bind="searchPopoverPT.props" v-on="searchPopoverPT.handlers">
          <template #trigger>
            <Fab v-bind="searchTriggerPT.props" v-on="searchTriggerPT.handlers" />
          </template>
          <template #content>
            <Group
              v-bind="searchWrapPT.props"
              class="f-data-table-search"
              v-on="searchWrapPT.handlers"
            >
              <Input
                v-bind="searchInputPT.props"
                :value="searchInput"
                class="f-command-input"
                @input="searchInput = ($event.target as HTMLInputElement).value"
                @keydown.escape="searchOpen = false"
              />
            </Group>
          </template>
        </Popover>
        <Keywords
          v-model="keywords"
          v-bind="keywordsPT.props"
          v-on="keywordsPT.handlers"
        />
        <Facets
          v-model:selected="selectedFacets"
          v-bind="facetsPT.props"
          v-on="facetsPT.handlers"
        />
        <DateFilters
          v-model="dateFilters"
          v-bind="dateFiltersPT.props"
          v-on="dateFiltersPT.handlers"
        />
        <DataTableColumns :table="table" :pt="pt?.columns" />
      </Group>
    </slot>

    <Group
      v-if="hasSelection"
      v-bind="bulkActionsPT.props"
      class="f-data-table-bulk-actions"
      v-on="bulkActionsPT.handlers"
    >
      <Span
        v-bind="bulkActionsCountPT.props"
        class="f-data-table-bulk-actions-count"
        v-on="bulkActionsCountPT.handlers"
      >
        {{ selected.size }} selected
      </Span>
      <Button
        v-for="bulk in bulkActions"
        :key="bulk.label"
        v-bind="passthrough(pt?.bulkAction, { props: {}, handlers: {} }).props"
        class="f-data-table-bulk-action"
        @click="bulk.action(selected)"
      >
        <Icon
          v-bind="
            passthrough(pt?.bulkActionIcon, {
              props: { alias: bulk.icon },
              handlers: {},
            }).props
          "
        />
        {{ bulk.label }}
      </Button>
      <Button
        v-bind="bulkActionClearPT.props"
        class="f-data-table-bulk-action-clear"
        v-on="bulkActionClearPT.handlers"
        @click="clearSelection()"
      >
        Clear
      </Button>
    </Group>

    <Scroller v-bind="scrollerPT.props" v-on="scrollerPT.handlers">
      <template #content>
      <Table v-bind="tablePT.props" v-on="tablePT.handlers">
        <Thead v-bind="theadPT.props" v-on="theadPT.handlers">
          <Tr v-bind="theadTrPT.props" v-on="theadTrPT.handlers">
            <Th
              v-if="isSelectable"
              v-bind="passthrough(pt?.th, { props: {}, handlers: {} }).props"
              class="f-data-table-select"
            >
              <Checkbox
                v-bind="selectAllCheckboxPT.props"
                v-on="selectAllCheckboxPT.handlers"
              />
            </Th>
            <Th
              v-for="col in visibleColumns"
              :key="String(col.key)"
              v-bind="passthrough(pt?.th, { props: {}, handlers: {} }).props"
              :draggable="draggableKey === String(col.key)"
              :class="{
                'f-data-table-sortable': col.sortable,
                'f-data-table-sorted': isSorted(col),
                'f-data-table-dragging': dragKey === String(col.key),
                'f-data-table-drop-left':
                  dropKey === String(col.key) && dropDirection === 'left',
                'f-data-table-drop-right':
                  dropKey === String(col.key) && dropDirection === 'right',
              }"
              @dragstart="onHeaderDragStart(String(col.key), $event)"
              @dragover="onHeaderDragOver(String(col.key), $event)"
              @dragleave="onHeaderDragLeave"
              @drop="onHeaderDrop(String(col.key), $event)"
              @dragend="onHeaderDragEnd"
            >
              <slot name="header" v-bind="{ ...ctx, column: col }">
                <Group
                  v-bind="headerWrapPT.props"
                  class="f-data-table-header-wrap"
                  v-on="headerWrapPT.handlers"
                >
                  <Button
                    v-if="col.sortable"
                    v-bind="
                      passthrough(pt?.sortButton, { props: {}, handlers: {} })
                        .props
                    "
                    class="f-data-table-header-btn"
                    @click="sortBy(sortFieldFor(col))"
                  >
                    {{ col.label }}
                    <Icon
                      v-if="isSorted(col)"
                      v-bind="
                        passthrough(pt?.sortIcon, {
                          props: { alias: getSortIcon() },
                          handlers: {},
                        }).props
                      "
                      class="f-data-table-sort-icon"
                    />
                  </Button>
                  <Span
                    v-else
                    v-bind="headerLabelPT.props"
                    class="f-data-table-header"
                    v-on="headerLabelPT.handlers"
                  >
                    {{ col.label }}
                  </Span>
                  <Icon
                    v-bind="
                      passthrough(pt?.dragIcon, {
                        props: { alias: 'drag' as IconAlias },
                        handlers: {},
                      }).props
                    "
                    class="f-data-table-drag-handle"
                    @mouseenter="onDragHandleEnter(String(col.key))"
                    @mouseleave="onDragHandleLeave(String(col.key))"
                  />
                </Group>
              </slot>
            </Th>
            <Th
              v-if="hasActions"
              v-bind="passthrough(pt?.th, { props: {}, handlers: {} }).props"
              class="f-data-table-actions"
            />
          </Tr>
        </Thead>
        <Tbody v-bind="tbodyPT.props" v-on="tbodyPT.handlers">
          <Tr
            v-if="!data.length"
            v-bind="passthrough(pt?.tr, { props: {}, handlers: {} }).props"
          >
            <Td
              v-bind="emptyPT.props"
              :colspan="colSpan"
              v-on="emptyPT.handlers"
            >
              <slot name="empty" v-bind="ctx">No data</slot>
            </Td>
          </Tr>
          <template v-else>
            <Tr
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
              v-bind="passthrough(pt?.tr, { props: {}, handlers: {} }).props"
            >
              <Td
                v-if="isSelectable"
                v-bind="passthrough(pt?.td, { props: {}, handlers: {} }).props"
                class="f-data-table-select"
              >
                <Checkbox
                  v-bind="
                    passthrough(pt?.rowCheckbox, {
                      props: { modelValue: isRowSelected(row) },
                      handlers: {},
                    }).props
                  "
                  @update:model-value="toggleRow(getRowKey(row))"
                />
              </Td>
              <Td
                v-for="col in visibleColumns"
                :key="String(col.key)"
                v-bind="passthrough(pt?.td, { props: {}, handlers: {} }).props"
              >
                <!-- 1. cell:id — override a specific column -->
                <slot
                  v-if="$slots[`cell:${String(col.key)}`]"
                  :name="`cell:${String(col.key)}`"
                  v-bind="{ ...ctx, row, column: col, value: row[col.key] }"
                />
                <!-- 2. cell:variant — override all columns of a type -->
                <slot
                  v-else-if="col.type && $slots[`cell:${col.type}`]"
                  :name="`cell:${col.type}`"
                  v-bind="{ ...ctx, row, column: col, value: row[col.key] }"
                />
                <!-- 3. cell — override all cells -->
                <slot
                  v-else
                  name="cell"
                  v-bind="{ ...ctx, row, column: col, value: row[col.key] }"
                >
                  <!-- 4. Default type-based rendering -->
                  <Anchor
                    v-if="col.type === 'url'"
                    v-bind="
                      passthrough(pt?.cellAnchor, {
                        props: { to: String(row[col.key]), external: true },
                        handlers: {},
                      }).props
                    "
                    >{{ row[col.key] }}</Anchor
                  >
                  <Img
                    v-else-if="col.type === 'image'"
                    v-bind="
                      passthrough(pt?.cellImg, {
                        props: { src: String(row[col.key]), alt: col.label },
                        handlers: {},
                      }).props
                    "
                  />
                  <Span
                    v-else
                    v-bind="
                      passthrough(pt?.cellSpan, { props: {}, handlers: {} })
                        .props
                    "
                    >{{ formatCell(row[col.key], col.type) }}</Span
                  >
                </slot>
              </Td>
              <Td
                v-if="hasActions"
                v-bind="passthrough(pt?.td, { props: {}, handlers: {} }).props"
                class="f-data-table-actions"
              >
                <Menu
                  v-bind="actionsMenuPT.props"
                  v-on="actionsMenuPT.handlers"
                  @select="onActionSelect(row, $event)"
                >
                  <Fab
                    v-bind="actionsTriggerPT.props"
                    v-on="actionsTriggerPT.handlers"
                  />
                </Menu>
              </Td>
            </Tr>
          </template>
        </Tbody>
      </Table>
      </template>
    </Scroller>

    <slot name="pagination" v-bind="ctx">
      <Pagination v-bind="paginationPT.props" v-on="paginationPT.handlers" />
    </slot>
  </Group>
</template>
