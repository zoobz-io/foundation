<script lang="ts">
import type {
  DataTableColumn,
  DataTableColumnsProps,
} from "../../../types/data-table";
</script>

<script setup lang="ts" generic="T, K = unknown">
const { table, pt } = defineProps<DataTableColumnsProps<T, K>>();

const { columns, columnOrder, reorderColumns, isColumnPinned } = table;

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
const groups = computed(() => [
  {
    key: "columns",
    items: columns.map((c: DataTableColumn<T>) => ({
      value: String(c.key),
      label: c.label,
      disabled: isColumnPinned(c.key),
    })),
  },
]);

// Passthrough
const popoverPT = usePassthrough(pt?.popover, () => ({
  props: { open: open.value, align: "end" as const },
  handlers: {
    "update:open": (v: boolean) => {
      open.value = v;
    },
  },
}));
const triggerPT = usePassthrough(pt?.trigger, {
  props: { icon: "settings" as IconAlias },
  handlers: {},
});
const commandPT = usePassthrough(pt?.command, () => ({
  props: {
    groups: groups.value,
    placeholder: "Search columns...",
    multiple: true,
    selected: selected.value,
  },
  handlers: {
    "update:selected": (v: Set<string>) => {
      selected.value = v;
    },
  },
}));
</script>

<template>
  <Popover ref="el" v-bind="popoverPT.props" v-on="popoverPT.handlers">
    <template #trigger>
      <Fab v-bind="triggerPT.props" v-on="triggerPT.handlers" />
    </template>
    <template #content>
      <Command
        v-bind="commandPT.props"
        v-on="commandPT.handlers"
        @keydown.escape="open = false"
      />
    </template>
  </Popover>
</template>
