<script lang="ts">
import type { DataTableProps } from "../types/data-table";
</script>

<script setup lang="ts" generic="T, K = unknown">
const { table, pt, recipes } = defineProps<DataTableProps<T, K>>();

useLazyAsyncData("init-table", table.init, { server: false });

const el = useTemplateRef("el");
defineExpose({ el });

const {
  keywords: keywordsRecipe,
  facets: facetsRecipe,
  dateFilters: dateFiltersRecipe,
  pagination: paginationRecipe,
} = recipes;

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
</script>

<template>
  <Group ref="el" v-bind="pt?.root" class="f-data-table">
    <slot name="toolbar" v-bind="ctx">
      <Group v-bind="pt?.toolbar" class="f-data-table-toolbar">
        <DataTableFilters :table="table" />
        <Popover v-model:open="searchOpen" align="end">
          <Fab icon="search" :badge="hasQuery ? '' : undefined" />
          <template #content>
            <Group class="f-data-table-search">
              <input
                :value="searchInput"
                placeholder="Search..."
                class="f-command-input"
                @input="searchInput = ($event.target as HTMLInputElement).value"
                @keydown.escape="searchOpen = false"
              >
            </Group>
          </template>
        </Popover>
        <Keywords
          v-model="keywords"
          v-bind="keywordsRecipe.props"
          v-on="keywordsRecipe.handlers"
        />
        <Facets
          v-model:selected="selectedFacets"
          v-bind="facetsRecipe.props"
          v-on="facetsRecipe.handlers"
        />
        <DateFilters
          v-model="dateFilters"
          v-bind="dateFiltersRecipe.props"
          v-on="dateFiltersRecipe.handlers"
        />
        <DataTableColumns :table="table" />
      </Group>
    </slot>

    <Group
      v-if="hasSelection"
      v-bind="pt?.bulkActions"
      class="f-data-table-bulk-actions"
    >
      <Span class="f-data-table-bulk-actions-count">
        {{ selected.size }} selected
      </Span>
      <Button
        v-for="bulk in bulkActions"
        :key="bulk.label"
        type="button"
        class="f-data-table-bulk-action"
        @click="bulk.action(selected)"
      >
        <Icon :alias="bulk.icon" />
        {{ bulk.label }}
      </Button>
      <Button
        type="button"
        class="f-data-table-bulk-action-clear"
        @click="clearSelection()"
      >
        Clear
      </Button>
    </Group>

    <Scroller>
      <Table v-bind="pt?.table">
        <Thead v-bind="pt?.thead">
          <Tr>
            <Th v-if="isSelectable" class="f-data-table-select">
              <Checkbox
                :model-value="selectAllState"
                @update:model-value="toggleAll()"
              />
            </Th>
            <Th
              v-for="col in visibleColumns"
              :key="String(col.key)"
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
                <Group class="f-data-table-header-wrap">
                  <button
                    v-if="col.sortable"
                    type="button"
                    class="f-data-table-header-btn"
                    @click="sortBy(sortFieldFor(col))"
                  >
                    {{ col.label }}
                    <Icon
                      v-if="isSorted(col)"
                      :alias="getSortIcon()"
                      class="f-data-table-sort-icon"
                    />
                  </button>
                  <Span v-else class="f-data-table-header">
                    {{ col.label }}
                  </Span>
                  <Icon
                    alias="drag"
                    class="f-data-table-drag-handle"
                    @mouseenter="onDragHandleEnter(String(col.key))"
                    @mouseleave="onDragHandleLeave(String(col.key))"
                  />
                </Group>
              </slot>
            </Th>
            <Th v-if="hasActions" class="f-data-table-actions" />
          </Tr>
        </Thead>
        <Tbody v-bind="pt?.tbody">
          <Tr v-if="!data.length">
            <Td v-bind="pt?.empty" :colspan="colSpan">
              <slot name="empty" v-bind="ctx">No data</slot>
            </Td>
          </Tr>
          <template v-else>
            <Tr v-for="(row, rowIndex) in data" :key="rowIndex">
              <Td v-if="isSelectable" class="f-data-table-select">
                <Checkbox
                  :model-value="isRowSelected(row)"
                  @update:model-value="toggleRow(getRowKey(row))"
                />
              </Td>
              <Td v-for="col in visibleColumns" :key="String(col.key)">
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
                    :to="String(row[col.key])"
                    external
                    >{{ row[col.key] }}</Anchor
                  >
                  <Img
                    v-else-if="col.type === 'image'"
                    :src="String(row[col.key])"
                    :alt="col.label"
                  />
                  <Span v-else>{{ formatCell(row[col.key], col.type) }}</Span>
                </slot>
              </Td>
              <Td v-if="hasActions" class="f-data-table-actions">
                <Menu
                  :groups="actionMenuGroups"
                  align="end"
                  @select="onActionSelect(row, $event)"
                >
                  <Fab icon="actions" />
                </Menu>
              </Td>
            </Tr>
          </template>
        </Tbody>
      </Table>
    </Scroller>

    <slot name="pagination" v-bind="ctx">
      <Pagination
        v-if="paginationRecipe"
        v-bind="paginationRecipe.props"
        v-on="paginationRecipe.handlers"
      />
    </slot>
  </Group>
</template>
