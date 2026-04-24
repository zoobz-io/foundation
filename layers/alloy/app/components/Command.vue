<script lang="ts">
import type { CommandProps, CommandEmits } from "../types/command";
import type { AcceptableValue } from "reka-ui";
import {
  ListboxRoot,
  ListboxFilter,
  ListboxContent,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
} from "reka-ui";
</script>

<script setup lang="ts">
const {
  pt,
  groups,
  placeholder = "Search...",
  disabled,
  multiple = false,
  filtered = false,
} = defineProps<CommandProps>();

const emit = defineEmits<CommandEmits>();

const el = useTemplateRef("el");
defineExpose({ el });

const searchTerm = defineModel<string>("searchTerm", { default: "" });
const selected = defineModel<Set<string>>("selected", { default: () => new Set() });

// Sync Set <-> Array for Listbox v-model
const modelArray = computed({
  get: () => [...selected.value],
  set: (val: string[]) => {
    selected.value = new Set(val);
  },
});

const isSelected = (value: string) => selected.value.has(value);

// Filter groups: match search term + hide items with count=0
// Skip when `filtered` — the parent already performed external search.
const filteredGroups = computed(() => {
  if (filtered) return groups.filter((g) => g.items.length > 0);

  const search = searchTerm.value.toLowerCase();
  const isSearching = search.length > 0;

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (isSearching && !item.label.toLowerCase().includes(search)) return false;
        if (item.count === 0 && !selected.value.has(item.value)) return false;
        return true;
      }),
    }))
    .filter((group) => group.items.length > 0);
});

const hasResults = computed(() => filteredGroups.value.length > 0);

// Single-select mode: emit select event
const handleSingleSelect = (value: AcceptableValue) => {
  if (multiple) return;
  const val = Array.isArray(value) ? value[0] : value;
  if (val && typeof val === "string") emit("select", val);
};

const rootPT = usePassthrough(pt?.root, {
  props: { disabled, multiple },
  handlers: { "update:modelValue": handleSingleSelect },
});
const filterPT = usePassthrough(pt?.filter, {
  props: { autoFocus: true },
});
const contentPT = usePassthrough(pt?.content, {});

const groupsPT = computed(() =>
  filteredGroups.value.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      item,
      pt: passthrough(pt?.item, {
        props: { value: item.value, disabled: item.disabled },
      }),
    })),
  })),
);

const ctx = computed(() => ({
  groups,
  placeholder,
  disabled,
  multiple,
  filtered,
  searchTerm: searchTerm.value,
  selected: selected.value,
  filteredGroups: filteredGroups.value,
  hasResults: hasResults.value,
}));
</script>

<template>
  <ListboxRoot
    ref="el"
    v-model="modelArray"
    v-bind="rootPT.props"
    class="f-command-root"
    v-on="rootPT.handlers"
  >
    <Group class="f-command-input-wrapper">
      <slot name="input-icon" v-bind="ctx" />
      <slot name="filter" v-bind="ctx">
        <ListboxFilter
          v-model="searchTerm"
          :placeholder="placeholder"
          v-bind="filterPT.props"
          class="f-command-input"
          v-on="filterPT.handlers"
        />
      </slot>
    </Group>
    <slot name="content" v-bind="ctx">
      <ListboxContent v-bind="contentPT.props" class="f-command-content" v-on="contentPT.handlers">
        <Scroller class="f-command-viewport">
          <Group v-if="!hasResults" class="f-command-empty">
            <slot name="empty" v-bind="ctx">No results found</slot>
          </Group>

          <ListboxGroup
            v-for="group in groupsPT"
            :key="group.key"
            class="f-command-group"
          >
            <ListboxGroupLabel v-if="group.label" as-child>
              <Caption>
                <slot name="group-label" v-bind="{ ...ctx, group }">{{ group.label }}</slot>
              </Caption>
            </ListboxGroupLabel>
            <ListboxItem
              v-for="entry in group.items"
              :key="entry.item.value"
              v-bind="entry.pt.props"
              class="f-command-item"
              v-on="entry.pt.handlers"
            >
              <slot name="item" v-bind="{ ...ctx, item: entry.item, selected: isSelected(entry.item.value) }">
                <Checkbox v-if="multiple" :model-value="isSelected(entry.item.value)" />
                <Span class="f-command-item-label">{{ entry.item.label }}</Span>
                <Kbd v-if="entry.item.count !== undefined" class="f-command-item-count">{{ entry.item.count }}</Kbd>
              </slot>
            </ListboxItem>
          </ListboxGroup>
        </Scroller>
      </ListboxContent>
    </slot>
  </ListboxRoot>
</template>
