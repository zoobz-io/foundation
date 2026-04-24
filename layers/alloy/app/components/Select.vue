<script lang="ts">
import { SelectRoot, SelectTrigger, SelectPortal, SelectContent, SelectItem, SelectItemText } from "reka-ui";
import type { SelectProps } from "../types/select";
</script>

<script setup lang="ts">
const {
  options,
  placeholder = "Select an option",
  disabled,
  required,
  name,
  pt,
} = defineProps<SelectProps>();

const model = defineModel<string>();

const el = useTemplateRef("el");
defineExpose({ el });

const displayText = computed(() => {
  const selected = options.find((o) => o.value === model.value);
  return selected?.label ?? placeholder;
});

const rootPT = usePassthrough(pt?.root, {
  props: { disabled, required, name },
});
const triggerPT = usePassthrough(pt?.trigger, {});
const contentPT = usePassthrough(pt?.content, {
  props: { position: "popper", sideOffset: 4 },
});
const itemTextPT = usePassthrough(pt?.itemText, {});

const itemsPT = computed(() =>
  options.map((option) => ({
    item: option,
    pt: passthrough(pt?.item, {
      props: { value: option.value, disabled: option.disabled },
    }),
  })),
);

const ctx = computed(() => ({ options, placeholder, disabled, required, name, model: model.value, displayText: displayText.value }));
</script>

<template>
  <SelectRoot
    ref="el"
    v-model="model"
    v-bind="rootPT.props"
    class="f-select-root"
    v-on="rootPT.handlers"
  >
    <slot name="trigger" v-bind="ctx">
      <SelectTrigger
        v-bind="triggerPT.props"
        class="f-select-trigger"
        v-on="triggerPT.handlers"
      >
        <Span>{{ displayText }}</Span>
        <Icon alias="chevron-down" />
      </SelectTrigger>
    </slot>
    <SelectPortal>
      <SelectContent
        v-bind="contentPT.props"
        class="f-select-content"
        v-on="contentPT.handlers"
      >
        <template v-for="entry in itemsPT" :key="entry.item.value">
          <slot name="item" v-bind="{ ...ctx, option: entry.item }">
            <SelectItem
              v-bind="entry.pt.props"
              class="f-select-item"
              v-on="entry.pt.handlers"
            >
              <SelectItemText v-bind="itemTextPT.props" v-on="itemTextPT.handlers">{{ entry.item.label }}</SelectItemText>
            </SelectItem>
          </slot>
        </template>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
