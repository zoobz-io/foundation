<script lang="ts">
import type { DataTableColumn, DataTableColumnsRecipes } from "../types/data-table";
import type { Table } from "../types/table";

interface DataTableColumnsProps<T, K = unknown> {
  table: Table<T, K>;
  recipes?: DataTableColumnsRecipes;
}
</script>

<script setup lang="ts" generic="T, K = unknown">
const { table, recipes } = defineProps<DataTableColumnsProps<T, K>>();

const {
  columns,
  columnOrder,
  reorderColumns,
  isColumnPinned,
} = table;

const {
  trigger: triggerRecipe,
} = recipes ?? {};

const el = useTemplateRef("el");
defineExpose({ el });

const open = ref(false);

// Use definition order as the stable reference for toggle position
const allKeys = columns.map((c: DataTableColumn<T>) => String(c.key));

// Sync columnOrder with Command's selected model
const selected = computed({
  get: () => new Set(columnOrder.value),
  set: (val: Set<string>) => {
    const current = columnOrder.value.filter((k) => val.has(k));
    const added = [...val].filter((k) => !current.includes(k));

    if (added.length) {
      const result = [...current];
      for (const key of added) {
        const defIndex = allKeys.indexOf(key);
        let insertAt = result.length;
        for (let i = 0; i < result.length; i++) {
          if (allKeys.indexOf(result[i]!) > defIndex) {
            insertAt = i;
            break;
          }
        }
        result.splice(insertAt, 0, key);
      }
      reorderColumns(result);
    } else {
      reorderColumns(current);
    }
  },
});

// Map columns into a Command group — stable definition order
const groups = computed(() => [{
  key: "columns",
  items: columns.map((c: DataTableColumn<T>) => ({
    value: String(c.key),
    label: c.label,
    disabled: isColumnPinned(c.key),
  })),
}]);
</script>

<template>
  <Popover ref="el" v-model:open="open" align="end">
    <Fab
      v-if="triggerRecipe"
      v-bind="triggerRecipe.props"
      v-on="triggerRecipe.handlers"
    />
    <Fab v-else icon="settings" />
    <template #content>
      <Command
        v-model:selected="selected"
        :groups="groups"
        placeholder="Search columns..."
        multiple
        @keydown.escape="open = false"
      />
    </template>
  </Popover>
</template>
