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

const modelArray = computed({
  get: () => [...selected.value],
  set: (val: string[]) => { selected.value = new Set(val); },
});

const isSelected = (value: string) => selected.value.has(value);

const filteredGroups = computed(() =>
  Command.filter(groups, searchTerm.value, selected.value, filtered),
);

const hasResults = computed(() => filteredGroups.value.length > 0);

// Single-select mode: emit select event
const handleSingleSelect = (value: AcceptableValue) => {
  if (multiple) return;
  const val = Array.isArray(value) ? value[0] : value;
  if (val && typeof val === "string") emit("select", val);
};

const rootPT = usePassthrough(pt?.root, () => ({
  props: { modelValue: modelArray.value, disabled, multiple },
  handlers: { "update:modelValue": (v: AcceptableValue | AcceptableValue[]) => { modelArray.value = (Array.isArray(v) ? v : [v]).map(String); handleSingleSelect(v); } },
}));
const filterPT = usePassthrough(pt?.filter, () => ({
  props: { modelValue: searchTerm.value, autoFocus: true, placeholder },
  handlers: { "update:modelValue": (v: string) => { searchTerm.value = v; } },
}));
const inputWrapperPT = usePassthrough(pt?.inputWrapper, { props: {}, handlers: {} });
const contentPT = usePassthrough(pt?.content, { props: {}, handlers: {} });
const viewportPT = usePassthrough(pt?.viewport, { props: {}, handlers: {} });
const emptyPT = usePassthrough(pt?.empty, { props: {}, handlers: {} });
const groupLabelPT = usePassthrough(pt?.groupLabel, { props: {}, handlers: {} });
const itemCheckboxPT = usePassthrough(pt?.itemCheckbox, { props: {}, handlers: {} });
const itemLabelPT = usePassthrough(pt?.itemLabel, { props: {}, handlers: {} });
const itemCountPT = usePassthrough(pt?.itemCount, { props: {}, handlers: {} });

const groupsPT = computed(() =>
  filteredGroups.value.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      item,
      pt: passthrough(pt?.item, {
        props: { value: item.value, disabled: item.disabled },
        handlers: {},
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
    v-bind="rootPT.props"
    class="f-command-root"
    v-on="rootPT.handlers"
  >
    <slot name="inputWrapper" v-bind="ctx">
      <Group v-bind="inputWrapperPT.props" class="f-command-input-wrapper" v-on="inputWrapperPT.handlers">
        <slot name="inputIcon" v-bind="ctx" />
        <slot name="filter" v-bind="ctx">
          <ListboxFilter
            v-bind="filterPT.props"
            class="f-command-input"
            v-on="filterPT.handlers"
          />
        </slot>
      </Group>
    </slot>
    <slot name="content" v-bind="ctx">
      <ListboxContent v-bind="contentPT.props" class="f-command-content" v-on="contentPT.handlers">
        <slot name="viewport" v-bind="ctx">
          <Scroller v-bind="viewportPT.props" class="f-command-viewport" v-on="viewportPT.handlers">
            <template #content>
            <Group v-if="!hasResults" v-bind="emptyPT.props" class="f-command-empty" v-on="emptyPT.handlers">
              <slot name="empty" v-bind="ctx">No results found</slot>
            </Group>

            <ListboxGroup
              v-for="group in groupsPT"
              :key="group.key"
              class="f-command-group"
            >
              <ListboxGroupLabel v-if="group.label" as-child>
                <slot name="groupLabel" v-bind="{ ...ctx, group }">
                  <Caption v-bind="groupLabelPT.props" v-on="groupLabelPT.handlers">{{ group.label }}</Caption>
                </slot>
              </ListboxGroupLabel>
              <ListboxItem
                v-for="entry in group.items"
                :key="entry.item.value"
                v-bind="entry.pt.props"
                class="f-command-item"
                v-on="entry.pt.handlers"
              >
                <slot name="item" v-bind="{ ...ctx, item: entry.item, selected: isSelected(entry.item.value) }">
                  <slot name="itemCheckbox" v-bind="{ ...ctx, item: entry.item, selected: isSelected(entry.item.value) }">
                    <Checkbox v-if="multiple" v-bind="{ ...itemCheckboxPT.props, modelValue: isSelected(entry.item.value) }" v-on="itemCheckboxPT.handlers" />
                  </slot>
                  <slot name="itemLabel" v-bind="{ ...ctx, item: entry.item }">
                    <Span v-bind="itemLabelPT.props" class="f-command-item-label" v-on="itemLabelPT.handlers">{{ entry.item.label }}</Span>
                  </slot>
                  <slot name="itemCount" v-bind="{ ...ctx, item: entry.item }">
                    <Kbd v-if="entry.item.count !== undefined" v-bind="itemCountPT.props" class="f-command-item-count" v-on="itemCountPT.handlers">{{ entry.item.count }}</Kbd>
                  </slot>
                </slot>
              </ListboxItem>
            </ListboxGroup>
            </template>
          </Scroller>
        </slot>
      </ListboxContent>
    </slot>
  </ListboxRoot>
</template>
